import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ClipboardList,
  Crosshair,
  Grid2X2,
  Maximize,
  SquareArrowRightExit,
  SquarePlus,
  Swords,
  UserRound,
} from 'lucide-react'
import { AccountSideBar } from './account-side-bar'
import { LogoIcon } from './icons/logo-icon'
import { LinkSideBar } from './link-side-bar'
import { SeparateBorder } from './separete-border'
import { useState } from 'react'

export function SideBar() {
  const [expand, setExpand] = useState<boolean>(true)

  return (
    <aside
      className={`flex lg:flex-col flex-row justify-between items-start relative lg:h-screen ${expand ? 'lg:w-60 w-full  h-87.5' : 'lg:w-15.75 h-14'} transition-all duration-500 ease-out bg-bg-1 lg:border-r border-t lg:border-t-0 border-border-default`}
    >
      <div className="flex flex-row lg:flex-col w-full border-border-default lg:border-none">
        <header className="flex items-center lg:flex-col flex-row">
          <div
            className={`flex items-center gap-3 lg:py-5 py-3 px-4 ${expand ? 'border-transparent' : 'border-border-default'} lg:border-none border-r w-full transition-all duration-1000 ease-in-out`}
          >
            <LogoIcon height={32} width={32} />
            {expand && (
              <h2 className="lg:block hidden text-[18px] uppercase leading-[150%] font-bold text-text-primary">
                Origin
              </h2>
            )}
          </div>
          <AccountSideBar expand={expand} />
          <div></div>
        </header>
        <nav
          className={`lg:flex ${expand ? 'block' : 'hidden'} flex-col w-full lg:static absolute top-14 left-0`}
        >
          <div className={`flex flex-col gap-2  ${expand ? 'items-start' : 'items-center'}`}>
            <span className="px-4 pt-5 uppercase text-[10px] font-semibold leading-[150%] text-text-disabled">
              Jogo
            </span>
            <ul className="lg:flex lg:flex-col grid grid-cols-2 items-center w-full">
              <LinkSideBar expand={expand} icon={Grid2X2} text="Meu Roster" link="/roster" />
              <LinkSideBar
                expand={expand}
                icon={Maximize}
                text="Montar Time"
                link="/team-builder"
              />
              <LinkSideBar
                expand={expand}
                icon={SquarePlus}
                text="Personagens"
                link="/characters"
              />
              <LinkSideBar
                expand={expand}
                icon={Crosshair}
                text="Escolher Oponente"
                link="/opponent"
              />
              <LinkSideBar expand={expand} icon={Swords} text="Batalha" link="/battle" />
              <LinkSideBar expand={expand} icon={ClipboardList} text="Histórico" link="/history" />
            </ul>
          </div>

          <div className={`${expand ? 'px-2' : 'px-0'} hidden lg:block`}>
            <SeparateBorder />
          </div>

          <div className={`flex flex-col gap-2 ${expand ? 'items-start' : 'items-center'}`}>
            <span className="px-4 pt-5 uppercase text-[10px] font-semibold leading-[150%] text-text-disabled">
              Conta
            </span>
            <ul className="flex lg:flex-col flex-row items-center w-full">
              <LinkSideBar expand={expand} icon={UserRound} text="Minha conta" link="/account" />
              <LinkSideBar
                expand={expand}
                icon={SquareArrowRightExit}
                text="Sair"
                link="/sign-in"
              />
            </ul>
          </div>
        </nav>
      </div>
      <button
        onClick={() => setExpand(!expand)}
        className="px-4 py-3 group cursor-pointer lg:border-t border-border-default flex justify-center items-center lg:w-full h-14 lg:h-auto"
      >
        {expand ? (
          <>
            <ChevronLeft
              size={20}
              className="text-text-tertiary group-hover:text-text-secondary lg:block hidden"
            />

            <ChevronDown
              size={20}
              className="text-text-tertiary group-hover:text-text-secondary lg:hidden"
            />
          </>
        ) : (
          <>
            <ChevronRight
              size={20}
              className="text-text-tertiary group-hover:text-text-secondary lg:block hidden"
            />
            <ChevronUp
              size={20}
              className="text-text-tertiary group-hover:text-text-secondary lg:hidden"
            />
          </>
        )}
      </button>
    </aside>
  )
}
