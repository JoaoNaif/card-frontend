import type { Skill } from '../../api/types/skill'
import type { TargetType } from '../../api/types/target-type'

export const TARGET_LABEL: Record<TargetType, string> = {
  ALL_ALLIES: 'Área',
  AOE_ENEMIES: 'Área',
  SELF: 'Em si mesma',
  SINGLE_ALLY: 'Alvo único',
  SINGLE_ENEMY: 'Alvo único',
}

const TARGET_REACH_RANK: Record<TargetType, number> = {
  SELF: 0,
  SINGLE_ALLY: 1,
  SINGLE_ENEMY: 1,
  ALL_ALLIES: 2,
  AOE_ENEMIES: 2,
}

const TARGET_REACH_DESCRIPTION: Record<TargetType, string> = {
  SELF: 'atinge apenas quem usa',
  SINGLE_ALLY: 'atinge um único alvo',
  SINGLE_ENEMY: 'atinge um único alvo',
  ALL_ALLIES: 'atinge o grupo inteiro',
  AOE_ENEMIES: 'atinge o grupo inteiro',
}

export function isEnemyTarget(type: TargetType) {
  return type === 'AOE_ENEMIES' || type === 'SINGLE_ENEMY'
}

export function reachRank(type: TargetType) {
  return TARGET_REACH_RANK[type]
}

export function reachDescription(type: TargetType) {
  return TARGET_REACH_DESCRIPTION[type]
}

export function primaryMetric(skill: Skill): 'heal' | 'damage' {
  return skill.healMultiplier > 0 && skill.damageMultiplier <= 0 ? 'heal' : 'damage'
}

export function metricPercent(skill: Skill, metric: 'heal' | 'damage') {
  const value = metric === 'heal' ? skill.healMultiplier : skill.damageMultiplier
  return value > 0 ? Math.round((value - 1) * 100) : 0
}

export function hasQualitativeEffect(skill: Skill) {
  return Boolean(skill.targetEffectStat) || Boolean(skill.appliesBattleFieldId)
}

export function formatQualitativeEffect(skill: Skill): string | undefined {
  if (skill.targetEffectStat) {
    const enemy = isEnemyTarget(skill.targetType)
    const base = `${enemy ? '-' : '+'}${skill.targetEffectValue} ${skill.targetEffectStat}${
      enemy ? ' no alvo' : ''
    } por ${skill.targetEffectDuration} turnos`
    return skill.limitation ? `${base} (${skill.limitation})` : base
  }

  if (skill.appliesBattleFieldId && skill.battleField) {
    return `Aplica o campo "${skill.battleField.name}": ${skill.battleField.description}, por ${skill.fieldDuration} turnos`
  }

  return undefined
}
