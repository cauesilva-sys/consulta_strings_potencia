import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  CheckCircle2,
  Table,
  Layers,
  Sparkles,
  Info,
  ExternalLink,
  ShieldCheck,
  Building2,
  Cpu,
  User,
} from 'lucide-react';
import { UFV_MATRIX_DATA } from '../data/ufvData';
import { downloadExcelFile } from '../utils/excelExport';

export const ExcelDownloadView: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    try {
      setDownloading(true);
      downloadExcelFile('Matriz_UFV_Strings_GDSUN.xlsx');
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Erro ao gerar Excel:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Card for Excel Download */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/30">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Base Oficial de Dados &bull; Formato Excel (.xlsx)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Download da Planilha Excel Completa da Matriz UFV
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Planilha com todas as <strong>{UFV_MATRIX_DATA.length} usinas solares</strong>, dados de inversores
              (Inversor 01 ao Inversor 72), potência de inversores, rastreadores (trackers/fixas), supervisores, demanda contratada e fórmulas prontas para integração no Excel, Google Sheets e Vercel.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto flex-shrink-0">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center justify-center space-x-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold px-6 py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/25 active:scale-95 disabled:opacity-50 text-base cursor-pointer"
            >
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>{downloading ? 'Gerando Planilha...' : 'Baixar Planilha Excel (.xlsx)'}</span>
            </button>

            <a
              href="/Matriz_UFV_Strings_GDSUN.xlsx"
              download="Matriz_UFV_Strings_GDSUN.xlsx"
              className="inline-flex items-center justify-center space-x-2 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-700 transition"
            >
              <span>Download Direto Alternativo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {downloadSuccess && (
              <div className="inline-flex items-center justify-center space-x-2 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Arquivo baixado com sucesso!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid: What is included in the Excel file */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
            <Table className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Aba 1: Matriz_UFV</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Grade bidimensional no formato oficial <strong>UFV x Inversor 01 a 72</strong>, preparada para aplicação direta de <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] text-amber-800">ÍNDICE+CORRESP</code> ou <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] text-amber-800">BUSCAX</code>.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Aba 2: Cadastro_Tecnico</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Visão tabular limpa com colunas técnicas: potência UFV, potência do inversor, estrutura (fixa ou trackers), demanda contratada, potência pico, médias e identificação de variações.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
            <User className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Aba 3: Resumo_Supervisores</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Consolidado executivo por supervisor responsável (Rafael Leal, Edy, Henrique Oliveira, Jardel Alves) e por marca de inversores (Huawei, Canadian, Sungrow, Solis, ABB).
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Aba 4: Instrucoes_Formulas</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Fórmulas de referência prontas para copiar e colar diretamente no Excel em português, facilitando o cruzamento com planilhas de faturamento, manutenção e O&M.
          </p>
        </div>
      </div>

      {/* Guide on How to Update and Deploy to Vercel */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base">
            ▲
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Como utilizar e atualizar o projeto no Vercel
            </h2>
            <p className="text-xs text-slate-500">
              Passo a passo rápido para manter sua aplicação no Vercel atualizada com este arquivo
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/70 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-bold text-xs flex items-center justify-center">1</span>
              <h4 className="font-bold text-sm text-slate-900">Baixe o Arquivo Excel</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clique no botão verde acima para baixar a planilha <strong>Matriz_UFV_Strings_GDSUN.xlsx</strong> atualizada com todas as alterações recentes (incluindo os ajustes de 70 trackers de São Bento do Una e Santa Albertina).
            </p>
          </div>

          <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/70 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-bold text-xs flex items-center justify-center">2</span>
              <h4 className="font-bold text-sm text-slate-900">Armazene na Pasta Public</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Caso deseje que seus usuários no Vercel possam fazer download diretamente, coloque o arquivo baixado dentro da pasta <code className="bg-slate-200 px-1 rounded text-slate-800">public/</code> do seu repositório Git.
            </p>
          </div>

          <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/70 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-bold text-xs flex items-center justify-center">3</span>
              <h4 className="font-bold text-sm text-slate-900">Deploy Automático</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Faça o commit e push para o repositório vinculado ao Vercel (<code className="bg-slate-200 px-1 rounded text-slate-800">git push origin main</code>). O Vercel executará o <code className="bg-slate-200 px-1 rounded text-slate-800">npm run build</code> e disponibilizará a versão atualizada instantaneamente.
            </p>
          </div>
        </div>

        {/* Quick Preview Table of the Plants */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-amber-600" />
              <span>Prévia dos dados contidos na planilha ({UFV_MATRIX_DATA.length} usinas)</span>
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Inversores: 1 até 72
            </span>
          </div>

          <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-xl text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="py-2 px-3">ID</th>
                  <th className="py-2 px-3">UFV</th>
                  <th className="py-2 px-3">Supervisor</th>
                  <th className="py-2 px-3">Marca Inversor</th>
                  <th className="py-2 px-3">Potência Inv</th>
                  <th className="py-2 px-3">Estrutura</th>
                  <th className="py-2 px-3">Trackers</th>
                  <th className="py-2 px-3">Qtd Inversores</th>
                  <th className="py-2 px-3">Strings (Inv 01)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {UFV_MATRIX_DATA.slice(0, 15).map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="py-1.5 px-3 font-mono text-slate-500">{u.id}</td>
                    <td className="py-1.5 px-3 font-medium text-slate-900">{u.ufvName}</td>
                    <td className="py-1.5 px-3 text-slate-600">{u.supervisor}</td>
                    <td className="py-1.5 px-3 text-slate-600">{u.inversorModelo}</td>
                    <td className="py-1.5 px-3 text-slate-600">{u.potenciaInversor ? `${u.potenciaInversor} kW` : '-'}</td>
                    <td className="py-1.5 px-3 text-slate-600">{u.trackerValue === 'Fixa' ? 'Fixa' : 'Tracker'}</td>
                    <td className="py-1.5 px-3 font-mono font-semibold text-amber-700">{u.trackerValue || 'Fixa'}</td>
                    <td className="py-1.5 px-3 text-slate-600">{u.strings.length}</td>
                    <td className="py-1.5 px-3 font-mono font-bold text-slate-800">{u.strings[0] ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 text-center">
            Mostrando 15 de {UFV_MATRIX_DATA.length} usinas na prévia visual. O arquivo Excel contém 100% dos registros.
          </p>
        </div>
      </div>
    </div>
  );
};
