import { api } from '../../lib/axios'

export interface DiscardSkillParams {
  characterId: string
}

export async function discardSkill({ characterId }: DiscardSkillParams) {
  const response = await api.post(`/skills/options/${characterId}/discard`)

  return response.data
}
