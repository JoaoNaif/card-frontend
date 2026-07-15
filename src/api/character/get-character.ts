import { api } from '../../lib/axios'
import type { Character } from '../types/character'
import type { Power } from '../types/power'
import type { Ranking } from '../types/ranking'
import type { Skill } from '../types/skill'

export interface GetCharacterParams {
  characterId: string
}

export interface GetCharacterResponse extends Omit<Character, 'userId'> {
  userId: string
  maxRanking: Ranking
  breakthroughAttempts: number
  pendingSkillSelections: number
  secondaryPower: Power | null
  awakenedPower: Power | null
  skills: Skill[]
}

export async function getCharacter({ characterId }: GetCharacterParams) {
  const response = await api.get<GetCharacterResponse>(`/characters/${characterId}`)

  return response.data
}
