import { ChevronDown, ShieldHalf } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Skill } from '../../api/types/skill'
import { StatusMode } from './status-mode'
import { StatusValue } from './status-value'
import { BattleFieldTrait } from './battle-field-trait'

interface SkillOptionProps {
  skill: Skill
}

export function SkillOption({ skill }: SkillOptionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = detailsRef.current
    if (!element) return

    const observer = new ResizeObserver(() => {
      setContentHeight(element.getBoundingClientRect().height)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <li
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="border border-border-strong p-3 transition-all duration-700 ease-out"
    >
      <div className="flex flex-col gap-2">
        <StatusMode
          mode={{
            battleFieldId: skill.appliesBattleFieldId,
            damage: skill.damageMultiplier,
            heal: skill.healMultiplier,
            targetType: skill.targetType,
            targetEffectStat: skill.targetEffectStat,
          }}
        />
        <div className="flex items-center justify-between">
          <h4 className="font-display text-[14px] leading-[150%]">{skill.name}</h4>
          <div
            className={`flex gap-1 text-[10px] leading-[150%] border-border-strong border divide-border-strong text-text-secondary divide-x bg-bg-1 py-1`}
          >
            <span className="px-2">{skill.power.name}</span>
            {skill.power.isAwakened && (
              <span className="pl-1 pr-2 text-ornament-bright">Despertado</span>
            )}
          </div>
        </div>
        <p className="text-[10px] leading-[150%] text-text-secondary">{skill.description}</p>
        <ul className="flex items-start justify-between gap-5">
          <StatusValue text="Atq" variant="percent" percent={skill.damageMultiplier} />
          <StatusValue text="Cura" variant="percent" percent={skill.healMultiplier} />
          <StatusValue text="Tipo" variant="type" type={skill.targetType} />
          <StatusValue text="Recarga" variant="cooldown" cooldown={skill.cooldownTurns} />
          <StatusValue
            text="Efeitos"
            variant="target"
            target={{
              targetEffectDuration: skill.targetEffectDuration,
              targetEffectStat: skill.targetEffectStat,
              targetEffectValue: skill.targetEffectValue,
              type: skill.targetType,
            }}
          />
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

        {skill.appliesBattleFieldId && skill.battleField && (
          <div className="flex flex-col gap-3">
            <div className="w-full h-5 relative flex items-center justify-center transition-all duration-700 ease-out">
              <span className="text-center flex gap-1 items-center text-[14px] laeding-[150%] z-10 bg-bg-2 px-2 text-text-tertiary">
                <p>Detalhes</p>
                <ChevronDown
                  size={16}
                  className={`text-text-tertiary transition-all duration-700 ease-out ${isOpen ? 'rotate-180' : ''}`}
                />
              </span>
              <div className="absolute top-1/2 -translate-y-1/2 left-0 h-px w-full border-border-strong border"></div>
            </div>
            <div
              className="overflow-hidden transition-[max-height] duration-700 ease-out"
              style={{ maxHeight: isOpen ? contentHeight : 0 }}
            >
              <article
                ref={detailsRef}
                className="flex flex-col gap-2 border border-field-glow bg-linear-to-tr from-bg-2 to-field-glow/25 p-4"
              >
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
                    <h4 className="font-display text-[16px] leaindg-[150%] text-text-primary">
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
            </div>
          </div>
        )}
      </div>
    </li>
  )
}
