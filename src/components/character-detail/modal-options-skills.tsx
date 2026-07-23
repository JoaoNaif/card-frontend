import { X } from 'lucide-react'
import { useState } from 'react'
import type { Skill } from '../../api/types/skill'
import type { Infos } from './pending-skill'
import { SkillOption } from './skill-option'
import { DiscardSkill } from './discard-skill'
import { SwapSkillStep } from './swap-skill-step'

interface ModalOptionsSkillsProps {
  skills: Skill[]
  activeSkills: Skill[]
  characterInfos: Infos
  onClose: () => void
}

type Step = 'select-skill' | 'swap-skill'

export function ModalOptionsSkills({
  characterInfos,
  skills,
  activeSkills,
  onClose,
}: ModalOptionsSkillsProps) {
  const [step, setStep] = useState<Step>('select-skill')
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  function handleSelectSkill(skill: Skill) {
    setSelectedSkill(skill)
    setStep('swap-skill')
  }

  function handleBack() {
    setStep('select-skill')
    setSelectedSkill(null)
  }

  return (
    <dialog className="fixed top-0 left-0 bg-black/80 z-50 inset-0 flex items-center justify-center w-full h-full">
      <div className="mx-2 lg:mx-0 bg-bg-2 border border-border-strong p-4">
        <header className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="lg:text-[18px] text-[14px] leading-[150%]">Selecionar Skill</h2>
            <button type="button" onClick={onClose} className="cursor-pointer">
              <X size={16} />
            </button>
          </div>
          {step === 'select-skill' && (
            <p className="lg:text-[14px] text-[12px] leading-[150%] text-text-tertiary">
              Escolha uma das opções disponíveis para {characterInfos.name}
            </p>
          )}
        </header>

        {step === 'select-skill' && (
          <>
            <ul className="flex flex-col gap-3 mt-4">
              {skills.map((skill) => (
                <SkillOption key={skill.id} skill={skill} onSelect={handleSelectSkill} />
              ))}
            </ul>

            <DiscardSkill characterId={characterInfos.characterId} onDiscarded={onClose} />
          </>
        )}

        {step === 'swap-skill' && selectedSkill && (
          <SwapSkillStep
            characterId={characterInfos.characterId}
            characterName={characterInfos.name}
            selectedSkill={selectedSkill}
            activeSkills={activeSkills}
            onBack={handleBack}
            onSwapped={onClose}
          />
        )}
      </div>
    </dialog>
  )
}
