import React, { useState, useMemo } from 'react';
import { Search, Filter, Table, Download, User, ArrowUpRight, Zap, Compass, Cpu, Layers, Info } from 'lucide-react';
import { UFV_MATRIX_DATA, UfvMatrixItem, getInversorLabel, getEstruturaInfo, getDemandaContratada } from '../data/ufvData';
import { getStringColorStyle } from '../utils/colorUtils';
import { downloadExcelFile } from '../utils/excelExport';

interface UfvMatrixTableProps {
  onSelectCell?: (ufvId: string, inverterIndex: number) => void;
}

export const UfvMatrixTable: React.FC<UfvMatrixTableProps> = ({ onSelectCell }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>('ALL');
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [selectedStructure, setSelectedStructure] = useState<string>('ALL');
  const [selectedVariation, setSelectedVariation] = useState<string>('ALL');
  const [selectedTargetString, setSelectedTargetString] = useState<string>('ALL');
  const [maxColsToDisplay, setMaxColsToDisplay] = useState<number>(30); // show 30 by default, expandable to 72

  // Unique supervisors list
  const supervisors = useMemo(() => {
    const set = new Set<string>();
    UFV_MATRIX_DATA.forEach((u) => {
      if (u.supervisor) set.add(u.supervisor);
    });
    return Array.from(set).sort();
  }, []);

  const supervisorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    UFV_MATRIX_DATA.forEach((u) => {
      if (u.supervisor) counts[u.supervisor] = (counts[u.supervisor] || 0) + 1;
    });
    return counts;
  }, []);

  // Unique inverter brands list
  const brands = useMemo(() => {
    const set = new Set<string>();
    UFV_MATRIX_DATA.forEach((u) => {
      if (u.inversorModelo) set.add(u.inversorModelo);
    });
    return Array.from(set).sort();
  }, []);

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    UFV_MATRIX_DATA.forEach((u) => {
      const b = u.inversorModelo || 'Outros';
      counts[b] = (counts[b] || 0) + 1;
    });
    return counts;
  }, []);

  // Unique string values across all plants for the filter
  const allAvailableStrings = useMemo(() => {
    const set = new Set<number>();
    UFV_MATRIX_DATA.forEach((u) => u.strings.forEach((s) => set.add(s)));
    return Array.from(set).sort((a, b) => b - a);
  }, []);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return UFV_MATRIX_DATA.filter((item) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        item.ufvName.toLowerCase().includes(q) ||
        (item.supervisor && item.supervisor.toLowerCase().includes(q)) ||
        (item.inversorModelo && item.inversorModelo.toLowerCase().includes(q));

      const matchesSupervisor =
        selectedSupervisor === 'ALL' || item.supervisor === selectedSupervisor;

      const matchesBrand =
        selectedBrand === 'ALL' || item.inversorModelo === selectedBrand;

      const isFixa = !item.trackerValue || item.trackerValue === 'Fixa';
      const matchesStructure =
        selectedStructure === 'ALL' ||
        (selectedStructure === 'FIXA' && isFixa) ||
        (selectedStructure === 'TRACKER' && !isFixa);

      const hasVariation = new Set(item.strings).size > 1;
      const matchesVariation =
        selectedVariation === 'ALL' ||
        (selectedVariation === 'VARIATION' && hasVariation);

      const matchesTargetString =
        selectedTargetString === 'ALL' ||
        item.strings.includes(Number(selectedTargetString));

      return matchesSearch && matchesSupervisor && matchesBrand && matchesStructure && matchesVariation && matchesTargetString;
    });
  }, [searchTerm, selectedSupervisor, selectedBrand, selectedStructure, selectedVariation, selectedTargetString]);

  // Overall Statistics
  const overallStats = useMemo(() => {
    let totalStrings = 0;
    let totalInverters = 0;
    let totalFixa = 0;
    let totalTracker = 0;

    filteredData.forEach((u) => {
      totalInverters += u.strings.length;
      totalStrings += u.strings.reduce((a, b) => a + b, 0);
      if (!u.trackerValue || u.trackerValue === 'Fixa') {
        totalFixa++;
      } else {
        totalTracker++;
      }
    });

    return {
      ufvCount: filteredData.length,
      totalInverters,
      totalStrings,
      avgStrings: totalInverters > 0 ? (totalStrings / totalInverters).toFixed(1) : '0',
      totalFixa,
      totalTracker,
    };
  }, [filteredData]);

  // Export visible data to CSV
  const exportCsv = () => {
    let csv = 'UFV;Potência UFV;Modelo Inversor;Potência Inv;Estrutura/Tracker;Supervisor;' + Array.from({ length: 72 }, (_, i) => getInversorLabel(i)).join(';') + '\n';
    filteredData.forEach((u) => {
      const est = getEstruturaInfo(u);
      let row = `"${u.ufvName}";"${u.potenciaUfv || ''}";"${u.inversorModelo || ''}";"${u.potenciaInversor || ''}";"${est.badgeLabel}";"${u.supervisor || ''}"`;
      for (let i = 0; i < 72; i++) {
        const startNum = u.inverterStartNumber || 1;
        const localIdx = i - (startNum - 1);
        const hasVal = localIdx >= 0 && localIdx < u.strings.length;
        row += `;${hasVal ? u.strings[localIdx] : ''}`;
      }
      csv += row + '\n';
    });

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Matriz_UFV_Especificacoes_Strings.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Table Header & Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-1 border border-amber-500/20">
              <Table className="w-3.5 h-3.5 text-amber-600" />
              <span>Matriz Completa de Dados e Especificações</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Tabela UFV x Especificações Técnicas x Inversores
            </h2>
            <p className="text-slate-600 text-sm mt-0.5">
              Exibe a potência de cada UFV, modelo de inversor, tipo de estrutura (Fixa/Tracker) e quantidade de strings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => downloadExcelFile('Matriz_UFV_Strings_GDSUN.xlsx')}
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-100" />
              <span>Baixar Excel (.xlsx)</span>
            </button>

            <button
              onClick={exportCsv}
              className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-3 border-t border-slate-100">
          <div className="sm:col-span-3 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Filtrar por UFV, modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
          </div>

          <div className="sm:col-span-2">
            <select
              value={selectedSupervisor}
              onChange={(e) => setSelectedSupervisor(e.target.value)}
              className="w-full py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-medium"
            >
              <option value="ALL">Supervisores: Todos ({UFV_MATRIX_DATA.length})</option>
              {supervisors.map((s) => (
                <option key={s} value={s}>
                  {s} ({supervisorCounts[s]} usinas)
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-medium"
            >
              <option value="ALL">Marca: Todas ({brands.length})</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b} ({brandCounts[b]} usinas)
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <select
              value={selectedVariation}
              onChange={(e) => setSelectedVariation(e.target.value)}
              className="w-full py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-medium"
            >
              <option value="ALL">Variação: Todas</option>
              <option value="VARIATION">Com Variação</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <select
              value={selectedTargetString}
              onChange={(e) => setSelectedTargetString(e.target.value)}
              className="w-full py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-medium"
            >
              <option value="ALL">Qtd. Strings (Todas)</option>
              {allAvailableStrings.map((val) => (
                <option key={val} value={val}>
                  Possui {val} strings
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-1 flex items-center justify-end">
            <button
              onClick={() => setMaxColsToDisplay(maxColsToDisplay === 72 ? 30 : 72)}
              className="w-full text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-2 rounded-xl hover:bg-amber-100 transition text-center truncate"
              title={maxColsToDisplay === 72 ? 'Exibir 30 colunas de inversores' : 'Exibir até 72 colunas de inversores'}
            >
              {maxColsToDisplay === 72 ? '30 col' : '72 col'}
            </button>
          </div>
        </div>

        {/* Summary Metric Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 text-[11px] font-medium block">Total de UFVs</span>
            <span className="text-lg font-bold text-slate-900 font-mono">{overallStats.ufvCount}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 text-[11px] font-medium block">Total Inversores</span>
            <span className="text-lg font-bold text-slate-900 font-mono">{overallStats.totalInverters}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-amber-800 text-[11px] font-medium block">Total de Strings</span>
            <span className="text-lg font-bold text-amber-600 font-mono">{overallStats.totalStrings}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-emerald-800 text-[11px] font-medium block">Usinas Tracker</span>
            <span className="text-lg font-bold text-emerald-600 font-mono">{overallStats.totalTracker}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-600 text-[11px] font-medium block">Usinas Fixas</span>
            <span className="text-lg font-bold text-slate-700 font-mono">{overallStats.totalFixa}</span>
          </div>
        </div>
      </div>

      {/* Spreadsheet Matrix Grid View */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto relative scrollbar-thin">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 z-20 bg-slate-900 text-white shadow-md">
              <tr>
                <th className="p-3 sticky left-0 z-30 bg-slate-900 border-r border-b border-slate-800 min-w-[150px] font-bold text-amber-400">
                  UFV / Usina
                </th>
                <th className="p-3 border-r border-b border-slate-800 min-w-[100px] font-medium text-amber-300">
                  Potência UFV
                </th>
                <th className="p-3 border-r border-b border-slate-800 min-w-[120px] font-medium text-blue-300">
                  Modelo Inversor
                </th>
                <th className="p-3 border-r border-b border-slate-800 min-w-[130px] font-medium text-emerald-300">
                  Estrutura / Tracker
                </th>
                <th className="p-3 border-r border-b border-slate-800 min-w-[120px] font-medium text-slate-300">
                  Supervisor
                </th>
                {Array.from({ length: maxColsToDisplay }).map((_, idx) => (
                  <th
                    key={idx}
                    className="p-2.5 border-r border-b border-slate-800 text-center font-mono font-medium text-slate-200 min-w-[70px]"
                  >
                    {getInversorLabel(idx)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 font-mono">
              {filteredData.map((ufv) => {
                const est = getEstruturaInfo(ufv);
                const uniqueVals = Array.from<number>(new Set(ufv.strings)).sort((a, b) => b - a);
                const hasVariation = uniqueVals.length > 1;

                return (
                  <tr key={ufv.id} className="hover:bg-amber-50/40 transition-colors">
                    {/* Sticky UFV Column */}
                    <td className="p-3 sticky left-0 z-10 bg-white font-bold text-slate-900 border-r border-slate-200 shadow-sm font-sans flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 min-w-0">
                        <span className="truncate">{ufv.ufvName}</span>
                        {hasVariation && (
                          <span
                            className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-amber-300 font-bold border border-slate-700"
                            title={`Variação nesta usina: ${uniqueVals.join(', ')} (${ufv.unit === 'kWp' ? 'Potência kWp' : 'str'})`}
                          >
                            {uniqueVals.join('/')} {ufv.unit === 'kWp' ? 'kWp (Potência)' : 'str'}
                          </span>
                        )}
                        {ufv.obs && (
                          <div className="relative group inline-block flex-shrink-0">
                            <span className="bg-amber-100 text-amber-800 px-1 py-0.5 rounded text-[10px] font-bold border border-amber-300 flex items-center cursor-help" title={ufv.obs}>
                              <Info className="w-3 h-3 text-amber-700" />
                            </span>
                            <div className="absolute left-0 bottom-full mb-1.5 hidden group-hover:block z-50 w-64 p-2 bg-slate-900 text-white text-[11px] font-sans rounded-lg shadow-xl border border-slate-700 pointer-events-none">
                              <span className="font-bold text-amber-400 block mb-0.5">Observação:</span>
                              {ufv.obs}
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => onSelectCell && onSelectCell(ufv.id, 0)}
                        className="text-[10px] text-amber-700 hover:text-amber-900 font-mono bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 ml-1 flex-shrink-0"
                        title="Testar no simulador"
                      >
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>

                    {/* Potência UFV & Demanda */}
                    <td className="p-3 text-slate-900 border-r border-slate-200 font-mono text-xs bg-amber-50/20">
                      <div className="font-bold">{ufv.potenciaUfv || '-'}</div>
                      <div className="text-[10px] text-slate-500 font-sans font-medium" title="Demanda Contratada da Usina">
                        Dem: {getDemandaContratada(ufv)}
                      </div>
                    </td>

                    {/* Modelo Inversor */}
                    <td className="p-3 text-slate-800 font-medium border-r border-slate-200 font-sans text-xs">
                      {ufv.inversorModelo || 'Geral'} {ufv.potenciaInversor ? `(${ufv.potenciaInversor}kW)` : ''}
                    </td>

                    {/* Estrutura / Tracker */}
                    <td className="p-3 border-r border-slate-200 font-sans text-xs">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        est.isFixa
                          ? 'bg-white text-slate-800 border border-slate-300 font-medium'
                          : 'bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300'
                      }`}>
                        {est.badgeLabel}
                      </span>
                    </td>

                    {/* Supervisor Column */}
                    <td className="p-3 text-slate-600 border-r border-slate-200 font-sans text-xs">
                      {ufv.supervisor || '-'}
                    </td>

                    {/* Inverters Strings Values */}
                    {Array.from({ length: maxColsToDisplay }).map((_, idx) => {
                      const startNum = ufv.inverterStartNumber || 1;
                      const localIdx = idx - (startNum - 1);
                      const hasVal = localIdx >= 0 && localIdx < ufv.strings.length;
                      const stringVal = hasVal ? ufv.strings[localIdx] : null;

                      let cellBg = 'bg-white text-slate-300';
                      const isFilterTarget = selectedTargetString !== 'ALL' && stringVal === Number(selectedTargetString);
                      const isFilterNonTarget = selectedTargetString !== 'ALL' && stringVal !== null && stringVal !== Number(selectedTargetString);

                      if (stringVal !== null) {
                        const style = getStringColorStyle(stringVal, ufv.strings, false);
                        cellBg = style.cardBg;
                      }

                      return (
                        <td
                          key={idx}
                          onClick={() => {
                            if (hasVal && onSelectCell) {
                              onSelectCell(ufv.id, localIdx);
                            }
                          }}
                          className={`p-2 border-r border-slate-200 text-center text-xs transition-all cursor-pointer select-none font-mono relative ${cellBg} ${
                            isFilterTarget ? 'ring-2 ring-amber-500 scale-105 z-10 font-black shadow-md' : ''
                          } ${isFilterNonTarget ? 'opacity-35 blur-[0.3px]' : ''}`}
                          title={hasVal ? `UFV ${ufv.ufvName} - ${getInversorLabel(localIdx, ufv)}: ${stringVal} ${ufv.unit === 'kWp' ? 'kWp (Potência)' : 'strings'}` : 'N/A'}
                        >
                          {stringVal !== null ? stringVal : '-'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={maxColsToDisplay + 5} className="p-8 text-center text-slate-500 font-sans">
                    Nenhuma UFV encontrada com os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
