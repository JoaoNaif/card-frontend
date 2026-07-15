import type { Ranking } from '../api/types/ranking'

const RANKING_STYLES: Record<
  Ranking,
  { span: string; dot: string; dotPer: string; border: string; description: string }
> = {
  DISCRETO: {
    span: 'text-discreet',
    dot: 'bg-discreet',
    dotPer: 'bg-discreet/20',
    border: 'border-discreet',
    description: 'Baixo impacto estratégico. Ameaça local.',
  },
  CONTINUO: {
    span: 'text-continuous',
    dot: 'bg-continuous',
    dotPer: 'bg-continuous/20',
    border: 'border-continuous',
    description: 'Combatente consistente, enfrenta múltiplos Discretos. Ameaça municipal.',
  },
  DIFERENCIAVEL: {
    span: 'text-differentiable',
    dot: 'bg-differentiable',
    dotPer: 'bg-differentiable/20',
    border: 'border-differentiable',
    description: 'Acima da média, capaz de alterar o rumo de batalhas. Ameaça regional.',
  },
  NAO_LINEAR: {
    span: 'text-non-linear',
    dot: 'bg-non-linear',
    dotPer: 'bg-non-linear/20',
    border: 'border-non-linear',
    description: 'Crescimento imprevisível, desestabiliza estruturas militares. Ameaça estatal.',
  },
  SINGULAR: {
    span: 'text-singular',
    dot: 'bg-singular',
    dotPer: 'bg-singular/20',
    border: 'border-singular',
    description: 'Caso raro sem precedente direto de comparação. Ameaça multi-estatal.',
  },
  DIVERGENTE: {
    span: 'text-divergent',
    dot: 'bg-divergent',
    dotPer: 'bg-divergent/20',
    border: 'border-divergent',
    description: 'Trajetória de poder foge a qualquer padrão previsto. Ameaça continental.',
  },
  CAOTICO: {
    span: 'text-chaotic',
    dot: 'bg-chaotic',
    dotPer: 'bg-chaotic/20',
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
      className={`w-fit relative group cursor-pointer px-1 ${rankingColor.dotPer} border ${rankingColor.border}`}
    >
      <p className={`text-[10px] font-semibold pr-2 ${rankingColor.span}`}>{ranking}</p>
      <dialog
        className={`absolute overflow-hidden top-1/2 -translate-y-1/2 group-hover:p-2 group-hover:left-[110%] right-1 left-auto w-1 h-1 -rotate-45 group-hover:rotate-0 ${rankingColor.dot} group-hover:w-75 group-hover:h-auto group-hover:bg-bg-3 z-30 group-hover:border group-hover:border-border-strong flex-col gap-2 flex transition-all duration-1000 ease-in-out`}
      >
        <div className="flex-col gap-1 flex opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-500 delay-1000 ease-in-out">
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
        <p className="text-text-secondary text-[12px] leading-[150%] flex opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-500 delay-1000 ease-in-out">
          {ranking}: {rankingColor.description}
        </p>
      </dialog>
    </div>
  )
}
