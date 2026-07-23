import { api } from '../../lib/axios'

export interface ResolveSkillRequest {
  skillId: string
  currentSkillId: string
  characterId: string
}

export async function resolveSkill({ currentSkillId, skillId, characterId }: ResolveSkillRequest) {
  await api.post(`/skills/options/${characterId}/choose`, { currentSkillId, skillId })
}
