import { useQuery } from '@tanstack/react-query'
import { HeaderRoster } from './header-roster'
import { fetchCharacterRoster } from '../../../api/character/fetch-character-roster'
import { CardRosterChracter } from './card-roster-character'

export function Roster() {
  const { data: characters } = useQuery({
    queryKey: ['roster'],
    queryFn: () => fetchCharacterRoster(),
  })

  if (!characters) return <p>Sem personagens vinculados</p>

  return (
    <div className="lg:mr-10">
      <HeaderRoster characterLength={characters.length} />

      <section className="grid lg:grid-cols-4 grid-cols-1 gap-5">
        {characters.map((character) => (
          <CardRosterChracter character={character} key={character.id} />
        ))}
      </section>
    </div>
  )
}
