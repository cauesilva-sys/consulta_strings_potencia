import React, { useState, useMemo, useEffect } from 'react';
import { Search, Zap, Check, Copy, ArrowRight, Activity, Building2, User, Cpu, Info, FileSpreadsheet, Compass, ShieldCheck, Gauge, Layers, Filter, Download } from 'lucide-react';
import { UFV_MATRIX_DATA, UfvMatrixItem, getInversorLabel, getInversorShortLabel, getEstruturaInfo, getDemandaContratada, getPotenciaPico } from '../data/ufvData';
import { getStringColorStyle } from '../utils/colorUtils';
import { downloadExcelFile } from '../utils/excelExport';

interface UfvLookupSimulatorProps {
  onGoToFormulas: () => void;
  onGoToExcel?: () => void;
}

export const UfvLookupSimulator: React.FC<UfvLookupSimulatorProps> = ({ onGoToFormulas, onGoToExcel }) => {
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>('ALL');
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [selectedUfvId, setSelectedUfvId] = useState<string>('1'); // PEP default
  const [selectedInverterIndex, setSelectedInverterIndex] = useState<number>(0); // Inversor 01 default
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [onlyVariations, setOnlyVariations] = useState<boolean>(false);
  const [filterStringCount, setFilterStringCount] = useState<number | 'ALL'>('ALL');
  const [excelDownloading, setExcelDownloading] = useState(false);

  // Compute unique supervisors with plant counts
  const supervisorsList = useMemo(() => {
    const counts: Record<string, number> = {};
    UFV_MATRIX_DATA.forEach((u) => {
      if (u.supervisor) {
        counts[u.supervisor] = (counts[u.supervisor] || 0) + 1;
      }
    });
    return Object.keys(counts)
      .sort()
      .map((name) => ({
        name,
        count: counts[name],
      }));
  }, []);

  // Compute unique inverter brands with plant counts
  const brandsList = useMemo(() => {
    const counts: Record<string, number> = {};
    UFV_MATRIX_DATA.forEach((u) => {
      const brand = u.inversorModelo || 'Outros';
      counts[brand] = (counts[brand] || 0) + 1;
    });
    return Object.keys(counts)
      .sort((a, b) => counts[b] - counts[a]) // Descending by frequency (Huawei, Canadian, Sungrow, Solis, ABB)
      .map((name) => ({
        name,
        count: counts[name],
      }));
  }, []);

  // Compute brand counts filtered by active supervisor
  const supervisorBrandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    UFV_MATRIX_DATA.forEach((u) => {
      if (selectedSupervisor === 'ALL' || u.supervisor === selectedSupervisor) {
        const brand = u.inversorModelo || 'Outros';
        counts[brand] = (counts[brand] || 0) + 1;
      }
    });
    return counts;
  }, [selectedSupervisor]);

  // Filter UFV list dynamically based on selected supervisor, brand, search query and variations
  const filteredUfvs = useMemo(() => {
    return UFV_MATRIX_DATA.filter((item) => {
      // 1. Supervisor filter
      if (selectedSupervisor !== 'ALL' && item.supervisor !== selectedSupervisor) {
        return false;
      }

      // 2. Brand filter
      if (selectedBrand !== 'ALL' && (item.inversorModelo || 'Outros') !== selectedBrand) {
        return false;
      }

      // 3. Search query filter
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesSearch =
          item.ufvName.toLowerCase().includes(q) ||
          (item.supervisor && item.supervisor.toLowerCase().includes(q)) ||
          (item.inversorModelo && item.inversorModelo.toLowerCase().includes(q)) ||
          (item.potenciaInversor && `${item.potenciaInversor}`.toLowerCase().includes(q));

        if (!matchesSearch) return false;
      }

      // 4. Variation filter
      const hasVariation = new Set(item.strings).size > 1;
      const matchesVariation = !onlyVariations || hasVariation;

      return matchesVariation;
    });
  }, [selectedSupervisor, selectedBrand, searchQuery, onlyVariations]);

  // Handler to select a UFV safely
  const handleSelectUfv = (ufvId: string) => {
    setSelectedUfvId(ufvId);
    setFilterStringCount('ALL');
    setSelectedInverterIndex(0);
  };

  // Handler to change inverter brand filter
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSearchQuery('');
    setFilterStringCount('ALL');
    setSelectedInverterIndex(0);

    // Look for first UFV matching this brand within current supervisor
    let match = UFV_MATRIX_DATA.find((u) => {
      if (selectedSupervisor !== 'ALL' && u.supervisor !== selectedSupervisor) return false;
      if (brand !== 'ALL' && (u.inversorModelo || 'Outros') !== brand) return false;
      return true;
    });

    // If no plant under current supervisor has this brand, reset supervisor to ALL
    if (!match && brand !== 'ALL') {
      match = UFV_MATRIX_DATA.find((u) => (u.inversorModelo || 'Outros') === brand);
      if (match) {
        setSelectedSupervisor('ALL');
      }
    }

    if (match) {
      setSelectedUfvId(match.id);
    }
  };

  // Handler to change supervisor
  const handleSupervisorChange = (supervisor: string) => {
    setSelectedSupervisor(supervisor);
    setSearchQuery('');
    setFilterStringCount('ALL');
    setSelectedInverterIndex(0);

    // Check if current brand exists in new supervisor; if not, reset brand to ALL
    let firstUfv = UFV_MATRIX_DATA.find((u) => {
      if (supervisor !== 'ALL' && u.supervisor !== supervisor) return false;
      if (selectedBrand !== 'ALL' && (u.inversorModelo || 'Outros') !== selectedBrand) return false;
      return true;
    });

    if (!firstUfv) {
      setSelectedBrand('ALL');
      firstUfv = supervisor === 'ALL'
        ? UFV_MATRIX_DATA[0]
        : UFV_MATRIX_DATA.find((u) => u.supervisor === supervisor);
    }

    if (firstUfv) {
      setSelectedUfvId(firstUfv.id);
    }
  };

  // Current active UFV, guaranteed to always be in sync with filtered items
  const currentUfv = useMemo(() => {
    const foundInFiltered = filteredUfvs.find((item) => item.id === selectedUfvId);
    if (foundInFiltered) return foundInFiltered;

    if (filteredUfvs.length > 0) return filteredUfvs[0];

    return UFV_MATRIX_DATA.find((item) => item.id === selectedUfvId) || UFV_MATRIX_DATA[0];
  }, [filteredUfvs, selectedUfvId]);

  // Keep selectedUfvId in sync with currentUfv without triggering extra renders
  useEffect(() => {
    if (currentUfv && currentUfv.id !== selectedUfvId) {
      setSelectedUfvId(currentUfv.id);
    }
  }, [currentUfv, selectedUfvId]);

  // Safe Inverter Index to prevent any out-of-bounds error
  const safeInverterIndex = useMemo(() => {
    if (!currentUfv || !currentUfv.strings || currentUfv.strings.length === 0) return 0;
    if (selectedInverterIndex >= currentUfv.strings.length) return 0;
    return selectedInverterIndex;
  }, [currentUfv, selectedInverterIndex]);

  const currentUnit = currentUfv.unit || 'strings';

  // Selected Inverter strings count
  const stringCount = useMemo(() => {
    if (currentUfv.strings && safeInverterIndex < currentUfv.strings.length) {
      return currentUfv.strings[safeInverterIndex];
    }
    return 0;
  }, [currentUfv, safeInverterIndex]);

  // Structure/Tracker information helper
  const estrutura = useMemo(() => {
    return getEstruturaInfo(currentUfv);
  }, [currentUfv]);

  // Total strings and average for this UFV
  const ufvStats = useMemo(() => {
    const strings = currentUfv.strings || [];
    const total = strings.reduce((acc, curr) => acc + (curr || 0), 0);
    const count = strings.length;
    const avg = count > 0 ? (total / count).toFixed(1) : '0';
    return { total, count, avg };
  }, [currentUfv]);

  // Quick Formula text for this selection
  const formulaText = `=ÍNDICE(Matriz!B2:BU120; CORRESP("${currentUfv.ufvName}"; Matriz!A2:A120; 0); CORRESP("${getInversorLabel(safeInverterIndex, currentUfv)}"; Matriz!B1:BU1; 0))`;

  const handleCopyFormula = () => {
    navigator.clipboard.writeText(formulaText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadExcel = () => {
    try {
      setExcelDownloading(true);
      downloadExcelFile('Matriz_UFV_Strings_GDSUN.xlsx');
    } finally {
      setTimeout(() => setExcelDownloading(false), 1500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner / Atalho Rápido para Baixar o Excel */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 flex-shrink-0">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-bold text-sm sm:text-base text-slate-100">
                Planilha Excel Completa com todas as 126 UFVs e Inversores
              </h2>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-wider">
                Atualizada
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Arquivo formatado em .xlsx pronto para importação no Vercel, Excel, Google Sheets e fórmulas de PROCV/BUSCAX.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleDownloadExcel}
            disabled={excelDownloading}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition text-xs shadow-md shadow-emerald-500/20 active:scale-95 disabled:opacity-50 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>{excelDownloading ? 'Baixando...' : 'Baixar Excel (.xlsx)'}</span>
          </button>

          {onGoToExcel && (
            <button
              type="button"
              onClick={onGoToExcel}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3 py-2.5 rounded-xl border border-slate-700 transition cursor-pointer whitespace-nowrap"
            >
              <span>Ver Detalhes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Filter & Interactive Lookup Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Filter Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-amber-600" />
              <span>Filtros de Seleção</span>
            </h3>
            <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md font-mono">
              {UFV_MATRIX_DATA.length} UFVs
            </span>
          </div>

          {/* 1. Filtro por Supervisor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="supervisor-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-amber-600" />
                <span>1. Filtro por Supervisor</span>
              </label>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-semibold">
                {selectedSupervisor === 'ALL'
                  ? `${UFV_MATRIX_DATA.length} usinas`
                  : `${filteredUfvs.length} usinas`}
              </span>
            </div>

            {/* Menu Suspenso de Supervisor */}
            <select
              id="supervisor-select"
              value={selectedSupervisor}
              onChange={(e) => handleSupervisorChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 shadow-2xs cursor-pointer"
            >
              <option value="ALL">Todos os Supervisores ({UFV_MATRIX_DATA.length} usinas)</option>
              {supervisorsList.map((sup) => (
                <option key={sup.name} value={sup.name}>
                  {sup.name} ({sup.count} usinas)
                </option>
              ))}
            </select>

            {/* Botões Rápidos de Supervisor */}
            <div className="flex flex-wrap gap-1.5 pt-0.5 notranslate" translate="no">
              <button
                type="button"
                onClick={() => handleSupervisorChange('ALL')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all border ${
                  selectedSupervisor === 'ALL'
                    ? 'bg-slate-900 text-amber-400 border-slate-900 font-bold shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>Todos ({UFV_MATRIX_DATA.length})</span>
              </button>
              {supervisorsList.map((sup) => (
                <button
                  key={sup.name}
                  type="button"
                  onClick={() => handleSupervisorChange(sup.name)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all border ${
                    selectedSupervisor === sup.name
                      ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50 hover:text-amber-900'
                  }`}
                >
                  <span>{sup.name}</span>
                  <span className="ml-1 text-[10px] opacity-75 font-mono">({sup.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Filtro por Marca do Inversor (Fabricante) */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="brand-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-amber-600" />
                <span>2. Marca do Inversor</span>
              </label>
              <div className="flex items-center space-x-2">
                {selectedBrand !== 'ALL' && (
                  <button
                    type="button"
                    onClick={() => handleBrandChange('ALL')}
                    className="text-[10px] text-amber-700 hover:text-amber-800 underline font-medium cursor-pointer"
                  >
                    Ver todas
                  </button>
                )}
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-semibold">
                  {selectedBrand === 'ALL' ? `${brandsList.length} marcas` : selectedBrand}
                </span>
              </div>
            </div>

            {/* Menu Suspenso de Marca */}
            <select
              id="brand-select"
              value={selectedBrand}
              onChange={(e) => handleBrandChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 shadow-2xs cursor-pointer"
            >
              <option value="ALL">Todas as Marcas ({UFV_MATRIX_DATA.length} usinas)</option>
              {brandsList.map((b) => {
                const countInSup = supervisorBrandCounts[b.name] || 0;
                return (
                  <option key={b.name} value={b.name}>
                    {b.name} ({b.count} usinas{selectedSupervisor !== 'ALL' ? ` • ${countInSup} em ${selectedSupervisor}` : ''})
                  </option>
                );
              })}
            </select>

            {/* Botões Rápidos de Marca */}
            <div className="flex flex-wrap gap-1.5 pt-0.5 notranslate" translate="no">
              <button
                type="button"
                onClick={() => handleBrandChange('ALL')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all border ${
                  selectedBrand === 'ALL'
                    ? 'bg-slate-900 text-amber-400 border-slate-900 font-bold shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>Todas ({UFV_MATRIX_DATA.length})</span>
              </button>
              {brandsList.map((b) => {
                const isSelected = selectedBrand === b.name;
                const inSupCount = supervisorBrandCounts[b.name] || 0;
                const isNoneInSup = selectedSupervisor !== 'ALL' && inSupCount === 0;

                return (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => handleBrandChange(b.name)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all border flex items-center space-x-1 ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold shadow-xs'
                        : isNoneInSup
                        ? 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50 hover:text-amber-900'
                    }`}
                    title={
                      selectedSupervisor !== 'ALL'
                        ? `${b.name}: ${inSupCount} usinas com ${selectedSupervisor} (total ${b.count})`
                        : `${b.name}: ${b.count} usinas no total`
                    }
                  >
                    <span>{b.name}</span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-slate-950 font-bold' : 'text-slate-500'}`}>
                      ({selectedSupervisor !== 'ALL' ? inSupCount : b.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Seleção de Usina (dinâmica por supervisor e marca) */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="ufv-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>3. Seleção de Usina</span>
              </label>

              {/* Filter for plants with string variations */}
              <button
                type="button"
                onClick={() => setOnlyVariations(!onlyVariations)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center space-x-1 transition-all ${
                  onlyVariations
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
                title="Filtrar apenas usinas que possuem número de strings diferente nos seus inversores"
              >
                <Layers className="w-3 h-3 text-amber-700" />
                <span>Com Variação ({filteredUfvs.filter((u) => new Set(u.strings).size > 1).length})</span>
              </button>
            </div>

            {/* Menu Suspenso de Usina (Exibe apenas as usinas daquele supervisor e marca) */}
            <select
              id="ufv-select"
              value={currentUfv.id}
              onChange={(e) => handleSelectUfv(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 shadow-2xs cursor-pointer"
            >
              {filteredUfvs.map((ufv) => (
                <option key={ufv.id} value={ufv.id}>
                  {ufv.ufvName} — {ufv.potenciaUfv || ''} [{ufv.inversorModelo || 'Geral'}{ufv.potenciaInversor ? ` • ${ufv.potenciaInversor} kW` : ''}]{selectedSupervisor === 'ALL' && ufv.supervisor ? ` • ${ufv.supervisor}` : ''}
                </option>
              ))}
            </select>

            {/* Campo de Busca Rápida */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder={
                  selectedBrand !== 'ALL'
                    ? `Buscar entre as ${filteredUfvs.length} usinas da marca ${selectedBrand}...`
                    : selectedSupervisor !== 'ALL'
                    ? `Buscar entre as ${filteredUfvs.length} usinas de ${selectedSupervisor}...`
                    : "Buscar UFV por nome, modelo (Huawei, Canadian, Solis)..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
              />
            </div>

            {/* Lista Interativa Dinâmica */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl max-h-52 overflow-y-auto p-1.5 space-y-1 scrollbar-thin">
              {filteredUfvs.map((ufv) => {
                const isSelected = ufv.id === currentUfv.id;
                const uniqueVals = Array.from<number>(new Set(ufv.strings)).sort((a, b) => b - a);
                const hasVariation = uniqueVals.length > 1;

                return (
                  <button
                    key={ufv.id}
                    type="button"
                    onClick={() => handleSelectUfv(ufv.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-800 hover:bg-amber-100/60 hover:text-amber-900 bg-white border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 min-w-0">
                      <span className="font-semibold truncate">{ufv.ufvName}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        isSelected ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {ufv.inversorModelo || 'Geral'}
                      </span>
                      {hasVariation && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                          isSelected ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-amber-300 border border-slate-700'
                        }`} title={`Variações na UFV: ${uniqueVals.join(', ')} (${ufv.unit === 'kWp' ? 'Potência kWp' : 'str'})`}>
                          {uniqueVals.join('/')} {ufv.unit === 'kWp' ? 'kWp' : 'str'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1.5 flex-shrink-0 ml-2">
                      {selectedSupervisor === 'ALL' && ufv.supervisor && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {ufv.supervisor}
                        </span>
                      )}
                      <span className={`text-[11px] font-mono ${isSelected ? 'text-slate-950/90 font-semibold' : 'text-slate-500'}`}>
                        {ufv.potenciaUfv || ''}
                      </span>
                    </div>
                  </button>
                );
              })}
              {filteredUfvs.length === 0 && (
                <div className="py-6 text-slate-400 text-xs text-center font-sans space-y-2">
                  <p>
                    Nenhuma UFV encontrada {selectedBrand !== 'ALL' ? `com a marca ${selectedBrand}` : ''} {selectedSupervisor !== 'ALL' ? `para o supervisor ${selectedSupervisor}` : ''} {searchQuery ? `com "${searchQuery}"` : ''}
                  </p>
                  {(selectedBrand !== 'ALL' || selectedSupervisor !== 'ALL') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBrand('ALL');
                        setSelectedSupervisor('ALL');
                        setSearchQuery('');
                      }}
                      className="px-3 py-1 bg-amber-500 text-slate-950 rounded-lg text-xs font-bold hover:bg-amber-600 cursor-pointer"
                    >
                      Limpar todos os filtros
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 4. Seleção de Inversor */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label htmlFor="inverter-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-amber-600" />
                <span>4. Selecionar Inversor</span>
              </label>
              <span className="text-xs text-amber-700 font-semibold">
                {currentUfv.strings.length} inversores ({currentUfv.inversorModelo || 'Geral'})
              </span>
            </div>

            <select
              id="inverter-select"
              value={safeInverterIndex}
              onChange={(e) => setSelectedInverterIndex(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 cursor-pointer shadow-2xs"
            >
              {Array.from({ length: Math.max(currentUfv.strings?.length || 0, 1) }).map((_, idx) => {
                const label = getInversorLabel(idx, currentUfv);
                const hasData = currentUfv.strings && idx < currentUfv.strings.length;
                const strVal = hasData ? currentUfv.strings[idx] : null;
                const maxVal = currentUfv.strings && currentUfv.strings.length > 0 ? Math.max(...currentUfv.strings) : 0;
                const isMax = strVal === maxVal && currentUfv.strings.length > 0;

                return (
                  <option key={idx} value={idx} disabled={!hasData}>
                    {label} {hasData ? `(${strVal} ${currentUnit === 'kWp' ? 'kWp (Potência)' : 'strings'}${isMax ? ' - Maior' : ''})` : '(Não existente nesta UFV)'}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Quick Buttons for Inverters */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-slate-600">Atalhos rápidos dos Inversores:</label>
              <span className="text-[10px] text-slate-400">Cinza escuro = Maior valor ({currentUnit === 'kWp' ? 'Potência' : currentUnit})</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200 scrollbar-thin">
              {currentUfv.strings.map((str, idx) => {
                const isSelected = safeInverterIndex === idx;
                const colorStyle = getStringColorStyle(str, currentUfv.strings, isSelected);

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedInverterIndex(idx)}
                    className={`px-2.5 py-1.5 text-xs rounded-lg font-mono transition-all border flex items-center space-x-1 ${colorStyle.cardBg}`}
                    title={`${getInversorLabel(idx, currentUfv)}: ${str} ${currentUnit === 'kWp' ? 'kWp (Potência)' : currentUnit}`}
                  >
                    <span>{getInversorShortLabel(idx, currentUfv)}</span>
                    <span className={`px-1 rounded text-[10px] font-bold ${
                      isSelected ? 'bg-slate-950 text-amber-300' : colorStyle.badgeBg + ' ' + colorStyle.badgeText
                    }`}>
                      {str} {currentUnit === 'kWp' ? 'kWp (Potência)' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Result Card & Technical Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Technical Specification Result Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

            {/* Header / Supervisor info */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono tracking-wider uppercase text-amber-400 font-semibold">
                  Resultado da Consulta - Matriz UFV
                </span>
              </div>
              {currentUfv.supervisor && (
                <div className="flex items-center space-x-1.5 text-xs text-slate-200 bg-slate-800/90 px-3 py-1 rounded-full border border-slate-700 shadow-xs">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Supervisor Responsável: <strong className="text-amber-300">{currentUfv.supervisor}</strong></span>
                </div>
              )}
            </div>

            {/* Core Selected Strings Display */}
            <div className="my-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{currentUfv.ufvName} &bull; {getInversorLabel(safeInverterIndex, currentUfv)}</span>
                </div>
                <div className="text-slate-300 text-sm font-medium">
                  {currentUnit === 'kWp' ? 'Potência do Inversor:' : 'Quantidade de Strings na Célula:'}
                </div>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="text-5xl md:text-6xl font-extrabold text-amber-400 tracking-tight font-mono">
                    {stringCount}
                  </span>
                  <span className="text-lg text-slate-300 font-semibold">{currentUnit === 'kWp' ? 'kWp (Potência)' : 'strings associadas'}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 text-left md:text-right space-y-1 w-full md:w-auto">
                <div className="text-xs text-slate-400">Status do Mapeamento</div>
                <div className="inline-flex items-center space-x-1.5 text-emerald-400 font-semibold text-xs bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <Check className="w-3.5 h-3.5" />
                  <span>Célula Localizada</span>
                </div>
                <div className="text-xs text-slate-400 font-mono pt-1">
                  UFV: <strong className="text-amber-300">{currentUfv.ufvName}</strong> | Inv: <strong className="text-amber-300">{getInversorLabel(safeInverterIndex, currentUfv)}</strong>
                </div>
                <div className="text-xs text-slate-300 font-mono pt-1.5 border-t border-slate-700/60 mt-1.5 flex items-center justify-start md:justify-end space-x-1.5">
                  <span className="text-slate-400 font-sans">Demanda Contratada:</span>
                  <strong className="text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                    {getDemandaContratada(currentUfv)}
                  </strong>
                </div>
              </div>
            </div>

            {/* Requested Technical Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
              {/* 1. Potência da UFV */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center space-x-1.5 text-amber-400 text-[11px] font-semibold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Potência da UFV</span>
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  {currentUfv.potenciaUfv || 'Não informada'}
                </div>
                <p className="text-[10px] text-slate-400">
                  Capacidade total pico da usina
                </p>
              </div>

              {/* 2. Modelo e Marca do Inversor */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center space-x-1.5 text-blue-400 text-[11px] font-semibold uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Marca e Modelo</span>
                </div>
                <div className="flex items-center space-x-2 pt-0.5">
                  <span className="text-lg font-bold text-white font-mono">
                    {currentUfv.inversorModelo || 'Geral'}
                  </span>
                  {currentUfv.potenciaInversor && (
                    <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono font-bold px-1.5 py-0.5 rounded">
                      {currentUfv.potenciaInversor} kW
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400">
                  Fabricante & potência nominal
                </p>
              </div>

              {/* 3. Tipo de Montagem (Fixa ou Tracker) */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 space-y-1">
                <div className={`flex items-center space-x-1.5 text-[11px] font-semibold uppercase tracking-wider ${
                  estrutura.isFixa ? 'text-white' : 'text-emerald-400'
                }`}>
                  <Compass className="w-3.5 h-3.5" />
                  <span>Estrutura / Tracker</span>
                </div>
                <div className="flex items-center space-x-1.5 pt-0.5">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    estrutura.isFixa
                      ? 'bg-slate-100 text-slate-950 border border-white'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {estrutura.badgeLabel}
                  </span>
                </div>
                <p className={`text-[10px] truncate ${estrutura.isFixa ? 'text-slate-300' : 'text-slate-400'}`} title={estrutura.detalheText}>
                  {estrutura.detalheText}
                </p>
              </div>
            </div>

            {/* Secondary UFV Analytics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-800/50 text-center">
              <div className="bg-slate-800/40 rounded-xl p-2.5 border border-slate-800">
                <div className="text-[10px] text-slate-400">Quantidade de Inversores</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">{ufvStats.count} unidades</div>
              </div>
              <div className="bg-slate-800/40 rounded-xl p-2.5 border border-slate-800">
                <div className="text-[10px] text-slate-400">Potência Pico</div>
                <div className="text-base font-bold text-amber-400 font-mono mt-0.5">
                  {getPotenciaPico(currentUfv)}
                </div>
              </div>
              <div className="bg-slate-800/40 rounded-xl p-2.5 border border-slate-800">
                <div className="text-[10px] text-slate-400">Quantidade de Strings Total</div>
                <div className="text-base font-bold text-amber-400 font-mono mt-0.5">
                  {ufvStats.total} {currentUnit === 'kWp' ? 'kWp' : 'strings'}
                </div>
              </div>
            </div>

            {/* UFV Observation / Special Note */}
            {currentUfv.obs && (
              <div className="mt-3.5 p-3.5 bg-amber-500/15 border border-amber-500/35 rounded-xl flex items-start space-x-2.5 text-xs text-amber-200">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300 block mb-0.5 uppercase tracking-wider text-[10px]">
                    Observação Técnica:
                  </span>
                  <p className="text-amber-100/90 leading-relaxed font-sans">{currentUfv.obs}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* String/Power Pattern Visualization for Selected UFV */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <Activity className="w-5 h-5 text-amber-600" />
              <span>
                {currentUnit === 'kWp'
                  ? `Distribuição de Potência (kWp) nos Inversores da UFV ${currentUfv.ufvName}`
                  : `Distribuição de Strings nos Inversores da UFV ${currentUfv.ufvName}`}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentUnit === 'kWp'
                ? 'Visão geral da potência em kWp alocada em cada inversor desta usina'
                : 'Visão geral da quantidade de strings alocadas em cada inversor desta usina'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-mono">
              Potência: <strong>{currentUfv.potenciaUfv || 'N/I'}</strong>
            </span>
            <span className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full font-mono border border-amber-200">
              Inversor: <strong>{currentUfv.inversorModelo || 'Geral'}</strong>
            </span>
          </div>
        </div>

        {/* Dynamic Color Legend & Filter Chips if variation exists */}
        {(() => {
          const sortedUnique = Array.from<number>(new Set(currentUfv.strings)).sort((a, b) => b - a);

          return (
            <div className="mb-4 space-y-2">
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-700 font-bold flex items-center space-x-1 mr-1">
                  <Filter className="w-3.5 h-3.5 text-amber-600" />
                  <span>Filtrar por {currentUnit === 'kWp' ? 'Potência (kWp)' : 'Nº de Strings'}:</span>
                </span>

                <button
                  type="button"
                  onClick={() => setFilterStringCount('ALL')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
                    filterStringCount === 'ALL'
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Todas ({currentUfv.strings.length} inv)
                </button>

                {sortedUnique.map((val: number) => {
                  const sampleStyle = getStringColorStyle(val, currentUfv.strings, false);
                  const countInUfv = currentUfv.strings.filter((s) => s === val).length;
                  const isFiltered = filterStringCount === val;

                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFilterStringCount(isFiltered ? 'ALL' : val)}
                      className={`px-3 py-1 rounded-lg border text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-2xs ${
                        isFiltered
                          ? 'ring-2 ring-amber-500 scale-105 border-amber-600 font-extrabold shadow-md ' + sampleStyle.cardBg
                          : sampleStyle.cardBg + ' hover:opacity-90'
                      }`}
                    >
                      <span>{val} {currentUnit === 'kWp' ? 'kWp (Potência)' : 'strings'}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] ${sampleStyle.badgeBg} ${sampleStyle.badgeText}`}>
                        {countInUfv} inv
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Filter Banner */}
              {filterStringCount !== 'ALL' && (
                <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 rounded-xl px-3.5 py-2 text-xs text-amber-900 font-medium">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                    <span>
                      Exibindo apenas os inversores com <strong className="font-mono text-amber-950 font-bold">{filterStringCount} {currentUnit === 'kWp' ? 'kWp (Potência)' : 'strings'}</strong> ({currentUfv.strings.filter(s => s === filterStringCount).length} de {currentUfv.strings.length} inversores)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFilterStringCount('ALL')}
                    className="text-[11px] font-bold text-amber-900 hover:text-amber-950 underline ml-2"
                  >
                    Mostrar Todos os Inversores
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
          {currentUfv.strings.map((str, idx) => {
            const isMatchingFilter = filterStringCount === 'ALL' || str === filterStringCount;
            if (!isMatchingFilter) return null; // Filter out non-matching inverters when filter is active

            const isActive = safeInverterIndex === idx;
            const colorStyle = getStringColorStyle(str, currentUfv.strings, isActive);
            const maxVal = currentUfv.strings.length > 0 ? Math.max(...currentUfv.strings) : 0;
            const isMax = str === maxVal;

            return (
              <div
                key={idx}
                onClick={() => setSelectedInverterIndex(idx)}
                className={`p-3 rounded-xl border cursor-pointer transition-all select-none relative overflow-hidden ${colorStyle.cardBg}`}
              >
                <div className="flex items-center justify-between">
                  <div className={`text-[10px] uppercase font-mono font-bold ${
                    isActive ? 'text-slate-950/80' : 'opacity-80'
                  }`}>
                    {getInversorShortLabel(idx, currentUfv)}
                  </div>
                  {isMax && !isActive && (
                    <span className="text-[9px] uppercase font-bold tracking-tighter bg-slate-950 text-amber-400 px-1 rounded font-mono">
                      Maior
                    </span>
                  )}
                </div>

                <div className="text-2xl font-black font-mono mt-1 tracking-tight">
                  {str}
                </div>

                <div className={`text-[10px] font-medium ${isActive ? 'text-slate-950/90' : 'opacity-70'}`}>
                  {currentUnit === 'kWp' ? 'kWp (Potência)' : 'strings'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
