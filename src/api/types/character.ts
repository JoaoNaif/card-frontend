import type { Power } from './power'
import type { Ranking } from './ranking'

export interface Character {
  id: string
  name: string
  description: string
  userId?: string | null | undefined
  ranking: Ranking
  level: number
  xp: number
  hp: number
  atk: number
  def: number
  spd: number
  secondaryPower?: Power | null
  power: Power
  traits: { id: string; name: string }[]
  createdAt: Date
}
