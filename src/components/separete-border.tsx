export function SeparateBorder() {
  return (
    <div className="relative w-full h-px mt-7 bg-border-default ">
      <div className="absolute top-1/2 left-1/2 rotate-45 transform -translate-x-1/2 -translate-y-1/2 border-8 border-bg-1">
        <div className=" w-4 h-4 border border-[#FBBC05] flex items-center justify-center">
          <div className="w-3 h-3 border border-[#FBBC05] flex items-center justify-center">
            <div className="w-2 h-2 border border-[#FBBC05] flex items-center justify-center">
              <div className="h-1 w-1 border border-[#FBBC05]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
