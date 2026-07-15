interface StatusRosterProps {
  text: string
  status: number
}

export function StatusRoster({ status, text }: StatusRosterProps) {
  return (
    <li className="flex flex-col justify-center items-center">
      <p className="text-[12px] leading-[150%] text-text-tertiary">{text}</p>
      <span className="text-[16px] leading-[150%] font-display">{status}</span>
    </li>
  )
}
