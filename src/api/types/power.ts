export type PowerPillar = 'MATERIAL' | 'VETORIAL' | 'BIOLOGICA' | 'PSIQUICA' | 'FUNDAMENTAL'

export interface Power {
  id: string
  name: string
  description: string
  pillar: PowerPillar
  canAwaken: boolean
  isAwakened: boolean
  createdAt: Date
}
