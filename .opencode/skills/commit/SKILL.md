---
name: commit
description: commit, commits, hacer commit, conventional commit, pnpm commit. Use ONLY when the user asks you to commit or says "commit".
---

# Commit Skill

Este proyecto usa **Commitizen** con conventional commits para estandarizar los mensajes de commit.

## Cómo hacer un commit

1. Primero, asegúrate de que los cambios están staged. Si el usuario no ha especificado qué incluir, usa:

   ```bash
   git add -A
   ```

   (a menos que el usuario pida algo específico).

2. Revisa `git status` y `git diff --cached` para confirmar los cambios.

3. Antes de ejecutar el commit, muestra al usuario el mensaje propuesto y pide su aprobación explícita. El mensaje debe seguir el formato `tipo(ámbito): descripción` (ej: `feat(hero): añadir animación de entrada`).

4. Una vez aprobado, ejecuta el comando interactivo:

   ```bash
   pnpm commit
   ```

   Esto lanzará Commitizen, que guiará paso a paso para crear un mensaje con formato conventional commit.

5. Si `pnpm commit` falla (por ejemplo, si no hay Commitizen instalado o el comando no existe), usa directamente:
   ```bash
   git commit -m "tipo(ámbito): mensaje"
   ```
   Siguiendo el formato: `tipo(ámbito): descripción` donde tipo puede ser `feat`, `fix`, `refactor`, `docs`, `chore`, `style`, `perf`, `test`, `ci`, `build`.

## Notas

- No hagas `git commit` directo a menos que `pnpm commit` no esté disponible.
- lint-staged se ejecuta automáticamente en pre-commit (ESLint + Prettier), así que no hace falta ejecutarlos manualmente antes.
- Confirma siempre con el usuario antes de hacer el commit.
