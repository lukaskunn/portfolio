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

## Code style

### SCSS
- CSS Modules only: `Foo.module.scss`, one per component
- Component styles in src/styles/components/, page styles in src/styles/<page>/
- Nest the classes to mirror the markup — never flat selector lists

### Components
- Flat files: src/components/Foo.tsx, PascalCase, one component per file
- Reusable stateful logic goes to src/hooks; one-off local state stays in the component
- No inline logic in JSX — compute above the return
- Props typed with an exported `FooProps` interface



## Rules

- Never create worktrees unless i ask for
- NEVER commit .env files or secrets under any circumstances
- All async calls must use try/catch with typed error handling
- Use functional components only. No class components
- Run typecheck after every code change
- This project is desktop first, ever use the desktop layout as source of truth. Fonts, colors, etc
- Never add ponytail comments. If necessary, only add a small comment
