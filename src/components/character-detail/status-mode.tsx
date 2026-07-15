import type { StatType } from '../../api/types/stat-type'
import type { TargetType } from '../../api/types/target-type'

interface Mode {
  heal: number
  damage: number
  battleFieldId: string | null | undefined
  targetType: TargetType
  targetEffectStat: StatType | null | undefined
}

interface StatusModeProps {
  mode: Mode
}

export function StatusMode({ mode }: StatusModeProps) {
  return (
    <div className="flex items-center gap-2 text-[12px] laeding-[150%]">
      {mode.damage > 0 && (
        <span className="border border-attack bg-attack-bg text-attack px-2 py-px">Ataque</span>
      )}

      {mode.heal > 0 && (
        <span className="border border-heal bg-heal-bg text-heal px-2 py-px">Cura</span>
      )}

      {mode.targetType == 'SINGLE_ENEMY' ||
      (mode.targetType == 'AOE_ENEMIES' && mode.targetEffectStat) ? (
        <span className="border border-debuff bg-debuff-bg text-debuff px-2 py-px">Debuff</span>
      ) : (
        <span className="border border-buff bg-buff-bg text-buff px-2 py-px">Buff</span>
      )}

      {mode.battleFieldId && (
        <span className="border border-field bg-field-bg text-field px-2 py-px">
          Campo de batalha
        </span>
      )}
    </div>
  )
}
