import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import type { Skill } from '../../api/types/skill'
import { getSkillOption } from '../../api/skill/get-skill-option'
import { ModalOptionsSkills } from './modal-options-skills'

export interface Infos {
  characterId: string
  name: string
  hp: number
  spd: number
  atk: number
  def: number
}

interface PendingSkillProps {
  characterInfos: Infos
  characterid: string
  activeSkills: Skill[]
}

export function PendingSkill({ characterid, characterInfos, activeSkills }: PendingSkillProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    refetch,
    isFetching,
    data: skills,
  } = useQuery({
    queryKey: ['skill-options', characterid],
    queryFn: () => getSkillOption({ characterId: characterid }),
    enabled: false,
  })

  async function handleOpenModal() {
    if (skills) {
      setIsModalOpen(true)
      return
    }

    const { data } = await refetch()

    if (data) setIsModalOpen(true)
  }

  return (
    <section className="flex lg:flex-row flex-col lg:gap-0 gap-3 lg:items-center items-stretch justify-between w-full lg:mt-8 mt-5 border border-l-2 border-accent-brand bg-accent-brand-muted px-5 py-2">
      <div className="flex items-center w-full gap-2 ">
        <div className="h-2 w-2 -rotate-45 bg-accent-brand" />
        <span className="lg:text-[14px] text-[12px] leading-[150%] text-text-primary">
          {characterInfos.name} tem uma seleção de skill pendente
        </span>
      </div>
      <button
        onClick={handleOpenModal}
        disabled={isFetching}
        className="lg:text-[14px] text-[12px] leading-[150%] whitespace-nowrap bg-accent-brand py-1 px-2 border border-transparent hover:border-text-primary hover:bg-frost-secondary transition-colors duration-700 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full lg:w-auto text-center"
      >
        {isFetching ? 'Carregando...' : 'Selecionar Agora'}
      </button>

      {isModalOpen && skills && (
        <ModalOptionsSkills
          characterInfos={{
            atk: characterInfos.atk,
            def: characterInfos.def,
            spd: characterInfos.spd,
            hp: characterInfos.hp,
            name: characterInfos.name,
            characterId: characterInfos.characterId,
          }}
          skills={skills}
          activeSkills={activeSkills}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  )
}
