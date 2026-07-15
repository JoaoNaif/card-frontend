import type { StatType } from './stat-type'

export type BonusType = 'PERCENT' | 'FLAT'

export interface BattleFieldModifier {
  id: string
  traitName: string
  traitId: string
  bonusType: BonusType
  bonusValue: number
  stat: StatType
}

export interface BattleField {
  id: string
  name: string
  description: string
  modifiers: BattleFieldModifier[]
  createdAt: Date
}
