import type { BattleField } from './battle-field'
import type { Power } from './power'
import type { StatType } from './stat-type'
import type { TargetType } from './target-type'

export interface Skill {
  id: string
  name: string
  description: string
  limitation: string
  cooldownTurns: number
  debuffStat: StatType
  debuffValue: number
  debuffDuration: number
  targetType: TargetType
  damageMultiplier: number
  healMultiplier: number
  targetEffectStat?: StatType | null
  targetEffectValue?: number | null
  targetEffectDuration?: number | null
  minLevel: number
  powerId: string
  power: Power
  appliesBattleFieldId?: string | null
  fieldDuration?: number | null
  battleField: BattleField | null
  createdAt: Date
}
