import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { resolveSkill } from '../../api/skill/resolve-skill'
import type { Skill } from '../../api/types/skill'
import { EnteringSkillDetail } from './entering-skill-detail'
import { SwapSkillOption } from './swap-skill-option'
import { SwapResultSummary } from './swap-result-summary'

interface SwapSkillStepProps {
  characterId: string
  characterName: string
  selectedSkill: Skill
  activeSkills: Skill[]
  onBack: () => void
  onSwapped?: () => void
}

export function SwapSkillStep({
  characterId,
  characterName,
  selectedSkill,
  activeSkills,
  onBack,
  onSwapped,
}: SwapSkillStepProps) {
  const [targetSkill, setTargetSkill] = useState<Skill | null>(null)
  const queryClient = useQueryClient()

  const { mutateAsync: resolveSkillFn, isPending } = useMutation({
    mutationFn: resolveSkill,
  })

  async function handleSwap() {
    if (!targetSkill) return

    try {
      await resolveSkillFn({
        characterId,
        currentSkillId: targetSkill.id,
        skillId: selectedSkill.id,
      })
      queryClient.invalidateQueries({ queryKey: ['skill-options', characterId] })
      toast.success('Habilidade trocada com sucesso!')
      onSwapped?.()
    } catch {
      toast.error('Erro ao trocar habilidade!')
    }
  }

  return (
    <div>
      <div className="max-h-150 overflow-auto flex gap-4 pr-3">
        <div className="flex flex-col w-full max-w-175">
          <div className="flex flex-col">
            <p className="lg:text-[14px] text-[12px] leading-[150%] text-text-tertiary">
              Skill escolhida para {characterName}
            </p>

            <ul className="flex flex-col gap-3 mt-2">
              <EnteringSkillDetail skill={selectedSkill} />
            </ul>
          </div>

          <div className="flex flex-col">
            <p className="lg:text-[14px] text-[12px] leading-[150%] text-text-tertiary mt-4">
              Escolha qual skill ativa ela vai substituir
            </p>

            <ul className="flex flex-col gap-3 mt-2">
              {activeSkills.map((skill) => (
                <SwapSkillOption
                  key={skill.id}
                  skill={skill}
                  incomingSkill={selectedSkill}
                  isSelected={targetSkill?.id === skill.id}
                  onSelect={setTargetSkill}
                />
              ))}
            </ul>
          </div>
        </div>

        <SwapResultSummary
          incomingSkill={selectedSkill}
          targetSkill={targetSkill}
          equippedCount={activeSkills.length}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer mt-4 border border-border-strong px-4 py-1 text-[14px] hover:bg-bg-3 transition-colors duration-500 ease-out"
        >
          Voltar
        </button>

        <button
          type="button"
          onClick={handleSwap}
          disabled={!targetSkill || isPending}
          className="cursor-pointer mt-4 ml-3 bg-bg-3 border border-border-strong px-4 py-1 text-[14px] hover:bg-bg-4 transition-colors duration-500 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Trocando...' : 'Trocar habilidade'}
        </button>
      </div>
    </div>
  )
}
