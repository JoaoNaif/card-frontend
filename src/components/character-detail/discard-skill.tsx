import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { discardSkill } from '../../api/skill/discard-skill'
import { ConfirmDiscardSkillModal } from './confirm-discard-skill-modal'

interface DiscardSkillProps {
  characterId: string
  onDiscarded?: () => void
}

export function DiscardSkill({ characterId, onDiscarded }: DiscardSkillProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync: discardSkillFn, isPending } = useMutation({
    mutationFn: () => discardSkill({ characterId }),
  })

  async function handleDiscard() {
    try {
      await discardSkillFn()
      queryClient.invalidateQueries({ queryKey: ['skill-options', characterId] })
      toast.success('Skills descartadas com sucesso!')
      setIsModalOpen(false)
      onDiscarded?.()
    } catch {
      toast.error('Erro ao descartar skills!')
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="lg:text-[14px] text-[12px] leading-[150%] mt-4 w-full bg-bg-3 border border-border-strong hover:border-danger hover:text-danger transition-colors duration-700 ease-out cursor-pointer py-2"
      >
        Descartar Habilidade
      </button>

      {isModalOpen && (
        <ConfirmDiscardSkillModal
          isPending={isPending}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleDiscard}
        />
      )}
    </>
  )
}
