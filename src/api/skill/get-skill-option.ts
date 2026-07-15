import { api } from '../../lib/axios'
import type { Skill } from '../types/skill'

export interface GetSkillOptionParams {
  characterId: string
}

export async function getSkillOption({ characterId }: GetSkillOptionParams) {
  const response = await api.get<Skill[]>(`skills/options/${characterId}`)

  return response.data
}
