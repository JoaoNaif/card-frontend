import { Link } from 'react-router-dom'
import type { Character } from '../../api/types/character.ts'
import type { PowerPillar } from '../../api/types/power.ts'
import { RankingCharacter } from '../ranking-character.tsx'
import { SeparateBorder } from '../separete-border.tsx'
import { StatusRoster } from './status-roster.tsx'

export interface CardRosterCharacterProps {
  character: Character
}

const PILLAR_STYLES: Record<
  PowerPillar,
  { border: string; dot: string; dotPer: string; dotFrom: string; span: string }
> = {
  MATERIAL: {
    border: 'border-pillar-material',
    dot: 'bg-pillar-material',
    dotPer: 'bg-pillar-material/20',
    dotFrom: 'from-pillar-material',
    span: 'text-pillar-material',
  },
  VETORIAL: {
    border: 'border-pillar-vetorial',
    dot: 'bg-pillar-vetorial',
    dotPer: 'bg-pillar-vetorial/20',
    dotFrom: 'from-pillar-vetorial',
    span: 'text-pillar-vetorial',
  },
  BIOLOGICA: {
    border: 'border-pillar-biologica',
    dot: 'bg-pillar-biologica',
    dotPer: 'bg-pillar-biologica/20',
    dotFrom: 'from-pillar-biologica',
    span: 'text-pillar-biologica',
  },
  PSIQUICA: {
    border: 'border-pillar-psiquica',
    dot: 'bg-pillar-psiquica',
    dotPer: 'bg-pillar-psiquica/20',
    dotFrom: 'from-pillar-psiquica',
    span: 'text-pillar-psiquica',
  },
  FUNDAMENTAL: {
    border: 'border-pillar-fundamental',
    dot: 'bg-pillar-fundamental',
    dotPer: 'bg-pillar-fundamental/20',
    dotFrom: 'from-pillar-fundamental',
    span: 'text-pillar-fundamental',
  },
}

export function CardRosterChracter({ character }: CardRosterCharacterProps) {
  const pillar = PILLAR_STYLES[character.power.pillar]

  return (
    <Link
      to={`/character/${character.id}`}
      className={`flex flex-col gap-1 relative hover:z-20 p-2 bg-bg-2 hover:bg-linear-to-tr hover:from-bg-2 hover:to-bg-3 hover:scale-105 transition-all duration-700 ease-out cursor-pointer border border-t-border-default border-r-border-default border-b-border-default border-l-[3px] ${pillar.border}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-display uppercase font-medium text-[16px]">{character.name}</span>
        <div
          className={`flex items-center gap-1 py-px px-2 border ${pillar.border} ${pillar.dotPer}`}
        >
          <div className={`h-1 w-1 rotate-45 ${pillar.dot}`} />
          <span className={`font-normal text-[10px] leading-[150%] ${pillar.span} `}>
            {character.power.pillar}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <RankingCharacter ranking={character.ranking} />
        <span className="text-[12px] leading-[150%] font-mono text-text-tertiary">
          Lv.{character.level}
        </span>
      </div>

      <div className="flex items-center gap-1 mt-2 mb-3">
        {character.traits.map(
          (item, idx) =>
            idx < 2 && (
              <span
                key={item.id}
                className="text-[10px] leading-[150%] text-text-tertiary bg-bg-1 border border-border-subtle py-px px-2"
              >
                {item.name}
              </span>
            ),
        )}

        {character.traits.length > 2 && (
          <span className="text-[11px] leading-[150%] text-text-tertiary">
            +{character.traits.length - 2}
          </span>
        )}
      </div>

      <SeparateBorder />

      <ul className="flex justify-between mt-4">
        <StatusRoster text="Atq" status={character.atk} />
        <StatusRoster text="Def" status={character.def} />
        <StatusRoster text="Vel" status={character.spd} />
        <StatusRoster text="Hp" status={character.hp} />
      </ul>

      <div
        className={`h-px w-full ${pillar.dot} absolute -bottom-px left-0 bg-linear-to-r ${pillar.dotFrom} to-border-default`}
      />
    </Link>
  )
}
