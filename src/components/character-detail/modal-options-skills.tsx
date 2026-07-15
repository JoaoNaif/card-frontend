import { X } from 'lucide-react'
import type { Skill } from '../../api/types/skill'
import type { Infos } from './pending-skill'
import { SkillOption } from './skill-option'

interface ModalOptionsSkillsProps {
  skills: Skill[]
  characterInfos: Infos
  onClose: () => void
}

export function ModalOptionsSkills({ characterInfos, skills, onClose }: ModalOptionsSkillsProps) {
  return (
    <dialog className="fixed top-0 left-0 bg-black/80 z-50 inset-0 flex items-center justify-center w-full h-full">
      <div className="w-125 bg-bg-2 border border-border-strong p-4">
        <header className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] leading-[150%]">Selecionar Skill</h2>
            <button type="button" onClick={onClose} className="cursor-pointer">
              <X size={16} />
            </button>
          </div>
          <p className="text-[14px] leading-[150%] text-text-tertiary">
            Escolha uma das opções disponíveis para {characterInfos.name}
          </p>
        </header>

        <ul className="flex flex-col gap-3 mt-4">
          {skills.map((skill) => (
            <SkillOption key={skill.id} skill={skill} />
          ))}
        </ul>
      </div>
    </dialog>
  )
}
