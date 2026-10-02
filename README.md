# Aplicacions web · SMX

Materials del mòdul **0228 Aplicacions web** del CFGM Sistemes Microinformàtics i Xarxes (CFPM IC10), 2n curs, Institut TIC de Barcelona, curs 2026-27.

**Web del curs:** https://zenidx.github.io/SMX-AplicacionsWeb/

## Estructura

| Carpeta | Contingut |
|---|---|
| `continguts/` | Les pàgines del curs en Markdown. **És la font**: la web les llegeix d'aquí |
| `web/` | La web (React + Vite + Tailwind), que renderitza `continguts/` |
| `docs/curriculum/` | Currículum oficial del cicle (Departament d'Educació, 24-4-2024) i extracte dels RA del mòdul |

## Editar un contingut

Edita el `.md` de `continguts/` i torna a desplegar. Per afegir una pàgina nova, crea el `.md` i registra'l a `web/src/continguts.js`.

Dins dels `.md`:
- Enllaços a altres pàgines: `[text](/bloc-1)`.
- Enllaços a una secció de la mateixa pàgina: `[text](#practica-1-2)`. L'id és el títol en minúscules, sense accents i amb guions.
- Diagrames: blocs de codi ` ```mermaid `.

## Desplegar

```bash
cd web
npm install
npm run deploy     # vite build + gh-pages -d dist
```
