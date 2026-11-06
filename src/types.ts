export interface UfvRecord {
  id: string;
  usina: string;
  supervisor: string;
  inversores: InversorRecord[];
  cidadeUF?: string;
  potenciaKwp?: number;
}

export interface InversorRecord {
  id: string;
  codigoInversor: string; // e.g., "INV-01", "Inversor 01 (100kW)"
  modelo?: string;
  quantidadeStrings: number;
  mppts?: number;
  stringsPorMppt?: number;
  status?: 'Operacional' | 'Manutenção' | 'Inspeção';
}

export interface FormulaConfig {
  colunaUsina: string;
  colunaInversor: string;
  colunaStrings: string;
  celulaFiltroUsina: string;
  celulaFiltroInversor: string;
  linhaInicial: number;
  linhaFinal: number;
}
