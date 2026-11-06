import * as XLSX from 'xlsx';
import {
  UFV_MATRIX_DATA,
  UfvMatrixItem,
  getInversorLabel,
  getEstruturaInfo,
  getDemandaContratada,
  getPotenciaPico,
} from '../data/ufvData';

/**
 * Builds and downloads the complete multi-sheet Excel file (.xlsx)
 * with all UFV information, technical specs, strings per inverter matrix,
 * summary by supervisor and brand, and formula lookup guides.
 */
export function generateExcelWorkbook(): XLSX.WorkBook {
  const wb = XLSX.utils.book_new();

  // -------------------------------------------------------------
  // ABA 1: Matriz Geral (UFV x Inversores 01..72)
  // Formato ideal para ÍNDICE + CORRESP / PROCV / BUSCAX
  // -------------------------------------------------------------
  const maxInverters = 72;
  const headerMatriz = [
    'ID',
    'Nome da UFV',
    'Supervisor',
    'Fabricante Inversor',
    'Potência Inv (kW)',
    'Estrutura',
    'Qtd Trackers',
    'Demanda Contratada',
    'Potência Pico (kWp)',
    'Qtd Inversores',
    'Total Strings / Potência',
    'Unidade',
    ...Array.from({ length: maxInverters }, (_, i) => getInversorLabel(i)),
  ];

  const rowsMatriz: (string | number)[][] = [headerMatriz];

  UFV_MATRIX_DATA.forEach((u) => {
    const est = getEstruturaInfo(u);
    const totalVal = u.strings.reduce((a, b) => a + (b || 0), 0);
    const startNum = u.inverterStartNumber || 1;

    const row: (string | number)[] = [
      u.id,
      u.ufvName,
      u.supervisor || '',
      u.inversorModelo || '',
      u.potenciaInversor || '',
      est.badgeLabel,
      u.trackerValue || 'Fixa',
      getDemandaContratada(u),
      getPotenciaPico(u),
      u.strings.length,
      totalVal,
      u.unit || 'strings',
    ];

    // Preenche colunas Inversor 01..72
    for (let i = 0; i < maxInverters; i++) {
      const invNum = i + 1; // 1-based inverter column
      const localIdx = invNum - startNum;
      if (localIdx >= 0 && localIdx < u.strings.length) {
        row.push(u.strings[localIdx]);
      } else {
        row.push('');
      }
    }

    rowsMatriz.push(row);
  });

  const wsMatriz = XLSX.utils.aoa_to_sheet(rowsMatriz);

  // Define column widths for Matriz
  wsMatriz['!cols'] = [
    { wch: 6 },  // ID
    { wch: 42 }, // Nome
    { wch: 22 }, // Supervisor
    { wch: 18 }, // Fabricante Inversor
    { wch: 18 }, // Pot Inversor
    { wch: 16 }, // Estrutura
    { wch: 14 }, // Trackers
    { wch: 18 }, // Demanda
    { wch: 20 }, // Potência Pico
    { wch: 14 }, // Qtd Inversores
    { wch: 22 }, // Total Strings
    { wch: 12 }, // Unidade
    ...Array.from({ length: maxInverters }, () => ({ wch: 12 })),
  ];

  XLSX.utils.book_append_sheet(wb, wsMatriz, 'Matriz_UFV');

  // -------------------------------------------------------------
  // ABA 2: Detalhes Técnicos e Cadastrais (Sem colunas largas)
  // Perfeita para relatórios gerenciais, dashboards e conferência
  // -------------------------------------------------------------
  const headerDetalhes = [
    'ID',
    'Nome da UFV',
    'Supervisor Responsável',
    'Fabricante do Inversor',
    'Potência do Inversor (kW)',
    'Tipo de Estrutura',
    'Qtd Rastreadores (Trackers)',
    'Modelo do Tracker',
    'Demanda Contratada',
    'Potência Total UFV',
    'Potência Pico (kWp)',
    'Qtd de Inversores',
    'Total de Strings / Potência',
    'Média de Strings / Inversor',
    'Menor Qtd Strings',
    'Maior Qtd Strings',
    'Variação entre Inversores?',
    'Unidade de Medida',
    'Observações / Notas',
  ];

  const rowsDetalhes: (string | number)[][] = [headerDetalhes];

  UFV_MATRIX_DATA.forEach((u) => {
    const est = getEstruturaInfo(u);
    const strings = u.strings || [];
    const total = strings.reduce((a, b) => a + (b || 0), 0);
    const count = strings.length;
    const avg = count > 0 ? Number((total / count).toFixed(2)) : 0;
    const min = count > 0 ? Math.min(...strings) : 0;
    const max = count > 0 ? Math.max(...strings) : 0;
    const hasVariation = new Set(strings).size > 1 ? 'SIM' : 'NÃO';

    rowsDetalhes.push([
      u.id,
      u.ufvName,
      u.supervisor || '',
      u.inversorModelo || '',
      u.potenciaInversor || '',
      est.tipoLabel,
      u.trackerValue || 'Fixa',
      u.modeloTracker || '-',
      getDemandaContratada(u),
      u.potenciaUfv || '',
      getPotenciaPico(u),
      count,
      total,
      avg,
      min,
      max,
      hasVariation,
      u.unit || 'strings',
      u.obs || '',
    ]);
  });

  const wsDetalhes = XLSX.utils.aoa_to_sheet(rowsDetalhes);
  wsDetalhes['!cols'] = [
    { wch: 6 },  // ID
    { wch: 44 }, // Nome UFV
    { wch: 22 }, // Supervisor
    { wch: 20 }, // Fabricante Inversor
    { wch: 22 }, // Pot Inversor
    { wch: 24 }, // Estrutura
    { wch: 24 }, // Qtd Trackers
    { wch: 20 }, // Modelo Tracker
    { wch: 20 }, // Demanda Contratada
    { wch: 18 }, // Potência UFV
    { wch: 20 }, // Potência Pico
    { wch: 16 }, // Qtd Inversores
    { wch: 24 }, // Total Strings
    { wch: 24 }, // Média Strings
    { wch: 18 }, // Mínimo
    { wch: 18 }, // Máximo
    { wch: 24 }, // Variação
    { wch: 16 }, // Unidade
    { wch: 50 }, // Observações
  ];

  XLSX.utils.book_append_sheet(wb, wsDetalhes, 'Cadastro_Tecnico');

  // -------------------------------------------------------------
  // ABA 3: Resumo por Supervisor & Marca
  // -------------------------------------------------------------
  const supMap: Record<string, { totalUfvs: number; totalInverters: number; totalStrings: number; trackers: number; fixas: number }> = {};
  const brandMap: Record<string, { totalUfvs: number; totalInverters: number }> = {};

  UFV_MATRIX_DATA.forEach((u) => {
    const s = u.supervisor || 'Não informado';
    if (!supMap[s]) {
      supMap[s] = { totalUfvs: 0, totalInverters: 0, totalStrings: 0, trackers: 0, fixas: 0 };
    }
    supMap[s].totalUfvs += 1;
    supMap[s].totalInverters += u.strings.length;
    supMap[s].totalStrings += u.strings.reduce((a, b) => a + (b || 0), 0);
    if (!u.trackerValue || u.trackerValue === 'Fixa') {
      supMap[s].fixas += 1;
    } else {
      supMap[s].trackers += 1;
    }

    const b = u.inversorModelo || 'Outros';
    if (!brandMap[b]) {
      brandMap[b] = { totalUfvs: 0, totalInverters: 0 };
    }
    brandMap[b].totalUfvs += 1;
    brandMap[b].totalInverters += u.strings.length;
  });

  const rowsResumo: (string | number)[][] = [
    ['RESUMO GERENCIAL - PARQUE SOLAR GDSUN'],
    ['Data da Extração', new Date().toLocaleDateString('pt-BR')],
    ['Total de Usinas Cadastradas', UFV_MATRIX_DATA.length],
    [],
    ['1. RESUMO POR SUPERVISOR'],
    ['Supervisor', 'Qtd Usinas', 'Qtd Inversores', 'Total Strings / Potência', 'Usinas com Tracker', 'Usinas com Estrutura Fixa'],
  ];

  Object.entries(supMap)
    .sort((a, b) => b[1].totalUfvs - a[1].totalUfvs)
    .forEach(([sup, stats]) => {
      rowsResumo.push([
        sup,
        stats.totalUfvs,
        stats.totalInverters,
        stats.totalStrings,
        stats.trackers,
        stats.fixas,
      ]);
    });

  rowsResumo.push([]);
  rowsResumo.push(['2. RESUMO POR MARCA DO INVERSOR']);
  rowsResumo.push(['Marca / Fabricante', 'Qtd Usinas', 'Qtd Inversores']);

  Object.entries(brandMap)
    .sort((a, b) => b[1].totalUfvs - a[1].totalUfvs)
    .forEach(([brand, stats]) => {
      rowsResumo.push([brand, stats.totalUfvs, stats.totalInverters]);
    });

  const wsResumo = XLSX.utils.aoa_to_sheet(rowsResumo);
  wsResumo['!cols'] = [
    { wch: 30 },
    { wch: 16 },
    { wch: 18 },
    { wch: 26 },
    { wch: 22 },
    { wch: 26 },
  ];

  XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo_Supervisores');

  // -------------------------------------------------------------
  // ABA 4: Fórmulas Prontas de Consulta no Excel
  // -------------------------------------------------------------
  const rowsFormulas: (string | number)[][] = [
    ['GUIA DE FÓRMULAS PARA BUSCAR DADOS DESTA PLANILHA NO EXCEL / GOOGLE SHEETS'],
    [],
    ['Estrutura de Consulta Recomendada:', 'Na sua planilha de trabalho, aponte a UFV e o Inversor para a aba Matriz_UFV.'],
    [],
    ['Fórmula', 'Sintaxe Pronta para Copiar', 'Explicação'],
    [
      'ÍNDICE + CORRESP (Compatível com qualquer Excel)',
      '=ÍNDICE(Matriz_UFV!M2:CA127; CORRESP(A2; Matriz_UFV!B2:B127; 0); CORRESP(B2; Matriz_UFV!M1:CA1; 0))',
      'Localiza a linha da UFV (coluna B) e a coluna do Inversor (cabeçalho M1:CA1) retornando a quantidade de strings exata.',
    ],
    [
      'BUSCAX / XLOOKUP Duplo (Excel 365 / Google Sheets)',
      '=BUSCAX(A2; Matriz_UFV!B2:B127; BUSCAX(B2; Matriz_UFV!M1:CA1; Matriz_UFV!M2:CA127))',
      'Busca bidimensional moderna, imune a inclusão de novas colunas no início.',
    ],
    [
      'PROCV + CORRESP',
      '=PROCV(A2; Matriz_UFV!B2:CA127; CORRESP(B2; Matriz_UFV!B1:CA1; 0); FALSO)',
      'Busca tradicional com deslocamento dinâmico de coluna calculado pelo CORRESP.',
    ],
    [],
    ['Legenda das Referências:'],
    ['Célula A2', 'Célula onde você digita ou seleciona o Nome da UFV (ex: UFV São Bento do Una 01 (SBU))'],
    ['Célula B2', 'Célula onde você digita ou seleciona o Inversor (ex: Inversor 01)'],
    ['Intervalo Matriz_UFV!B2:B127', 'Coluna com o nome de todas as usinas fotovoltaicas cadastradas'],
    ['Intervalo Matriz_UFV!M1:CA1', 'Cabeçalho com os nomes dos inversores (Inversor 01 até Inversor 72)'],
    ['Intervalo Matriz_UFV!M2:CA127', 'Grade com os valores de strings de cada célula'],
  ];

  const wsFormulas = XLSX.utils.aoa_to_sheet(rowsFormulas);
  wsFormulas['!cols'] = [
    { wch: 35 },
    { wch: 75 },
    { wch: 70 },
  ];

  XLSX.utils.book_append_sheet(wb, wsFormulas, 'Instrucoes_Formulas');

  return wb;
}

/**
 * Trigger immediate browser download of the Excel file
 */
export function downloadExcelFile(fileName: string = 'Matriz_UFV_Strings_GDSUN.xlsx') {
  const wb = generateExcelWorkbook();
  XLSX.writeFile(wb, fileName);
}
