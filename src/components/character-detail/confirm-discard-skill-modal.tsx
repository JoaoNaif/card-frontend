import { TriangleAlert } from 'lucide-react'

interface ConfirmDiscardSkillModalProps {
  isPending: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmDiscardSkillModal({
  isPending,
  onCancel,
  onConfirm,
}: ConfirmDiscardSkillModalProps) {
  return (
    <dialog className="fixed top-0 left-0 bg-black/80 z-60 inset-0 flex items-center justify-center w-full h-full">
      <div className="lg:w-100 mx-2 lg:mx-0 bg-bg-2 border border-border-strong p-4">
        <header className="flex items-center gap-3">
          <div className="border border-danger flex justify-center items-center p-2 h-8 w-8 -rotate-45 shrink-0">
            <TriangleAlert size={16} className="rotate-45 text-danger" />
          </div>
          <h2 className="lg:text-[16px] text-[14px] leading-[150%]">Confirmar descarte</h2>
        </header>

        <p className="lg:text-[14px] text-[12px] leading-[150%] text-text-secondary mt-3">
          Esta ação é irreversível: ao descartar as opções de skill atuais, elas não poderão ser
          recuperadas. Deseja continuar?
        </p>

        <div className="flex items-center justify-end gap-3 mt-5">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="lg:text-[14px] text-[12px] leading-[150%] px-3 py-1 border border-border-strong hover:bg-bg-3 transition-colors duration-700 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="lg:text-[14px] text-[12px] leading-[150%] px-3 py-1 bg-danger border border-transparent hover:border-text-primary transition-colors duration-700 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Descartando...' : 'Descartar'}
          </button>
        </div>
      </div>
    </dialog>
  )
}
