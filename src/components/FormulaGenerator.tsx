import React, { useState } from 'react';
import { FileSpreadsheet, Copy, Check, Info, Settings2, Download, HelpCircle, CheckCircle2 } from 'lucide-react';
import { generateFormula, FormulaOptions, UFV_MATRIX_DATA } from '../data/ufvData';

export const FormulaGenerator: React.FC = () => {
  const [formulaType, setFormulaType] = useState<'INDEX_MATCH' | 'XLOOKUP' | 'VLOOKUP' | 'SUMIFS'>('INDEX_MATCH');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Range Configuration State
  const [config, setConfig] = useState<FormulaOptions>({
    sheetName: 'MatrizUFV',
    ufvCell: 'A2',
    inverterCell: 'B2',
    tableRange: 'A1:BU125',
    headerRange: 'B1:BU1',
    ufvColumnRange: 'A2:A125',
    dataRange: 'B2:BU125',
  });

  const generated = generateFormula(formulaType, config);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(label);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Generate CSV data for download
  const handleDownloadCsv = () => {
    // Header row
    let csvContent = 'UFV';
    for (let i = 1; i <= 72; i++) {
      const numStr = i < 10 ? '0' + i : '' + i;
      csvContent += `;Inversor ${numStr}`;
    }
    csvContent += '\n';

    // Rows
    UFV_MATRIX_DATA.forEach((item) => {
      let row = `"${item.ufvName}"`;
      for (let i = 0; i < 72; i++) {
        const startNum = item.inverterStartNumber || 1;
        const localIdx = i - (startNum - 1);
        const hasVal = localIdx >= 0 && localIdx < item.strings.length;
        const val = hasVal ? item.strings[localIdx] : '';
        row += `;${val}`;
      }
      csvContent += row + '\n';
    });

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Matriz_UFV_Strings_Inversores.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full mb-2 border border-emerald-200">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Fórmulas para Excel e Google Sheets</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Gerador de Fórmulas de Busca Bidimensional
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Configure as referências de células da sua planilha para obter a fórmula exata pronta para copiar e colar.
            </p>
          </div>

          <button
            onClick={handleDownloadCsv}
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition shadow-sm self-start md:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Matriz em CSV/Excel</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Configuration Settings (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Settings2 className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-base">Configurar Células da Planilha</h3>
          </div>

          <div className="space-y-4">
            {/* Sheet Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nome da Aba/Planilha de Dados (Opcional)
              </label>
              <input
                type="text"
                value={config.sheetName}
                onChange={(e) => setConfig({ ...config, sheetName: e.target.value })}
                placeholder="Ex: MatrizUFV ou Planilha1"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Se a fórmula ficar na mesma aba da matriz, deixe em branco.
              </p>
            </div>

            {/* Target Filter Cells */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Célula do Nome da UFV
                </label>
                <input
                  type="text"
                  value={config.ufvCell}
                  onChange={(e) => setConfig({ ...config, ufvCell: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Célula do Inversor
                </label>
                <input
                  type="text"
                  value={config.inverterCell}
                  onChange={(e) => setConfig({ ...config, inverterCell: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>
            </div>

            {/* Matrix Ranges */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Intervalos da Matriz de Dados
              </span>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  Coluna com Nomes das UFVs (ex: A2:A125)
                </label>
                <input
                  type="text"
                  value={config.ufvColumnRange}
                  onChange={(e) => setConfig({ ...config, ufvColumnRange: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  Linha com Cabeçalho dos Inversores (ex: B1:BU1)
                </label>
                <input
                  type="text"
                  value={config.headerRange}
                  onChange={(e) => setConfig({ ...config, headerRange: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  Matriz de Valores das Strings (ex: B2:BU125)
                </label>
                <input
                  type="text"
                  value={config.dataRange}
                  onChange={(e) => setConfig({ ...config, dataRange: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Generated Formulas & Explanations (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Select Formula Type Tabs */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Selecione o Tipo de Função
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setFormulaType('INDEX_MATCH')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    formulaType === 'INDEX_MATCH'
                      ? 'bg-amber-500/10 border-amber-500 text-slate-900 font-bold ring-1 ring-amber-500'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold">ÍNDICE + CORRESP</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Todas as versões</div>
                </button>

                <button
                  onClick={() => setFormulaType('XLOOKUP')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    formulaType === 'XLOOKUP'
                      ? 'bg-amber-500/10 border-amber-500 text-slate-900 font-bold ring-1 ring-amber-500'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold">BUSCAX Duplo</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Excel 365 & Sheets</div>
                </button>

                <button
                  onClick={() => setFormulaType('VLOOKUP')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    formulaType === 'VLOOKUP'
                      ? 'bg-amber-500/10 border-amber-500 text-slate-900 font-bold ring-1 ring-amber-500'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold">PROCV + CORRESP</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Tradicional</div>
                </button>

                <button
                  onClick={() => setFormulaType('SUMIFS')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    formulaType === 'SUMIFS'
                      ? 'bg-amber-500/10 border-amber-500 text-slate-900 font-bold ring-1 ring-amber-500'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold">SOMARPRODUTO</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Matricial Numérico</div>
                </button>
              </div>
            </div>

            {/* Formula Result Codebox */}
            <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 font-bold">{generated.title}</span>
                <button
                  onClick={() => handleCopy(generated.formula, 'formula')}
                  className="flex items-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg transition"
                >
                  {copiedType === 'formula' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Formula</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm text-amber-300 break-all select-all">
                {generated.formula}
              </div>

              <div className="bg-slate-850 p-3 rounded-lg text-xs text-slate-300 border border-slate-800 leading-relaxed">
                <strong className="text-white block mb-1">Como funciona esta fórmula:</strong>
                {generated.explanation}
              </div>
            </div>

            {/* Alternate Language Version (English VLOOKUP/INDEX/MATCH) */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Versão em Inglês (Excel em Inglês / Google Sheets):
                </span>
                <button
                  onClick={() => {
                    const engFormula = generated.formula
                      .replace(/ÍNDICE/g, 'INDEX')
                      .replace(/CORRESP/g, 'MATCH')
                      .replace(/BUSCAX/g, 'XLOOKUP')
                      .replace(/PROCV/g, 'VLOOKUP')
                      .replace(/SOMARPRODUTO/g, 'SUMPRODUCT')
                      .replace(/;/g, ',');
                    handleCopy(engFormula, 'eng');
                  }}
                  className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center space-x-1"
                >
                  {copiedType === 'eng' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copiar Versão Inglês</span>
                </button>
              </div>
              <div className="font-mono text-xs text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 select-all">
                {generated.formula
                  .replace(/ÍNDICE/g, 'INDEX')
                  .replace(/CORRESP/g, 'MATCH')
                  .replace(/BUSCAX/g, 'XLOOKUP')
                  .replace(/PROCV/g, 'VLOOKUP')
                  .replace(/SOMARPRODUTO/g, 'SUMPRODUCT')
                  .replace(/;/g, ',')}
              </div>
            </div>
          </div>

          {/* Dicas de Boas Práticas no Excel */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>Dicas para a Fórmula Funcionar Perfeitamente no Excel</span>
            </h4>
            <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside">
              <li>
                <strong>Cifrão ($):</strong> Trave as células do intervalo com `$` (ex: `$A$2:$A$125`) para poder arrastar a fórmula para baixo sem desalinhamento.
              </li>
              <li>
                <strong>Formatação do Inversor:</strong> Certifique-se de que o filtro do Inversor corresponda exatamente ao texto do cabeçalho (ex: `Inversor 01` com zero à esquerda ou `Inversor 1`).
              </li>
              <li>
                <strong>Remover Espaços Extras:</strong> Se houver risco de ter espaços no nome da UFV, embrulhe o valor em `ARRUMAR()` / `TRIM()` ex: `ARRUMAR(A2)`.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
