export function SeparateBorder() {
  return (
    <div className="relative w-full h-px bg-border-default">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <svg width="24" height="9" viewBox="0 0 24 9" fill="none">
          <polygon
            points="12,1 23,4.5 12,8 1,4.5"
            stroke="#a88a3f"
            strokeWidth="0.8"
            opacity="0.6"
          ></polygon>
          <polygon points="12,3 16,4.5 12,6 8,4.5" fill="#d1b464" opacity="0.8"></polygon>
        </svg>
      </div>
    </div>
  )
}
