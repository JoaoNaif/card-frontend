# Contexto do Projeto: Duelos 4x4 — Frontend

Frontend do sistema de batalhas estratégicas 4v4. Consome a API do projeto irmão `card-backend` (Express + Prisma + PostgreSQL). Serve como aprendizado e portfólio — priorize código simples e legível sobre abstrações prematuras.

---

## Stack

- **Build tool**: Vite
- **Framework**: React + TypeScript
- **Rotas**: react-router-dom
- **Data fetching / cache**: @tanstack/react-query
- **Estilo**: a definir (CSS puro/Tailwind/CSS Modules — escolher ao iniciar a primeira tela)

---

## Backend (API)

- Repositório irmão: `card-backend`, rodando em `http://localhost:3000` (configurável via `VITE_API_URL`)
- **Auth**: cookie httpOnly (`token`), setado pelo backend em `POST /users/authenticate`. Toda requisição autenticada precisa de `credentials: 'include'` no fetch — não há Authorization header, é cookie de sessão.
- **CORS**: o backend só aceita a origin definida em `CORS_ORIGIN` (default `http://localhost:5173`, o padrão do Vite). Se mudar a porta do front, avisar para ajustar o backend também.

### Endpoints principais para a Fase 6A (Auto Battle — foco atual)

| Método | Rota                      | Auth | Descrição                                                                                                                                                                              |
| ------ | ------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/users`                  | não  | cria conta                                                                                                                                                                             |
| POST   | `/users/authenticate`     | não  | login, seta cookie                                                                                                                                                                     |
| GET    | `/users/me`               | sim  | dados do usuário logado                                                                                                                                                                |
| GET    | `/characters/roster-user` | sim  | roster (até 8 personagens) do usuário logado                                                                                                                                           |
| GET    | `/battle-field`           | não  | lista campos de batalha disponíveis                                                                                                                                                    |
| POST   | `/battle/auto`            | não  | roda uma auto battle: `{ team1: {members: [{characterId, positionRow, positionCol}]}, team2: {...}, battleFieldId?, maxTurns? }` → retorna `{ battleId, winnerTeam, totalTurns, log }` |

Outras rotas existem para administração de dados (`/powers`, `/skills`, `/traits`, `/power-awakening`, `/character-skills`, `/battle-field` CRUD) — não são o foco da UI de jogador, mas podem virar uma tela de admin no futuro.

### Usuário de demonstração (via seed do backend)

- Login: `demo@duelos.com` / `demo1234`
- Já vem com 8 personagens no roster, cobrindo os 5 pilares de poder, e um battle field ("Vulcão Ativo") com modificadores de trait — suficiente para montar dois times 4v4 e rodar auto battles reais.

---

## Domínio do Jogo (resumo — ver detalhes no `CLAUDE.md` do backend se precisar)

- **Ranking** define só o nível máximo do personagem (Discreto=20 → Caótico=100), não a força atual.
- **Pilar** do poder define qual stat as skills daquele poder consomem como debuff (Material→HP, Vetorial→ATK, Biológica→SPD, Psíquica→DEF, Fundamental→qualquer).
- Skills não "custam" nada — usar uma impõe um debuff temporário no próprio personagem (`debuffStat`/`debuffValue`/`debuffDuration`).
- Personagem pode ter até 2 poderes (dual power); isso deixa os debuffs de skill 1.25× mais caros.
- Campo de batalha aplica bônus/malus de stat baseado nas **traits** do personagem (`BattleFieldModifier`).
- O log de uma auto battle é uma lista de turnos, cada um com uma lista de ações (`actorId`, `skillId`, `targetIds`, `damage?`, `heal?`, `selfDebuff?`, `effectApplied?`).

---

## Roadmap do Front

1. ⬜ Login (form + cookie) e tela "meu roster"
2. ⬜ Montar times (selecionar personagens do roster para team1/team2, posições numa grade)
3. ⬜ Escolher/mostrar battle field
4. ⬜ Rodar `POST /battle/auto` e exibir o resultado
5. ⬜ Player de log de turnos (avançar ação por ação, mostrar dano/cura/debuff aplicado)
6. ⬜ Fase 2 (futuro): tela de PvE quando o backend implementar `/battles/pve`

---

## Convenções

- Componentes em PascalCase (`TeamBuilder.tsx`), hooks com prefixo `use` (`useRoster.ts`)
- Chamadas à API centralizadas num client único (`src/lib/api.ts`) que já injeta `credentials: 'include'` e a `VITE_API_URL`
- Sem comentários explicando o óbvio — só quando houver uma decisão não óbvia (ex: por que um cálculo espelha uma fórmula específica do backend)

---

## Comandos

```bash
npm run dev       # servidor de desenvolvimento (porta 5173)
npm run build     # build de produção
npm run preview   # preview do build
```
