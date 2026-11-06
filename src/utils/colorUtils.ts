export interface StringColorStyle {
  cardBg: string;
  badgeBg: string;
  badgeText: string;
  textColor: string;
  borderColor: string;
  isDarkGray: boolean;
  rankIndex: number;
}

export function getStringColorStyle(
  val: number,
  allStringsInUfv: number[],
  isSelected: boolean = false
): StringColorStyle {
  if (val === undefined || val === null || !allStringsInUfv || allStringsInUfv.length === 0) {
    return {
      cardBg: 'bg-white',
      badgeBg: 'bg-slate-100',
      badgeText: 'text-slate-400',
      textColor: 'text-slate-400',
      borderColor: 'border-slate-200',
      isDarkGray: false,
      rankIndex: -1,
    };
  }

  // Selected state override (high visibility selection)
  if (isSelected) {
    return {
      cardBg: 'bg-amber-500 text-slate-950 font-extrabold shadow-md scale-[1.02] ring-2 ring-amber-400 border-amber-600',
      badgeBg: 'bg-slate-950',
      badgeText: 'text-amber-300 font-mono font-bold',
      textColor: 'text-slate-950 font-extrabold',
      borderColor: 'border-amber-600',
      isDarkGray: false,
      rankIndex: -1,
    };
  }

  const sortedUnique = Array.from(new Set(allStringsInUfv)).sort((a, b) => b - a);
  const rankIndex = sortedUnique.indexOf(val);
  const maxVal = sortedUnique[0];

  if (rankIndex < 0) {
    return {
      cardBg: 'bg-slate-100 text-slate-700 font-medium border-slate-200',
      badgeBg: 'bg-slate-200',
      badgeText: 'text-slate-700 font-mono font-bold',
      textColor: 'text-slate-700 font-medium',
      borderColor: 'border-slate-300',
      isDarkGray: false,
      rankIndex: -1,
    };
  }

  // Highest value in the plant -> Dark Gray (Cinza Mais Escuro)
  if (val === maxVal) {
    return {
      cardBg: 'bg-slate-800 text-amber-300 hover:bg-slate-750 font-bold shadow-sm border-slate-700',
      badgeBg: 'bg-slate-950',
      badgeText: 'text-amber-400 font-mono font-bold',
      textColor: 'text-amber-300 font-bold',
      borderColor: 'border-slate-700',
      isDarkGray: true,
      rankIndex: 0,
    };
  }

  // Multi-value rank colors for rank 1, 2, 3...
  const rankPalettes = [
    {
      cardBg: 'bg-slate-800 text-amber-300 hover:bg-slate-700 font-bold shadow-sm border-slate-700',
      badgeBg: 'bg-slate-950',
      badgeText: 'text-amber-400 font-mono font-bold',
      textColor: 'text-amber-300 font-bold',
      borderColor: 'border-slate-700',
    },
    {
      cardBg: 'bg-indigo-50 text-indigo-950 hover:bg-indigo-100/90 font-bold border-indigo-200/90 shadow-2xs',
      badgeBg: 'bg-indigo-900',
      badgeText: 'text-indigo-100 font-mono font-bold',
      textColor: 'text-indigo-900 font-extrabold',
      borderColor: 'border-indigo-300',
    },
    {
      cardBg: 'bg-emerald-50 text-emerald-950 hover:bg-emerald-100/90 font-bold border-emerald-200/90 shadow-2xs',
      badgeBg: 'bg-emerald-900',
      badgeText: 'text-emerald-100 font-mono font-bold',
      textColor: 'text-emerald-900 font-extrabold',
      borderColor: 'border-emerald-300',
    },
    {
      cardBg: 'bg-purple-50 text-purple-950 hover:bg-purple-100/90 font-bold border-purple-200/90 shadow-2xs',
      badgeBg: 'bg-purple-900',
      badgeText: 'text-purple-100 font-mono font-bold',
      textColor: 'text-purple-900 font-extrabold',
      borderColor: 'border-purple-300',
    },
    {
      cardBg: 'bg-rose-50 text-rose-950 hover:bg-rose-100/90 font-bold border-rose-200/90 shadow-2xs',
      badgeBg: 'bg-rose-900',
      badgeText: 'text-rose-100 font-mono font-bold',
      textColor: 'text-rose-900 font-extrabold',
      borderColor: 'border-rose-300',
    },
  ];

  const palette = rankPalettes[rankIndex % rankPalettes.length];
  return {
    ...palette,
    isDarkGray: rankIndex === 0,
    rankIndex,
  };
}
