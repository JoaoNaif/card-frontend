import type { StatType } from '../../api/types/stat-type'
import type { TargetType } from '../../api/types/target-type'

const TARGET_TRANSLATE: Record<TargetType, { type: string }> = {
  ALL_ALLIES: {
    type: 'Área',
  },
  AOE_ENEMIES: {
    type: 'Área',
  },
  SELF: {
    type: 'Auto',
  },
  SINGLE_ALLY: {
    type: 'Alvo',
  },
  SINGLE_ENEMY: {
    type: 'Alvo',
  },
}

type StatusValueProps = { text: string } & (
  | { variant: 'percent'; percent: number }
  | { variant: 'cooldown'; cooldown: number }
  | { variant: 'type'; type: TargetType }
  | {
      variant: 'target'
      target: {
        targetEffectStat: StatType | null | undefined
        targetEffectValue: number | null | undefined
        targetEffectDuration: number | null | undefined
        type: TargetType
      }
    }
  | {
      variant: 'cost'
      cost: {
        stat: StatType
        value: number
        duration: number
      }
    }
)

export function StatusValue(props: StatusValueProps) {
  const { text, variant } = props

  if (variant === 'percent') {
    if (props.percent <= 0) return null

    return (
      <div className="flex items-center gap-1 text-[12px] font-mono leading-[150%]">
        <div className="flex flex-col items-center justify-center">
          <span className="text-text-tertiary font-sans">{text}</span>
          <p className="text-text-primary">+{Math.round((props.percent - 1) * 100)}%</p>
        </div>
      </div>
    )
  }

  if (variant === 'type') {
    const targetTranslate = TARGET_TRANSLATE[props.type]

    return (
      <div className="flex items-center gap-1 text-[12px] font-mono leading-[150%]">
        <div className="flex flex-col items-center justify-center">
          <span className="text-text-tertiary font-sans">{text}</span>
          <p className="text-text-primary">{targetTranslate.type}</p>
        </div>
      </div>
    )
  }

  if (variant === 'cooldown') {
    return (
      <div className="flex items-center gap-1 text-[12px] font-mono leading-[150%]">
        <div className="flex flex-col items-center justify-center">
          <span className="text-text-tertiary font-sans">{text}</span>
          <p className="text-text-primary">{props.cooldown}t</p>
        </div>
      </div>
    )
  }

  if (variant === 'target') {
    if (!props.target.targetEffectStat) return null

    const isEnemy =
      props.target.type === 'AOE_ENEMIES' || props.target.type === 'SINGLE_ENEMY'

    return (
      <div className="flex items-center gap-1 text-[12px] font-mono leading-[150%]">
        <div className="flex flex-col items-center justify-center">
          <span className="text-text-tertiary font-sans">{text}</span>
          <div className="text-text-primary flex items-ends gap-1">
            <p>
              {isEnemy ? '-' : '+'}
              {props.target.targetEffectValue}
            </p>
            <p>{props.target.targetEffectStat}</p>
          </div>
          <p className="text-[8px] text-text-tertiary leading-[120%] font-sans">
            por {props.target.targetEffectDuration} turnos
          </p>
        </div>
      </div>
    )
  }

  if (variant === 'cost') {
    return (
      <div className="flex items-center gap-1 text-[12px] font-mono leading-[150%]">
        <div className="flex flex-col items-center justify-center">
          <span className="text-text-tertiary font-sans">{text}</span>
          <div className="text-text-primary flex items-ends gap-1">
            <p>-{props.cost.value}</p>
            <p>{props.cost.stat}</p>
          </div>
          <p className="text-[8px] text-text-tertiary leading-[120%] font-sans">
            por {props.cost.duration} turnos
          </p>
        </div>
      </div>
    )
  }

  return null
}
