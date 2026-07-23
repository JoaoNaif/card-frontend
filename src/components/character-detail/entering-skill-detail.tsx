import { ShieldHalf } from 'lucide-react'
import type { Skill } from '../../api/types/skill'
import { StatusMode } from './status-mode'
import { StatusValue } from './status-value'
import { BattleFieldTrait } from './battle-field-trait'

interface EnteringSkillDetailProps {
  skill: Skill
}

export function EnteringSkillDetail({ skill }: EnteringSkillDetailProps) {
  return (
    <li className="border border-accent-brand bg-linear-to-tr from-bg-2 to-accent-brand-muted/20 p-4 flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="h-2 w-2 -rotate-45 bg-ornament-bright shrink-0" />
          <h4 className="font-display text-[16px] leading-[150%] text-text-primary">
            {skill.name}
          </h4>
          <span className="text-[10px] leading-[150%] border border-ornament-bright bg-ornament-bright/10 text-ornament-bright px-2 py-px uppercase shrink-0">
            Entrando
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <StatusMode
            mode={{
              battleFieldId: skill.appliesBattleFieldId,
              damage: skill.damageMultiplier,
              heal: skill.healMultiplier,
              targetType: skill.targetType,
              targetEffectStat: skill.targetEffectStat,
            }}
          />
          <div className="flex gap-1 text-[10px] leading-[150%] border-border-strong border divide-border-strong text-text-secondary divide-x bg-bg-1 py-1">
            <span className="px-2">{skill.power.name}</span>
            {skill.power.isAwakened && (
              <span className="pl-1 pr-2 text-ornament-bright">Despertado</span>
            )}
          </div>
        </div>
      </div>

      <p className="text-[12px] leading-[150%] text-text-secondary">{skill.description}</p>

      <ul className="grid grid-cols-2 lg:grid-cols-5 gap-y-3 gap-x-2 border-t border-border-default pt-3">
        <StatusValue text="Dano" variant="percent" percent={skill.damageMultiplier} />
        <StatusValue text="Cura" variant="percent" percent={skill.healMultiplier} />
        <StatusValue text="Alvo" variant="type" type={skill.targetType} />
        <StatusValue text="Recarga" variant="cooldown" cooldown={skill.cooldownTurns} />
        <StatusValue
          text="Custo"
          variant="cost"
          cost={{
            stat: skill.debuffStat,
            value: skill.debuffValue,
            duration: skill.debuffDuration,
          }}
        />
      </ul>

      {skill.targetEffectStat && (
        <div className="border-t border-border-default pt-3">
          <StatusValue
            text="Efeito no alvo"
            variant="target"
            target={{
              targetEffectDuration: skill.targetEffectDuration,
              targetEffectStat: skill.targetEffectStat,
              targetEffectValue: skill.targetEffectValue,
              type: skill.targetType,
            }}
          />
        </div>
      )}

      {skill.appliesBattleFieldId && skill.battleField && (
        <article className="flex flex-col gap-2 border border-field-glow bg-linear-to-tr from-bg-2 to-field-glow/25 p-4">
          <div className="flex items-center gap-4">
            <div className="border border-field-glow flex justify-center items-center p-2 h-8 w-8 -rotate-45">
              <ShieldHalf size={16} className="rotate-45 text-field-glow" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center divide-dotted divide-accent-brand gap-2">
                <span className="font-sans text-[12px] leading-[150%] text-field-glow">
                  Campo de batalha
                </span>
                <span className="text-[10px] leading-[150%] font-sans text-text-tertiary">
                  {skill.fieldDuration} Turnos
                </span>
              </div>
              <h4 className="font-display text-[16px] leading-[150%] text-text-primary">
                {skill.battleField.name}
              </h4>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[12px] leading-[150%] text-text-secondary border-l-2 border-field-glow pl-2">
              {skill.battleField.description}
            </p>

            <div className="flex flex-col gap-2">
              <p className="uppercase font-mono text-text-tertiary text-[10px]">
                Bonus por caracteristica
              </p>

              <ul className="flex flex-col gap-1">
                {skill.battleField.modifiers.map((trait) => (
                  <BattleFieldTrait key={trait.id} trait={trait} />
                ))}
              </ul>
            </div>
          </div>
        </article>
      )}
    </li>
  )
}
