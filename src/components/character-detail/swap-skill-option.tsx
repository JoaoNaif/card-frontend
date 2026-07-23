import { TrendingDown, TrendingUp } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Skill } from '../../api/types/skill'
import {
  formatQualitativeEffect,
  hasQualitativeEffect,
  metricPercent,
  primaryMetric,
  TARGET_LABEL,
} from './skill-diff'
import { StatusMode } from './status-mode'

interface SwapSkillOptionProps {
  skill: Skill
  incomingSkill: Skill
  isSelected: boolean
  onSelect: (skill: Skill) => void
}

function StatCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] uppercase tracking-wide text-text-tertiary font-mono">
        {label}
      </span>
      <div className="text-[12px] leading-[150%] text-text-primary">{children}</div>
    </div>
  )
}

function DeltaBadge({
  diff,
  unit,
  goodWhenPositive,
}: {
  diff: number
  unit: string
  goodWhenPositive: boolean
}) {
  if (diff === 0) return null

  const isGain = goodWhenPositive ? diff > 0 : diff < 0
  const Icon = diff > 0 ? TrendingUp : TrendingDown

  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[10px] font-mono leading-[150%] ${
        isGain ? 'text-success' : 'text-danger'
      }`}
    >
      <Icon size={10} />
      {diff > 0 ? '+' : ''}
      {diff}
      {unit}
    </span>
  )
}

export function SwapSkillOption({
  skill,
  incomingSkill,
  isSelected,
  onSelect,
}: SwapSkillOptionProps) {
  const metric = primaryMetric(incomingSkill)
  const metricLabel = metric === 'heal' ? 'Cura' : 'Dano'
  const equippedPercent = metricPercent(skill, metric)
  const incomingPercent = metricPercent(incomingSkill, metric)
  const metricDiff = incomingPercent - equippedPercent
  const cooldownDiff = incomingSkill.cooldownTurns - skill.cooldownTurns
  const qualitativeEffectText = formatQualitativeEffect(skill)

  return (
    <li>
      <label
        className={`flex flex-col gap-3 border p-3 cursor-pointer transition-colors duration-700 ease-out ${
          isSelected
            ? 'border-accent-brand bg-accent-brand-muted/10'
            : 'border-border-strong hover:bg-bg-3'
        }`}
      >
        <input
          type="radio"
          name="swap-target-skill"
          checked={isSelected}
          onChange={() => onSelect(skill)}
          className="sr-only"
        />

        <div className="flex items-start gap-3">
          <span
            className={`mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
              isSelected ? 'border-accent-brand' : 'border-border-strong'
            }`}
          >
            {isSelected && <span className="h-2 w-2 rounded-full bg-accent-brand" />}
          </span>

          <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
            <h4 className="font-display text-[13px] leading-[150%] text-text-primary">
              {skill.name}
            </h4>
            <StatusMode
              mode={{
                battleFieldId: skill.appliesBattleFieldId,
                damage: skill.damageMultiplier,
                heal: skill.healMultiplier,
                targetType: skill.targetType,
                targetEffectStat: skill.targetEffectStat,
              }}
            />
          </div>
        </div>

        <div className="pl-7 flex flex-col gap-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCell label={metricLabel}>
              <div className="flex flex-col gap-0.5">
                <span>{equippedPercent > 0 ? `+${equippedPercent}%` : '—'}</span>
                <DeltaBadge diff={metricDiff} unit="" goodWhenPositive />
              </div>
            </StatCell>

            <StatCell label="Alvo">{TARGET_LABEL[skill.targetType]}</StatCell>

            <StatCell label="Recarga">
              <div className="flex flex-col gap-0.5">
                <span>{skill.cooldownTurns}t</span>
                <DeltaBadge diff={cooldownDiff} unit="t" goodWhenPositive={false} />
              </div>
            </StatCell>

            <StatCell label="Custo">
              <div className="flex flex-col">
                <span>
                  -{skill.debuffValue} {skill.debuffStat}
                </span>
                <span className="text-[10px] text-text-tertiary">
                  por {skill.debuffDuration} turnos
                </span>
              </div>
            </StatCell>
          </div>

          <StatCell label="Efeito qualitativo">
            {hasQualitativeEffect(skill) ? (
              <div className="flex flex-col gap-1">
                <p
                  className="text-text-secondary line-clamp-2"
                  title={qualitativeEffectText}
                >
                  {qualitativeEffectText}
                </p>
                <span className="text-[9px] uppercase tracking-wide text-danger">
                  Perdido na troca
                </span>
              </div>
            ) : (
              <span className="text-text-tertiary">Nenhum</span>
            )}
          </StatCell>
        </div>
      </label>
    </li>
  )
}
