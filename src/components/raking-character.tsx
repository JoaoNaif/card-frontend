import type { Ranking } from '../api/types/character'

const RANKING_STYLES: Record<
  Ranking,
  { span: string; dot: string; border: string; description: string }
> = {
  DISCRETO: {
    span: 'text-discreet',
    dot: 'bg-discreet/20',
    border: 'border-discreet',
    description: 'Baixo impacto estratégico. Ameaça local.',
  },
  CONTINUO: {
    span: 'text-continuous',
    dot: 'bg-continuous/20',
    border: 'border-continuous',
    description: 'Combatente consistente, enfrenta múltiplos Discretos. Ameaça municipal.',
  },
  DIFERENCIAVEL: {
    span: 'text-differentiable',
    dot: 'bg-differentiable/20',
    border: 'border-differentiable',
    description: 'Acima da média, capaz de alterar o rumo de batalhas. Ameaça regional.',
  },
  NAO_LINEAR: {
    span: 'text-non-linear',
    dot: 'bg-non-linear/20',
    border: 'border-non-linear',
    description: 'Crescimento imprevisível, desestabiliza estruturas militares. Ameaça estatal.',
  },
  SINGULAR: {
    span: 'text-singular',
    dot: 'bg-singular/20',
    border: 'border-singular',
    description: 'Caso raro sem precedente direto de comparação. Ameaça multi-estatal.',
  },
  DIVERGENTE: {
    span: 'text-divergent',
    dot: 'bg-divergent/20',
    border: 'border-divergent',
    description: 'Trajetória de poder foge a qualquer padrão previsto. Ameaça continental.',
  },
  CAOTICO: {
    span: 'text-chaotic',
    dot: 'bg-chaotic/20',
    border: 'border-chaotic',
    description:
      'Extremamente raro (≈1 em 3 bilhões). Impacto continental ou superior — altera o equilíbrio estrutural do mundo.',
  },
}

interface RankingCharacterProps {
  ranking: Ranking
}

export function RankingCharacter({ ranking }: RankingCharacterProps) {
  const rankingColor = RANKING_STYLES[ranking]
  return (
    <div
      className={`w-fit relative group cursor-pointer px-1 ${rankingColor.dot} border ${rankingColor.border}`}
    >
      <p className={`text-[10px] font-semibold ${rankingColor.span}`}>{ranking}</p>
      <dialog className="absolute top-1/2 -translate-y-1/2 p-2 left-[110%] w-75 bg-bg-3 z-10 border border-border-strong flex-col gap-2 hidden group-hover:flex transition-all duration-500 ease-out">
        <div className="flex flex-col gap-1">
          <span className="text-[14px] leading-[150%]">
            Classificação de Perigo — aplicada exclusivamente a combatentes.
          </span>
          <span className="text-[12px] text-text-tertiary leading-[150%]">
            Ordem crescente de ameaça:
          </span>
          <span className="text-[12px] text-text-tertiary font-mono leading-[150%]">
            Discreto - Contínuo - Diferenciável - Não-Linear - Singular - Divergente - Caótico
          </span>
        </div>
        <p className="text-text-secondary text-[12px] leading-[150%]">
          {ranking}: {rankingColor.description}
        </p>
      </dialog>
    </div>
  )
}
