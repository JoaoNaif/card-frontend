import { Plus } from 'lucide-react'
import type { Skill } from '../../api/types/skill'
import {
  formatQualitativeEffect,
  hasQualitativeEffect,
  metricPercent,
  primaryMetric,
  reachDescription,
  reachRank,
  TARGET_LABEL,
} from './skill-diff'

interface SwapResultSummaryProps {
  incomingSkill: Skill
  targetSkill: Skill | null
  equippedCount: number
}

interface DiffEntry {
  label: string
  text: string
}

function buildDiff(incomingSkill: Skill, targetSkill: Skill) {
  const gains: DiffEntry[] = []
  const losses: DiffEntry[] = []

  const metric = primaryMetric(incomingSkill)
  const metricLabel = metric === 'heal' ? 'Cura' : 'Dano'
  const incomingMetric = metricPercent(incomingSkill, metric)
  const targetMetric = metricPercent(targetSkill, metric)
  const metricDiff = incomingMetric - targetMetric

  if (metricDiff !== 0) {
    const bucket = metricDiff > 0 ? gains : losses
    bucket.push({
      label: metricLabel,
      text: `${incomingMetric > 0 ? `+${incomingMetric}%` : '—'} vs ${
        targetMetric > 0 ? `+${targetMetric}%` : '—'
      } (${metricDiff > 0 ? '+' : ''}${metricDiff} pts)`,
    })
  }

  if (incomingSkill.targetType !== targetSkill.targetType) {
    const rankDiff = reachRank(incomingSkill.targetType) - reachRank(targetSkill.targetType)
    if (rankDiff !== 0) {
      const bucket = rankDiff > 0 ? gains : losses
      bucket.push({
        label: 'Alcance',
        text: `${TARGET_LABEL[targetSkill.targetType]} → ${TARGET_LABEL[incomingSkill.targetType]} (${reachDescription(incomingSkill.targetType)})`,
      })
    }
  }

  const cooldownDiff = incomingSkill.cooldownTurns - targetSkill.cooldownTurns
  if (cooldownDiff !== 0) {
    const bucket = cooldownDiff > 0 ? losses : gains
    bucket.push({
      label: 'Recarga',
      text: `${incomingSkill.cooldownTurns} turnos vs ${targetSkill.cooldownTurns} (${
        cooldownDiff > 0 ? '+' : ''
      }${cooldownDiff} turnos de espera)`,
    })
  }

  const incomingCostBurden = incomingSkill.debuffValue * incomingSkill.debuffDuration
  const targetCostBurden = targetSkill.debuffValue * targetSkill.debuffDuration
  if (incomingCostBurden !== targetCostBurden) {
    const bucket = incomingCostBurden > targetCostBurden ? losses : gains
    bucket.push({
      label: 'Custo',
      text: `-${incomingSkill.debuffValue} ${incomingSkill.debuffStat} por ${incomingSkill.debuffDuration} turnos (antes: -${targetSkill.debuffValue} ${targetSkill.debuffStat} por ${targetSkill.debuffDuration} turnos)`,
    })
  }

  const incomingEffect = formatQualitativeEffect(incomingSkill)
  if (incomingEffect && !hasQualitativeEffect(targetSkill)) {
    gains.push({ label: 'Novo efeito', text: incomingEffect })
  }

  const targetEffect = formatQualitativeEffect(targetSkill)
  if (targetEffect && !hasQualitativeEffect(incomingSkill)) {
    losses.push({ label: 'Efeito perdido', text: targetEffect })
  }

  return { gains, losses }
}

function DiffList({ title, entries, tone }: { title: string; entries: DiffEntry[]; tone: 'gain' | 'loss' }) {
  if (entries.length === 0) return null

  const color = tone === 'gain' ? 'text-success' : 'text-danger'
  const dot = tone === 'gain' ? 'bg-success' : 'bg-danger'

  return (
    <div className="flex flex-col gap-2">
      <p className={`text-[10px] uppercase tracking-wide font-mono ${color}`}>{title}</p>
      <ul className="flex flex-col gap-2">
        {entries.map((entry) => (
          <li key={entry.label} className="flex items-start gap-2">
            <span className={`h-1.5 w-1.5 -rotate-45 mt-1.5 shrink-0 ${dot}`} />
            <p className="text-[12px] leading-[150%] text-text-secondary">
              <span className="text-text-primary">{entry.label}:</span> {entry.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SwapResultSummary({
  incomingSkill,
  targetSkill,
  equippedCount,
}: SwapResultSummaryProps) {
  if (!targetSkill) {
    return (
      <aside className="hidden lg:flex flex-col w-90 shrink-0 border border-border-strong bg-bg-1 h-fit sticky top-0 p-4">
        <div className="border border-dashed border-border-strong flex flex-col items-center justify-center gap-4 px-8 py-12">
          <div className="border border-accent-brand h-14 w-14 -rotate-45 flex items-center justify-center shrink-0">
            <Plus size={20} className="rotate-45 text-accent-brand" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h4 className="font-display text-[16px] leading-[150%] text-text-primary">
              Selecione uma skill
            </h4>
            <p className="text-[12px] leading-[150%] text-text-tertiary">
              Escolha na tabela qual das {equippedCount} skills equipadas dará lugar a{' '}
              <span className="text-field-glow">{incomingSkill.name}</span>.
            </p>
          </div>
        </div>
      </aside>
    )
  }

  const { gains, losses } = buildDiff(incomingSkill, targetSkill)

  return (
    <aside className="hidden lg:flex flex-col w-90 shrink-0 border border-border-strong bg-bg-1 h-fit sticky top-0">
      <div className="p-4 flex flex-col gap-4">
        <p className="text-[10px] uppercase tracking-wide text-text-tertiary font-mono">
          Resultado da troca
        </p>

        <div className="flex flex-col gap-1 text-[13px] leading-[150%]">
          <p>
            <span className="text-success font-display">{incomingSkill.name}</span>{' '}
            <span className="text-text-tertiary">entra</span>
          </p>
          <p>
            <span className="text-danger line-through font-display">{targetSkill.name}</span>{' '}
            <span className="text-text-tertiary">sai do loadout</span>
          </p>
        </div>

        <DiffList title="Você ganha" entries={gains} tone="gain" />
        <DiffList title="Você perde" entries={losses} tone="loss" />
      </div>

      <div className="border-t border-border-default px-4 py-3">
        <p className="text-[11px] leading-[150%] text-text-tertiary text-center">
          Confirme no rodapé para substituir{' '}
          <span className="text-text-secondary">{targetSkill.name}</span>.
        </p>
      </div>
    </aside>
  )
}
