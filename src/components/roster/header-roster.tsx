interface HeaderRosterProps {
  characterLength: number
}

export function HeaderRoster({ characterLength }: HeaderRosterProps) {
  return (
    <div className="flex flex-col gap-1 mt-10 ">
      <div className="flex items-center justify-between ">
        <h1 className="lg:text-[24px] text-[20px]">Meu Roster</h1>
        <div className="flex items-center gap-2">
          <div className="lg:w-2 lg:h-2 w-1 h-1 bg-ornament rotate-45"></div>
          <span className="text-ornament font-display uppercase lg:text-[14px] text-[12px] leading-[150%] font-semibold">
            Temporada I
          </span>
        </div>
      </div>
      <p className="text-text-tertiary lg:text-[14px] text-[12px] leading-[150%]">
        {characterLength} personagens
      </p>

      <div className="h-px w-[80%] my-7 bg-linear-to-r from-ornament to-transparent" />
    </div>
  )
}
