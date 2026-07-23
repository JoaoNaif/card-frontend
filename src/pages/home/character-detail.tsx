import { useParams } from 'react-router-dom'
import { ArrowBack } from '../../components/arrow-back'
import { useQuery } from '@tanstack/react-query'
import { getCharacter } from '../../api/character/get-character'
import { PendingSkill } from '../../components/character-detail/pending-skill'

export function CharacterDetail() {
  const { characterId } = useParams<{ characterId: string }>()

  const { data: character } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => getCharacter({ characterId: characterId! }),
    enabled: Boolean(characterId),
  })

  if (!character) {
    return <p>Personagem não encontrado!</p>
  }

  return (
    <section className="mt-8">
      <ArrowBack link="/roster" text="Voltar ao roster" />

      {character.pendingSkillSelections > 0 && (
        <PendingSkill
          characterid={character.id}
          activeSkills={character.skills}
          characterInfos={{
            atk: character.atk,
            def: character.def,
            spd: character.spd,
            hp: character.hp,
            name: character.name,
            characterId: character.id,
          }}
        />
      )}

      <p>{character.name}</p>
    </section>
  )
}
