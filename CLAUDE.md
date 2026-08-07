@AGENTS.md

## Commands

- Dev: yarn dev
- Build: yarn build
- Start: yarn start
- Lint + fix: yarn link:fix
- Typecheck: yarn tsc --noEmit

## Architecture

- src/app -> website pages
- src/component -> reusable components
- src/contexts -> useful contexts
- src/hooks -> useful custom hooks
- src/lib -> helper classes and loaders
- src/sanity -> cms files
- styles -> scss style files
- src/types -> project types
- src/utils -> useful functions

## Rules

- Never create worktrees unless i ask for
- NEVER commit .env files or secrets under any circumstances
- All async calls must use try/catch with typed error handling
- Use functional components only. No class components
- Run typecheck after every code change
