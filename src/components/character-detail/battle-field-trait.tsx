import { MoveRight } from 'lucide-react'
import type { BattleFieldModifier } from '../../api/types/battle-field'

interface BattleFieldTraitProps {
  trait: BattleFieldModifier
}

export function BattleFieldTrait({ trait }: BattleFieldTraitProps) {
  return (
    <li className="bg-bg-1 py-1 px-4 border-l-2 border-field-glow flex items-center justify-between">
      <div className="flex items-center gap-2 text-[12px] leading-[150%] text-text-tertiary">
        <span className="h-1 w-1 bg-field-glow -rotate-45"></span>
        <span className="text-text-secondary">{trait.traitName}</span>
        <MoveRight size={14} />
        <span>{trait.stat}</span>
      </div>
      <p className="text-[14px] leading-[150%] text-buff font-mono">
        +{trait.bonusValue}
        {trait.bonusType == 'PERCENT' && '%'}
      </p>
    </li>
  )
}
