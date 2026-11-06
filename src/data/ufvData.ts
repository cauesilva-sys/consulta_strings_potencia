export interface UfvMatrixItem {
  id: string;
  ufvName: string;
  strings: number[]; // Index 0 is Inversor 01, Index 1 is Inversor 02, etc. (or starting from inverterStartNumber)
  inverterStartNumber?: number; // Defaults to 1 (e.g. 7 for Tapera 02 which uses Inv 07 to Inv 14)
  unit?: string;     // 'strings' (default) or 'kWp'
  supervisor?: string;
  potenciaUfv?: string;        // e.g., "1.000 kW", "2.500 kW", "960 kW"
  potenciaInversor?: number;   // e.g., 125, 160, 200 (in kW)
  inversorModelo?: string;     // e.g., "Solis", "Huawei", "Canadian", "Sungrow", "ABB"
  modeloTracker?: string;      // e.g., "STi", "STi Norland", "Convert"
  trackerValue?: string;       // "Fixa", "93", "30", "27", "70", "63", etc.
  demandaContratada?: string;  // e.g., "3.500 kW", "1.000 kW"
  obs?: string;
}

export const UFV_MATRIX_DATA: UfvMatrixItem[] = [
  { id: '1', ufvName: 'UFV Presidente Epitácio (PEP)', strings: [12, 12, 11, 12, 11, 11, 12, 12], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Solis', trackerValue: '93' },
  { id: '2', ufvName: 'UFV Tapera 01 (TPR)', strings: [204, 223.5, 243, 204, 204, 204], unit: 'kWp', supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 167, inversorModelo: 'Huawei', trackerValue: 'Fixa', obs: 'INV 01, 04, 05 e 06 (340W): 204 kWp | INV 02 (misto 340W/405W): 223,5 kWp | INV 03 (405W): 243 kWp' },
  { id: '3', ufvName: 'UFV Tapera 02 (TPR)', strings: [166, 166, 166, 151, 151, 151, 151, 151], inverterStartNumber: 7, unit: 'kWp', supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '30', obs: 'Inversores 07, 08 e 09: 166 kWp cada | Inversores 10, 11, 12, 13 e 14: 151 kWp cada' },
  { id: '4', ufvName: 'UFV Tapera 03 (TPR)', strings: [151, 151, 166, 151, 166, 151, 166, 151], inverterStartNumber: 15, unit: 'kWp', supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '27', obs: 'Inversores 17, 19 e 21: 166 kWp cada | Inversores 15, 16, 18, 20 e 22: 151 kWp cada' },
  { id: '5', ufvName: 'UFV Mãe do Rio 01 (MDR)', strings: [14, 13, 13, 13, 13, 13, 13, 13], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Solis', trackerValue: '70' },
  { id: '6', ufvName: 'UFV Mãe do Rio 02 (MDR)', strings: [14, 13, 13, 13, 13, 13, 13, 13], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Solis', trackerValue: '70' },
  { id: '7', ufvName: 'UFV Mãe do Rio 03 (MDR)', strings: [14, 14, 14, 14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '70' },
  { id: '8', ufvName: 'UFV Mãe do Rio 04 (MDR)', strings: [14, 14, 14, 14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '70' },
  { id: '9', ufvName: 'UFV Andradina I (ADU)', strings: [18, 18, 18, 18, 18, 18], supervisor: 'Rafael Leal', potenciaUfv: '960 kW', potenciaInversor: 160, inversorModelo: 'Huawei', modeloTracker: 'STi', trackerValue: '27' },
  { id: '10', ufvName: 'UFV Andradina II (ADD)', strings: [18, 18, 18, 18, 18, 18], supervisor: 'Rafael Leal', potenciaUfv: '960 kW', potenciaInversor: 160, inversorModelo: 'Huawei', modeloTracker: 'STi', trackerValue: '27' },
  { id: '11', ufvName: 'UFV Ibotirama (IBO)', strings: [13, 13, 13, 13, 13, 13, 14], supervisor: 'Edy', potenciaUfv: '875 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '67' },
  { id: '12', ufvName: 'UFV São Mateus I (MTU)', strings: [13, 13, 13, 12, 13, 13, 13], supervisor: 'Edy', potenciaUfv: '750 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '62' },
  { id: '13', ufvName: 'UFV São Mateus II (MTD)', strings: [12, 13, 13, 13, 13], supervisor: 'Edy', potenciaUfv: '625 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '46' },
  { id: '14', ufvName: 'UFV Salto de Pirapora I (RaiaDrogasil) (SAP)', strings: [14, 13, 13, 13, 13, 14, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '108' },
  { id: '15', ufvName: 'UFV Salto de Pirapora II (RaiaDrogasil) (SAP)', strings: [13, 13, 13, 13, 14, 14, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '108' },
  { id: '16', ufvName: 'UFV Salto de Pirapora III (Raízen) (SAP)', strings: [13, 13, 13, 13, 14, 14, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '108' },
  { id: '17', ufvName: 'UFV Salto de Pirapora IV (Raízen) (SAP)', strings: [13, 13, 13, 13, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '750 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '80' },
  { id: '18', ufvName: 'UFV Frutal (FRU)', strings: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10], supervisor: 'Rafael Leal', potenciaUfv: '2.500 kW', potenciaInversor: 100, inversorModelo: 'Huawei', modeloTracker: 'STi Norland', trackerValue: '63' },
  { id: '19', ufvName: 'UFV Guarda Mor I (GMU)', strings: [10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], supervisor: 'Edy', potenciaUfv: '2.500 kW', potenciaInversor: 100, inversorModelo: 'Huawei', trackerValue: '63' },
  { id: '20', ufvName: 'UFV Guarda Mor II (GMD)', strings: [10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], supervisor: 'Edy', potenciaUfv: '2.500 kW', potenciaInversor: 100, inversorModelo: 'Huawei', trackerValue: '63' },
  { id: '21', ufvName: 'UFV Guarda Mor III (GMT)', strings: [10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], supervisor: 'Edy', potenciaUfv: '2.500 kW', potenciaInversor: 100, inversorModelo: 'Huawei', trackerValue: '63' },
  { id: '22', ufvName: 'UFV Ibiá I (IBU)', strings: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11], supervisor: 'Rafael Leal', potenciaUfv: '2.500 kW', potenciaInversor: 100, inversorModelo: 'Huawei', trackerValue: '63' },
  { id: '23', ufvName: 'UFV Ibiá II (IBD)', strings: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10], supervisor: 'Rafael Leal', potenciaUfv: '2.500 kW', potenciaInversor: 100, inversorModelo: 'Huawei', trackerValue: '63' },
  { id: '24', ufvName: 'UFV Ibiá III (IBT)', strings: [12, 12, 12, 11, 11, 11, 11, 12, 12, 12, 12, 12, 11, 11, 11, 11, 11, 11, 11, 11], supervisor: 'Rafael Leal', potenciaUfv: '2.500 kW', potenciaInversor: 125, inversorModelo: 'Sungrow', trackerValue: '57' },
  { id: '25', ufvName: 'UFV Iraí de Minas I (IMU)', strings: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10], supervisor: 'Rafael Leal', potenciaUfv: '2.500 kW', potenciaInversor: 100, inversorModelo: 'Huawei', trackerValue: '63' },
  { id: '26', ufvName: 'UFV Iraí de Minas II (IMD)', strings: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], supervisor: 'Rafael Leal', potenciaUfv: '2.500 kW', potenciaInversor: 100, inversorModelo: 'Huawei', trackerValue: '63' },
  { id: '27', ufvName: 'UFV Niquelândia I - 01 (NQL)', strings: [15, 15, 15, 15, 15, 15, 15, 15], supervisor: 'Edy', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Sungrow', trackerValue: 'Fixa' },
  { id: '28', ufvName: 'UFV Niquelândia I - 02 (NQL)', strings: [15, 15, 15, 15, 15, 15, 15, 15], supervisor: 'Edy', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Sungrow', trackerValue: 'Fixa' },
  { id: '29', ufvName: 'UFV Niquelândia I - 03 (NQL)', strings: [15, 15, 15, 15, 15], supervisor: 'Edy', potenciaUfv: '625 kW', potenciaInversor: 125, inversorModelo: 'Sungrow', trackerValue: 'Fixa' },
  { id: '30', ufvName: 'UFV Niquelândia II (NQD)', strings: [11, 11, 11, 11], supervisor: 'Edy', potenciaUfv: '500 kW', potenciaInversor: 125, inversorModelo: 'Solis', trackerValue: 'Fixa' },
  { id: '31', ufvName: 'UFV Nova Ponte (NOP)', strings: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11], supervisor: 'Rafael Leal', potenciaUfv: '2.500 kW', potenciaInversor: 100, inversorModelo: 'Huawei', modeloTracker: 'STi Norland', trackerValue: '63' },
  { id: '32', ufvName: 'UFV Pirangi I - 01 (PGU)', strings: [18, 18, 18, 18, 18, 18], supervisor: 'Rafael Leal', potenciaUfv: '960 kW', potenciaInversor: 160, inversorModelo: 'Huawei', trackerValue: '108' },
  { id: '33', ufvName: 'UFV Pirangi I - 02 (PGU)', strings: [18, 18], supervisor: 'Rafael Leal', potenciaUfv: '350 kW', potenciaInversor: 175, inversorModelo: 'Huawei', trackerValue: '36' },
  { id: '34', ufvName: 'UFV Pirangi III - 03 (PGT)', strings: [18, 18, 18, 18, 18, 18], supervisor: 'Rafael Leal', potenciaUfv: '960 kW', potenciaInversor: 160, inversorModelo: 'Huawei', trackerValue: '27' },
  { id: '35', ufvName: 'UFV Pirangi III - 04 (PGT)', strings: [18, 18, 18, 18, 18, 18], supervisor: 'Rafael Leal', potenciaUfv: '960 kW', potenciaInversor: 160, inversorModelo: 'Huawei', trackerValue: '27' },
  { id: '36', ufvName: 'UFV Leopoldo Bulhões I (Claro) (LEB)', strings: [14, 13, 13, 13, 13, 13, 13, 13], supervisor: 'Edy', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Solis', trackerValue: '70' },
  { id: '37', ufvName: 'UFV Leopoldo Bulhões II (Raízen) (LEB)', strings: [13, 13, 13, 13], supervisor: 'Edy', potenciaUfv: '500 kW', potenciaInversor: 125, inversorModelo: 'Solis', trackerValue: '34' },
  { id: '38', ufvName: 'UFV Buritizeiro 01 (BZU)', strings: [18, 18, 18, 17, 17, 18, 18, 18, 17, 17], supervisor: 'Edy', potenciaUfv: '960 kW', potenciaInversor: 96, inversorModelo: 'Huawei', trackerValue: '72', obs: 'Apenas o inversor 05 possui módulos bifaciais nas strings 01 a 13. Por esse motivo, apresenta potência superior aos demais inversores.' },
  { id: '39', ufvName: 'UFV Buritizeiro 02 (BZU)', strings: [18, 18, 18, 17, 17, 18, 18, 18, 17, 17], supervisor: 'Edy', potenciaUfv: '960 kW', potenciaInversor: 96, inversorModelo: 'Huawei', trackerValue: '72' },
  { id: '40', ufvName: 'UFV Buritizeiro 03 (BZU)', strings: [18, 18, 18, 17, 17, 18, 18, 18, 17, 17], supervisor: 'Edy', potenciaUfv: '960 kW', potenciaInversor: 96, inversorModelo: 'Huawei', trackerValue: '72' },
  { id: '41', ufvName: 'UFV Buritizeiro 04 (BZU)', strings: [18, 18, 18, 17, 17, 18, 18, 18, 17, 17], supervisor: 'Edy', potenciaUfv: '960 kW', potenciaInversor: 96, inversorModelo: 'Huawei', trackerValue: '72' },
  { id: '42', ufvName: 'UFV Buritizeiro 05 (BZU)', strings: [18, 18, 18, 17, 17], supervisor: 'Edy', potenciaUfv: '480 kW', potenciaInversor: 96, inversorModelo: 'Huawei', trackerValue: '72' },
  { id: '43', ufvName: 'UFV Campestre 01 (CPE)', strings: [14, 14, 14, 14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '70' },
  { id: '44', ufvName: 'UFV Campestre 02 (CPE)', strings: [14, 14, 14, 14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '70' },
  { id: '45', ufvName: 'UFV Campestre 03 (CPE)', strings: [17, 17, 17, 17], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 250, inversorModelo: 'Huawei', trackerValue: '33' },
  { id: '46', ufvName: 'UFV Campestre 04 (CPE)', strings: [17, 17, 17, 17], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 250, inversorModelo: 'Huawei', trackerValue: '33' },
  { id: '47', ufvName: 'UFV Oliveira dos Brejinhos (OLB)', strings: [13, 13, 13, 14, 13, 14, 14, 14, 14, 14, 14, 13, 14, 14, 14, 13, 14, 14, 14, 14, 14, 13, 13, 13, 14, 13, 14, 14, 14, 14, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14], supervisor: 'Edy', potenciaUfv: '5.000 kW', potenciaInversor: 125, inversorModelo: 'Sungrow', trackerValue: '183' },
  { id: '48', ufvName: 'UFV Canas (CAN)', strings: [12, 12, 14, 13, 12, 8, 8, 8, 12, 8, 12, 14, 13, 8, 8, 12, 14, 14, 14, 14, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '2.700 kW', potenciaInversor: 123, inversorModelo: 'Sungrow', trackerValue: '94' },
  { id: '49', ufvName: 'UFV Cachoeira Paulista (CAP)', strings: [26, 26, 26, 26], supervisor: 'Rafael Leal', potenciaUfv: '875 kW', potenciaInversor: 219, inversorModelo: 'Huawei', trackerValue: '104' },
  { id: '50', ufvName: 'UFV Luís Eduardo Magalhães I (Magalu) (LEM)', strings: [20, 20, 19, 20, 19, 19], supervisor: 'Edy', potenciaUfv: '1.110 kW', potenciaInversor: 165, inversorModelo: 'Huawei', trackerValue: 'Fixa' },
  { id: '51', ufvName: 'UFV Luís Eduardo Magalhães II (Magalu) (LEM)', strings: [20, 20, 19, 20, 19, 19], supervisor: 'Edy', potenciaUfv: '1.110 kW', potenciaInversor: 165, inversorModelo: 'Huawei', trackerValue: 'Fixa' },
  { id: '52', ufvName: 'UFV Luís Eduardo Magalhães III (Raízen) (LEM)', strings: [20, 20, 20], supervisor: 'Edy', potenciaUfv: '555 kW', potenciaInversor: 165, inversorModelo: 'Huawei', trackerValue: 'Fixa' },
  { id: '53', ufvName: 'UFV Luís Eduardo Magalhães IV (LEM)', strings: [14, 14, 14, 14, 14], supervisor: 'Edy', potenciaUfv: '1.075 kW', potenciaInversor: 215, inversorModelo: 'Huawei', modeloTracker: 'Convert', trackerValue: '68' },
  { id: '54', ufvName: 'UFV Luís Eduardo Magalhães V (LEM)', strings: [14, 14, 14, 14, 14], supervisor: 'Edy', potenciaUfv: '1.075 kW', potenciaInversor: 215, inversorModelo: 'Huawei', modeloTracker: 'Convert', trackerValue: '68' },
  { id: '55', ufvName: 'UFV Luís Eduardo Magalhães VI (LEM)', strings: [14, 14], supervisor: 'Edy', potenciaUfv: '1.075 kW', potenciaInversor: 215, inversorModelo: 'Huawei', modeloTracker: 'Convert', trackerValue: '24' },
  { id: '56', ufvName: 'UFV Sítio do Mato (STM)', strings: [12, 12, 12, 12, 12, 12, 12], supervisor: 'Edy', potenciaUfv: '875 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '28' },
  { id: '57', ufvName: 'UFV Bom Jesus da Lapa (BJL)', strings: [14, 14, 14, 14, 14, 14, 13, 14], supervisor: 'Edy', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Sungrow', trackerValue: '37' },
  { id: '58', ufvName: 'UFV Araçuaí (ARA)', strings: [14, 14, 14, 14, 14, 14, 14, 14, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14], supervisor: 'Edy', potenciaUfv: '2.500 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '182' },
  { id: '59', ufvName: 'UFV Guarantã 01 (GUA)', strings: [18, 18, 18, 18, 18, 18], supervisor: 'Rafael Leal', potenciaUfv: '960 kW', potenciaInversor: 160, inversorModelo: 'Huawei', trackerValue: '27' },
  { id: '60', ufvName: 'UFV Guarantã 02 (GUA)', strings: [18, 18, 18, 18, 18, 18], supervisor: 'Rafael Leal', potenciaUfv: '960 kW', potenciaInversor: 160, inversorModelo: 'Huawei', trackerValue: '27' },
  { id: '61', ufvName: 'UFV Guarantã 03 (GUA)', strings: [18, 18, 18, 18, 18, 18], supervisor: 'Rafael Leal', potenciaUfv: '960 kW', potenciaInversor: 160, inversorModelo: 'Huawei', trackerValue: '27' },
  { id: '62', ufvName: 'UFV Guarantã 04 (GUA)', strings: [18, 18, 18, 18, 18, 18], supervisor: 'Rafael Leal', potenciaUfv: '960 kW', potenciaInversor: 160, inversorModelo: 'Huawei', trackerValue: '27' },
  { id: '63', ufvName: 'UFV Guarantã 05 (GUA)', strings: [18, 18], supervisor: 'Rafael Leal', potenciaUfv: '350 kW', potenciaInversor: 175, inversorModelo: 'Huawei', trackerValue: '9' },
  { id: '64', ufvName: 'UFV Presidente Alves (PRA)', strings: [146, 146, 146, 146, 146, 146, 156, 156, 135, 135, 135, 156, 135, 135, 135, 135, 146, 146, 146, 135, 135, 146, 146, 146, 135, 146, 146, 146], unit: 'kWp', supervisor: 'Rafael Leal', potenciaUfv: '3.500 kW', potenciaInversor: 125, inversorModelo: 'Sungrow', trackerValue: '117' },
  { id: '65', ufvName: 'UFV Pindamonhangaba (PIN)', strings: [26, 26, 26, 26], supervisor: 'Rafael Leal', potenciaUfv: '875 kW', potenciaInversor: 219, inversorModelo: 'Huawei', trackerValue: '104' },
  { id: '66', ufvName: 'UFV São Bento do Una 01 (SBU)', strings: [14, 14, 14, 14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '70' },
  { id: '67', ufvName: 'UFV São Bento do Una 02 (SBU)', strings: [14, 14, 14, 14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '70' },
  { id: '68', ufvName: 'UFV São Bento do Una 03 (SBU)', strings: [14, 14, 14, 14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '70' },
  { id: '69', ufvName: 'UFV São Bento do Una 04 (SBU)', strings: [14, 14, 14, 14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '70' },
  { id: '70', ufvName: 'UFV Várzea da Palma I (Milkway) (VPU)', strings: [8, 18, 18, 18, 18, 18, 18], supervisor: 'Edy', potenciaUfv: '770 kW', potenciaInversor: 110, inversorModelo: 'Sungrow', trackerValue: '10' },
  { id: '71', ufvName: 'UFV Várzea da Palma II - 01 (VPD)', strings: [11, 11, 11, 11, 11, 11, 11, 11, 10, 11, 11, 11, 11, 11, 11, 11], supervisor: 'Edy', potenciaUfv: '960 kW', potenciaInversor: 60, inversorModelo: 'ABB', trackerValue: '71' },
  { id: '72', ufvName: 'UFV Várzea da Palma II - 02 (VPD)', strings: [18, 18, 18, 17, 17, 18, 18, 18, 17, 17], supervisor: 'Edy', potenciaUfv: '960 kW', potenciaInversor: 60, inversorModelo: 'ABB', trackerValue: '71' },
  { id: '73', ufvName: 'UFV Várzea da Palma II - 03 (VPD)', strings: [18, 18, 18, 17, 17, 18, 18, 18, 17, 17], supervisor: 'Edy', potenciaUfv: '960 kW', potenciaInversor: 60, inversorModelo: 'ABB', trackerValue: '71' },
  { id: '74', ufvName: 'UFV Várzea da Palma II - 04 (VPD)', strings: [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11], supervisor: 'Edy', potenciaUfv: '960 kW', potenciaInversor: 60, inversorModelo: 'ABB', trackerValue: '71' },
  { id: '75', ufvName: 'UFV Várzea da Palma II - 05 (VPD)', strings: [11, 11, 11, 11, 11, 11, 11], supervisor: 'Edy', potenciaUfv: '420 kW', potenciaInversor: 60, inversorModelo: 'ABB', trackerValue: '71' },
  { id: '76', ufvName: 'UFV Uruguaiana IV (URQ)', strings: [16, 16, 16, 15, 15, 15, 15, 15, 15, 15], supervisor: 'Jardel Alves', potenciaUfv: '2.500 kW', potenciaInversor: 250, inversorModelo: 'Sungrow', trackerValue: '51' },
  { id: '77', ufvName: 'UFV Uruguaiana II (URD)', strings: [15, 15, 15, 15, 15, 15, 15, 14, 14, 14], supervisor: 'Jardel Alves', potenciaUfv: '2.500 kW', potenciaInversor: 250, inversorModelo: 'Sungrow', trackerValue: '49' },
  { id: '78', ufvName: 'UFV Uruguaiana I (URU)', strings: [16, 16, 16, 16, 16, 16, 16, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16], supervisor: 'Jardel Alves', potenciaUfv: '5.000 kW', potenciaInversor: 250, inversorModelo: 'Sungrow', trackerValue: '107' },
  { id: '79', ufvName: 'UFV Barra do Quaraí (BQA)', strings: [15, 15, 15, 15, 15, 16, 16, 16, 15, 15], supervisor: 'Jardel Alves', potenciaUfv: '2.500 kW', potenciaInversor: 250, inversorModelo: 'Sungrow', trackerValue: '51' },
  { id: '80', ufvName: 'UFV Alegrete I (AGU)', strings: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12], supervisor: 'Jardel Alves', potenciaUfv: '1.080 kW', potenciaInversor: 60, inversorModelo: 'Huawei', trackerValue: 'Fixa' },
  { id: '81', ufvName: 'UFV Alegrete II (AGD)', strings: [11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 11, 11, 12, 12, 11, 11, 11, 11, 12, 12], supervisor: 'Jardel Alves', potenciaUfv: '2.500 kW', potenciaInversor: 125, inversorModelo: 'Sungrow', trackerValue: '57' },
  { id: '82', ufvName: 'UFV Quaraí (QUA)', strings: [15, 15, 15, 15, 15, 15, 15, 16, 16, 16], supervisor: 'Jardel Alves', potenciaUfv: '2.500 kW', potenciaInversor: 250, inversorModelo: 'Sungrow', trackerValue: '51' },
  { id: '83', ufvName: 'UFV São Borja I (BOU)', strings: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], supervisor: 'Jardel Alves', potenciaUfv: '2.500 kW', potenciaInversor: 250, inversorModelo: 'Sungrow', trackerValue: '50' },
  { id: '84', ufvName: 'UFV São Borja II (BOD)', strings: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15], supervisor: 'Jardel Alves', potenciaUfv: '2.500 kW', potenciaInversor: 250, inversorModelo: 'Sungrow', trackerValue: '50' },
  { id: '85', ufvName: 'UFV São José do Cedro 01 (CDR)', strings: [22, 21, 22, 21, 22], supervisor: 'Jardel Alves', potenciaUfv: '875 kW', potenciaInversor: 175, inversorModelo: 'Huawei', trackerValue: 'Fixa' },
  { id: '86', ufvName: 'UFV São José do Cedro 02 (CDR)', strings: [21, 21, 21, 23, 22], supervisor: 'Jardel Alves', potenciaUfv: '875 kW', potenciaInversor: 175, inversorModelo: 'Huawei', trackerValue: 'Fixa' },
  { id: '87', ufvName: 'UFV São Lourenço do Sul (LOU)', strings: [12, 12, 12, 12, 12, 13, 13], supervisor: 'Jardel Alves', potenciaUfv: '700 kW', potenciaInversor: 100, inversorModelo: 'Huawei', trackerValue: 'Fixa' },
  { id: '88', ufvName: 'UFV Taubaté (TAU)', strings: [23, 23, 23, 23, 22], supervisor: 'Rafael Leal', potenciaUfv: '875 kW', potenciaInversor: 175, inversorModelo: 'Huawei', trackerValue: 'Fixa' },
  { id: '89', ufvName: 'UFV Apodi (APO)', strings: [21, 21, 20, 20], supervisor: 'Henrique Oliveira', potenciaUfv: '700 kW', potenciaInversor: 175, inversorModelo: 'Huawei', trackerValue: 'Fixa' },
  { id: '90', ufvName: 'UFV São João do Rio do Peixe I (RPU)', strings: [12, 13, 13, 13, 13, 13, 13], supervisor: 'Henrique Oliveira', potenciaUfv: '700 kW', potenciaInversor: 100, inversorModelo: 'Huawei', trackerValue: 'Fixa' },
  { id: '91', ufvName: 'UFV São João do Rio do Peixe II (RPD)', strings: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 180, inversorModelo: 'Huawei', trackerValue: 'Fixa' },
  { id: '92', ufvName: 'UFV Estância 01 (ETN)', strings: [11, 10, 11, 11, 11, 11, 11, 11], supervisor: 'Rafael Leal', potenciaUfv: '4.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '115' },
  { id: '93', ufvName: 'UFV Estância 02 (ETN)', strings: [11, 11, 11, 11, 11, 10, 11, 11], supervisor: 'Rafael Leal', potenciaUfv: '4.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '115' },
  { id: '94', ufvName: 'UFV Estância 03 (ETN)', strings: [11, 11, 11, 11, 11, 11, 11, 11], supervisor: 'Rafael Leal', potenciaUfv: '4.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '115' },
  { id: '95', ufvName: 'UFV Estância 04 (ETN)', strings: [11, 11, 11, 10, 11, 11, 11, 11], supervisor: 'Rafael Leal', potenciaUfv: '4.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '115' },
  { id: '96', ufvName: 'UFV Santa Albertina 01 (ABN)', strings: [14, 14, 14, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '70' },
  { id: '97', ufvName: 'UFV Santa Albertina 02 (ABN)', strings: [14, 14, 14, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '70' },
  { id: '98', ufvName: 'UFV Santa Albertina 03 (ABN)', strings: [14, 14, 14, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '70' },
  { id: '99', ufvName: 'UFV Barretos (Colômbia) (BRS)', strings: [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '5.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '350' },
  { id: '100', ufvName: 'UFV Ituverava 01 (ITV)', strings: [14, 14, 14, 14, 14, 14, 14, 14, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '71' },
  { id: '101', ufvName: 'UFV Ituverava 02 (ITV)', strings: [14, 14, 14, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '71' },
  { id: '102', ufvName: 'UFV Neves Paulista (NEP)', strings: [14, 14, 14, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '70' },
  { id: '103', ufvName: 'UFV Macaubal I (MCU)', strings: [18, 18, 18, 18], supervisor: 'Rafael Leal', potenciaUfv: '640 kW', potenciaInversor: 160, inversorModelo: 'Huawei', trackerValue: '72' },
  { id: '104', ufvName: 'UFV Macaubal II (MCU)', strings: [12, 12], supervisor: 'Rafael Leal', potenciaUfv: '200 kW', potenciaInversor: 100, inversorModelo: 'Huawei', trackerValue: '24' },
  { id: '105', ufvName: 'UFV Caracará 01 (CRA)', strings: [14, 14, 14, 14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '1.075 kW', potenciaInversor: 215, inversorModelo: 'Huawei', trackerValue: '24' },
  { id: '106', ufvName: 'UFV Caracará 02 (CRA)', strings: [14, 14, 14, 14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '1.075 kW', potenciaInversor: 215, inversorModelo: 'Huawei', trackerValue: '38' },
  { id: '107', ufvName: 'UFV Caracará 03 (CRA)', strings: [14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '550 kW', potenciaInversor: 275, inversorModelo: 'Huawei', trackerValue: '28' },
  { id: '108', ufvName: 'UFV Horizonte I (HRT)', strings: [13, 13, 13, 12, 12, 13, 13, 13], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '35' },
  { id: '109', ufvName: 'UFV Horizonte II (HRT)', strings: [12, 13, 12, 13, 13, 13, 13, 13], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '35' },
  { id: '110', ufvName: 'UFV Rio das Pedras I (Raízen) (RDP)', strings: [24, 24, 24, 24], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 250, inversorModelo: 'Huawei', trackerValue: '96' },
  { id: '111', ufvName: 'UFV Rio das Pedras II (Flora) (RDP)', strings: [24, 24, 24, 24], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 250, inversorModelo: 'Huawei', trackerValue: '96' },
  { id: '112', ufvName: 'UFV Rio das Pedras III (Flora) (RDP)', strings: [24, 24, 24, 24], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 250, inversorModelo: 'Huawei', trackerValue: '96' },
  { id: '113', ufvName: 'UFV Rio das Pedras IV (Raízen) (RDP)', strings: [24, 24, 24, 24], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 250, inversorModelo: 'Huawei', trackerValue: '96' },
  { id: '114', ufvName: 'UFV Irecê 01 (IRE)', strings: [13, 13, 13, 13, 13, 13, 13, 13], supervisor: 'Edy', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '78' },
  { id: '115', ufvName: 'UFV Irecê 02 (IRE)', strings: [13, 13, 13, 13, 13, 13, 13, 13], supervisor: 'Edy', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '78' },
  { id: '116', ufvName: 'UFV Irecê 03 (IRE)', strings: [13, 13, 13, 13, 13, 13, 13, 13], supervisor: 'Edy', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '150' },
  { id: '117', ufvName: 'UFV Irecê 04 (IRE)', strings: [13, 13, 13, 13, 13, 13, 13, 13], supervisor: 'Edy', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '88' },
  { id: '118', ufvName: 'UFV Irecê 05 (IRE)', strings: [13, 13, 13, 13, 13, 13, 13, 13], supervisor: 'Edy', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '114' },
  { id: '119', ufvName: 'UFV Panorama 01 (PAN)', strings: [14, 14, 14, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '30' },
  { id: '120', ufvName: 'UFV Panorama 02 (PAN)', strings: [14, 14, 14, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '30' },
  { id: '121', ufvName: 'UFV Panorama 03 (PAN)', strings: [6, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '500 kW', potenciaInversor: 125, inversorModelo: 'Canadian', trackerValue: '15' },
  { id: '122', ufvName: 'UFV Barra do Arará 01 (BAR)', strings: [14, 14, 14, 14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '1.075 kW', potenciaInversor: 215, inversorModelo: 'Huawei', trackerValue: '74' },
  { id: '123', ufvName: 'UFV Barra do Arará 02 (BAR)', strings: [14, 14, 14, 14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '1.075 kW', potenciaInversor: 215, inversorModelo: 'Huawei', trackerValue: '74' },
  { id: '124', ufvName: 'UFV Aliança 01 (ALI)', strings: [14, 14, 14, 14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '70' },
  { id: '125', ufvName: 'UFV Aliança 02 (ALI)', strings: [14, 14, 14, 14, 14], supervisor: 'Henrique Oliveira', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: '70' },
  { id: '126', ufvName: 'UFV Pedro Cunha Fiúza (UPF)', strings: [14, 14, 14, 14, 14], supervisor: 'Rafael Leal', potenciaUfv: '1.000 kW', potenciaInversor: 200, inversorModelo: 'Huawei', trackerValue: 'Fixa' }
];

export const MAX_INVERTERS = 72;

export const DEMANDA_CONTRATADA_MAP: Record<string, string> = {
  '1': '1.000 kW',   // Presidente Epitácio
  '2': '1.000 kW',   // Tapera 01
  '3': '1.000 kW',   // Tapera 02
  '4': '1.000 kW',   // Tapera 03
  '5': '1.000 kW',   // Mãe do Rio 01
  '6': '1.000 kW',   // Mãe do Rio 02
  '7': '1.000 kW',   // Mãe do Rio 03
  '8': '1.000 kW',   // Mãe do Rio 04
  '9': '960 kW',     // Andradina I
  '10': '960 kW',    // Andradina II
  '11': '875 kW',    // Ibotirama
  '12': '750 kW',    // São Mateus I
  '13': '625 kW',    // São Mateus II
  '14': '1.000 kW',  // Salto de Pirapora I
  '15': '1.000 kW',  // Salto de Pirapora II
  '16': '1.000 kW',  // Salto de Pirapora III
  '17': '750 kW',    // Salto de Pirapora IV
  '18': '2.500 kW',  // Frutal
  '19': '2.500 kW',  // Guarda Mor I
  '20': '2.500 kW',  // Guarda Mor II
  '21': '2.500 kW',  // Guarda Mor III
  '22': '2.500 kW',  // Ibiá I
  '23': '2.500 kW',  // Ibiá II
  '24': '2.500 kW',  // Ibiá III
  '25': '2.500 kW',  // Iraí de Minas I
  '26': '2.500 kW',  // Iraí de Minas II
  '27': '1.000 kW',  // Niquelândia I - 01
  '28': '1.000 kW',  // Niquelândia I - 02
  '29': '625 kW',    // Niquelândia I - 03
  '30': '500 kW',    // Niquelândia II
  '31': '2.500 kW',  // Nova Ponte
  '32': '960 kW',    // Pirangi I - 01
  '33': '350 kW',    // Pirangi I - 02
  '34': '1.000 kW',  // Pirangi III - 03
  '35': '1.000 kW',  // Pirangi III - 04
  '36': '1.000 kW',  // Leopoldo Bulhões I
  '37': '500 kW',    // Leopoldo Bulhões II
  '38': '960 kW',    // Buritizeiro 01
  '39': '960 kW',    // Buritizeiro 02
  '40': '960 kW',    // Buritizeiro 03
  '41': '960 kW',    // Buritizeiro 04
  '42': '480 kW',    // Buritizeiro 05
  '43': '1.000 kW',  // Campestre 01
  '44': '1.000 kW',  // Campestre 02
  '45': '1.000 kW',  // Campestre 03
  '46': '1.000 kW',  // Campestre 04
  '47': '5.000 kW',  // Oliveira dos Brejinhos
  '48': '2.700 kW',  // Canas
  '49': '875 kW',    // Cachoeira Paulista
  '50': '1.000 kW',  // LEM I
  '51': '1.000 kW',  // LEM II
  '52': '500 kW',    // LEM III
  '53': '1.000 kW',  // LEM IV
  '54': '1.000 kW',  // LEM V
  '55': '500 kW',    // LEM VI
  '56': '875 kW',    // Sítio do Mato
  '57': '1.000 kW',  // Bom Jesus da Lapa
  '58': '2.500 kW',  // Araçuaí
  '59': '960 kW',    // Guarantã 01
  '60': '960 kW',    // Guarantã 02
  '61': '960 kW',    // Guarantã 03
  '62': '960 kW',    // Guarantã 04
  '63': '350 kW',    // Guarantã 05
  '64': '3.500 kW',  // Presidente Alves
  '65': '875 kW',    // Pindamonhangaba
  '66': '1.000 kW',  // São Bento do Una 01
  '67': '1.000 kW',  // São Bento do Una 02
  '68': '1.000 kW',  // São Bento do Una 03
  '69': '1.000 kW',  // São Bento do Una 04
  '70': '700 kW',    // Várzea da Palma I
  '71': '960 kW',    // Várzea da Palma II - 01
  '72': '960 kW',    // Várzea da Palma II - 02
  '73': '960 kW',    // Várzea da Palma II - 03
  '74': '960 kW',    // Várzea da Palma II - 04
  '75': '420 kW',    // Várzea da Palma II - 05
  '76': '2.500 kW',  // Uruguaiana IV
  '77': '2.500 kW',  // Uruguaiana II
  '78': '5.000 kW',  // Uruguaiana I
  '79': '2.500 kW',  // Barra do Quaraí
  '80': '1.080 kW',  // Alegrete I
  '81': '2.500 kW',  // Alegrete II
  '82': '2.500 kW',  // Quaraí
  '83': '2.500 kW',  // São Borja I
  '84': '2.500 kW',  // São Borja II
  '85': '875 kW',    // São José do Cedro 01
  '86': '875 kW',    // São José do Cedro 02
  '87': '700 kW',    // São Lourenço do Sul
  '88': '875 kW',    // Taubaté
  '89': '700 kW',    // Apodi
  '90': '700 kW',    // São João do Rio do Peixe I
  '91': '2.400 kW',  // São João do Rio do Peixe II
  '92': '1.000 kW',  // Estância 01
  '93': '1.000 kW',  // Estância 02
  '94': '1.000 kW',  // Estância 03
  '95': '1.000 kW',  // Estância 04
  '96': '1.000 kW',  // Santa Albertina 01
  '97': '1.000 kW',  // Santa Albertina 02
  '98': '1.000 kW',  // Santa Albertina 03
  '99': '5.000 kW',  // Barretos
  '100': '2.000 kW', // Ituverava 01
  '101': '1.000 kW', // Ituverava 02
  '102': '1.000 kW', // Neves Paulista
  '103': '640 kW',   // Macaubal I
  '104': '200 kW',   // Macaubal II
  '105': '1.000 kW', // Caracará 01
  '106': '1.000 kW', // Caracará 02
  '107': '400 kW',   // Caracará 03
  '108': '1.000 kW', // Horizonte I
  '109': '1.000 kW', // Horizonte II
  '110': '1.000 kW', // Rio das Pedras I
  '111': '1.000 kW', // Rio das Pedras II
  '112': '1.000 kW', // Rio das Pedras III
  '113': '1.000 kW', // Rio das Pedras IV
  '114': '1.000 kW', // Irecê 01
  '115': '1.000 kW', // Irecê 02
  '116': '1.000 kW', // Irecê 03
  '117': '1.000 kW', // Irecê 04
  '118': '1.000 kW', // Irecê 05
  '119': '1.000 kW', // Panorama 01
  '120': '1.000 kW', // Panorama 02
  '121': '500 kW',   // Panorama 03
  '122': '1.000 kW', // Barra do Arará 01
  '123': '1.000 kW', // Barra do Arará 02
  '124': '1.000 kW', // Aliança 01
  '125': '1.000 kW', // Aliança 02
  '126': '1.000 kW', // Pedro Cunha Fiúza
};

export function getDemandaContratada(item: UfvMatrixItem): string {
  if (item.demandaContratada) return item.demandaContratada;
  if (DEMANDA_CONTRATADA_MAP[item.id]) return DEMANDA_CONTRATADA_MAP[item.id];
  return item.potenciaUfv || '-';
}

export const POTENCIA_PICO_MAP: Record<string, string> = {
  '1': '1.318,26 kWp',
  '2': '1.282,50 kWp',
  '3': '1.253,00 kWp',
  '4': '1.253,00 kWp',
  '5': '1.323,00 kWp',
  '6': '1.323,00 kWp',
  '7': '1.375,50 kWp',
  '8': '1.375,50 kWp',
  '9': '1.239,84 kWp',
  '10': '1.239,84 kWp',
  '11': '1.147,24 kWp',
  '12': '1.047,05 kWp',
  '13': '807,36 kWp',
  '14': '1.328,40 kWp',
  '15': '1.328,40 kWp',
  '16': '1.328,40 kWp',
  '17': '984,00 kWp',
  '18': '3.057,18 kWp',
  '19': '3.057,18 kWp',
  '20': '3.057,18 kWp',
  '21': '3.057,18 kWp',
  '22': '3.057,18 kWp',
  '23': '3.057,18 kWp',
  '24': '2.808,96 kWp',
  '25': '3.057,18 kWp',
  '26': '3.057,18 kWp',
  '27': '1.372,80 kWp',
  '28': '1.372,80 kWp',
  '29': '848,25 kWp',
  '30': '628,32 kWp',
  '31': '3.057,18 kWp',
  '32': '1.328,40 kWp',
  '33': '442,80 kWp',
  '34': '1.239,84 kWp',
  '35': '1.239,84 kWp',
  '36': '1.323,00 kWp',
  '37': '686,40 kWp',
  '38': '1.144,00 kWp',
  '39': '1.144,00 kWp',
  '40': '1.144,00 kWp',
  '41': '1.144,00 kWp',
  '42': '572,00 kWp',
  '43': '1.375,50 kWp',
  '44': '1.375,50 kWp',
  '45': '1.375,50 kWp',
  '46': '1.375,50 kWp',
  '47': '6.176,25 kWp',
  '48': '3.172,50 kWp',
  '49': '1.311,96 kWp',
  '50': '1.193,40 kWp',
  '51': '1.193,40 kWp',
  '52': '601,80 kWp',
  '53': '1.386,00 kWp',
  '54': '1.386,00 kWp',
  '55': '554,40 kWp',
  '56': '1.059,66 kWp',
  '57': '1.248,75 kWp',
  '58': '3.393,29 kWp',
  '59': '1.239,84 kWp',
  '60': '1.239,84 kWp',
  '61': '1.239,84 kWp',
  '62': '1.239,84 kWp',
  '63': '413,28 kWp',
  '64': '3.948,75 kWp',
  '65': '1.311,96 kWp',
  '66': '1.372,00 kWp',
  '67': '1.372,00 kWp',
  '68': '1.372,00 kWp',
  '69': '1.372,00 kWp',
  '70': '742,40 kWp',
  '71': '1.066,00 kWp',
  '72': '1.144,00 kWp',
  '73': '1.144,00 kWp',
  '74': '1.144,00 kWp',
  '75': '500,50 kWp',
  '76': '2.974,32 kWp',
  '77': '2.857,68 kWp',
  '78': '6.240,24 kWp',
  '79': '2.974,32 kWp',
  '80': '1.468,80 kWp',
  '81': '2.808,96 kWp',
  '82': '2.974,32 kWp',
  '83': '2.916,00 kWp',
  '84': '2.916,00 kWp',
  '85': '1.101,60 kWp',
  '86': '1.101,60 kWp',
  '87': '877,20 kWp',
  '88': '1.162,80 kWp',
  '89': '836,40 kWp',
  '90': '918,00 kWp',
  '91': '3.099,60 kWp',
  '92': '1.377,00 kWp',
  '93': '1.360,80 kWp',
  '94': '1.393,20 kWp',
  '95': '1.393,20 kWp',
  '96': '1.375,50 kWp',
  '97': '1.375,50 kWp',
  '98': '1.375,50 kWp',
  '99': '6.560,96 kWp',
  '100': '2.751,00 kWp',
  '101': '1.375,50 kWp',
  '102': '1.319,50 kWp',
  '103': '856,08 kWp',
  '104': '275,52 kWp',
  '105': '1.375,50 kWp',
  '106': '1.375,50 kWp',
  '107': '550,20 kWp',
  '108': '1.082,00 kWp',
  '109': '1.082,00 kWp',
  '110': '1.360,80 kWp',
  '111': '1.360,80 kWp',
  '112': '1.360,80 kWp',
  '113': '1.360,80 kWp',
  '114': '1.277,60 kWp',
  '115': '1.277,60 kWp',
  '116': '1.277,60 kWp',
  '117': '1.277,60 kWp',
  '118': '1.277,60 kWp',
  '119': '1.386,00 kWp',
  '120': '1.386,00 kWp',
  '121': '673,20 kWp',
  '122': '1.365,00 kWp',
  '123': '1.365,00 kWp',
  '124': '1.031,10 kWp',
  '125': '1.031,10 kWp',
  '126': '1.031,10 kWp',
};

export function getPotenciaPico(item: UfvMatrixItem): string {
  if (POTENCIA_PICO_MAP[item.id]) return POTENCIA_PICO_MAP[item.id];
  // calculate sum if strings are kWp or strings
  const sum = item.strings.reduce((acc, curr) => acc + (curr || 0), 0);
  return `${sum} kWp`;
}

export function getInversorLabel(index: number, item?: UfvMatrixItem): string {
  const start = item?.inverterStartNumber || 1;
  const num = index + start;
  return `Inversor ${num < 10 ? '0' + num : num}`;
}

export function getInversorShortLabel(index: number, item?: UfvMatrixItem): string {
  const start = item?.inverterStartNumber || 1;
  const num = index + start;
  return `Inv ${num < 10 ? '0' + num : num}`;
}

export function getEstruturaInfo(item: UfvMatrixItem): {
  isFixa: boolean;
  tipoLabel: string;
  badgeLabel: string;
  detalheText: string;
} {
  const isFixa = !item.trackerValue || item.trackerValue === 'Fixa';
  if (isFixa) {
    return {
      isFixa: true,
      tipoLabel: 'Estrutura Fixa',
      badgeLabel: 'Fixa',
      detalheText: 'Montagem em suporte fixo'
    };
  }
  const modStr = item.modeloTracker ? ` (${item.modeloTracker})` : '';
  return {
    isFixa: false,
    tipoLabel: `Tracker (Seguidor Solar${modStr})`,
    badgeLabel: `Tracker (${item.trackerValue})`,
    detalheText: `${item.trackerValue} rastreadores solares${modStr}`
  };
}

export interface FormulaOptions {
  sheetName: string;
  ufvCell: string;
  inverterCell: string;
  tableRange: string;
  headerRange: string;
  ufvColumnRange: string;
  dataRange: string;
}

export function generateFormula(type: 'INDEX_MATCH' | 'XLOOKUP' | 'VLOOKUP' | 'SUMIFS', options: FormulaOptions): { formula: string; explanation: string; title: string } {
  const { sheetName, ufvCell, inverterCell, tableRange, headerRange, ufvColumnRange, dataRange } = options;
  const sheetPrefix = sheetName ? `'${sheetName}'!` : '';

  switch (type) {
    case 'INDEX_MATCH':
      return {
        title: 'ÍNDICE + CORRESP (Mais seguro & Compatível)',
        formula: `=ÍNDICE(${sheetPrefix}${dataRange}; CORRESP(${ufvCell}; ${sheetPrefix}${ufvColumnRange}; 0); CORRESP(${inverterCell}; ${sheetPrefix}${headerRange}; 0))`,
        explanation: 'Localiza primeiro a linha correspondente ao nome da UFV na coluna A, em seguida localiza a coluna do Inversor selecionado no cabeçalho (linha 1) e retorna a interseção exata.'
      };
    case 'XLOOKUP':
      return {
        title: 'BUSCAX Duplo (Excel Moderno & Google Sheets)',
        formula: `=BUSCAX(${ufvCell}; ${sheetPrefix}${ufvColumnRange}; BUSCAX(${inverterCell}; ${sheetPrefix}${headerRange}; ${sheetPrefix}${dataRange}))`,
        explanation: 'Funciona encadeando duas funções BUSCAX (XLOOKUP): a primeira procura o cabeçalho do inversor e a segunda procura a linha da UFV retornando o valor exato.'
      };
    case 'VLOOKUP':
      return {
        title: 'PROCV + CORRESP (Tradicional)',
        formula: `=PROCV(${ufvCell}; ${sheetPrefix}${tableRange}; CORRESP(${inverterCell}; ${sheetPrefix}${headerRange}; 0); FALSO)`,
        explanation: 'Utiliza o PROCV para buscar a UFV na primeira coluna da tabela, utilizando o CORRESP para calcular dinamicamente qual coluna do Inversor deve ser lida.'
      };
    case 'SUMIFS':
      return {
        title: 'SOMA.SE.S / SOMARPRODUTO (Alternativa Numérica)',
        formula: `=SOMARPRODUTO((${sheetPrefix}${ufvColumnRange}=${ufvCell})*(${sheetPrefix}${headerRange}=${inverterCell})*${sheetPrefix}${dataRange})`,
        explanation: 'Para matrizes numéricas sem texto intermediário, multiplica a condição de linha e a condição de coluna para extrair diretamente o valor da célula correspondente.'
      };
  }
}
