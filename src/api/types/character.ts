import type { Power } from './power'

export type Ranking =
  'DISCRETO' | 'CONTINUO' | 'DIFERENCIAVEL' | 'NAO_LINEAR' | 'SINGULAR' | 'DIVERGENTE' | 'CAOTICO'

export interface Character {
  id: string
  name: string
  description: string
  userId?: string | null | undefined
  ranking: Ranking
  level: number
  xp: number
  baseHp: number
  baseAtk: number
  baseDef: number
  baseSpd: number
  power: Power
  traits: { id: string; name: string }[]
  createdAt: Date
}
