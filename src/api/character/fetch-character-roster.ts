import { api } from '../../lib/axios'
import type { Character } from '../types/character.ts'

export async function fetchCharacterRoster() {
  const response = await api.get<Character[]>('/characters/roster-user')

  return response.data
}
