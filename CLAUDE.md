# ReleveFacile — CLAUDE.md

## Projet

SaaS de conversion de releves bancaires PDF en Excel/CSV, ciblant le marche francais.
Monorepo : Next.js (TypeScript) + FastAPI (Python).

## Architecture

```
Next.js (Vercel)  ──▶  FastAPI parser (Fly.io, Paris)
       │
       ▼
  Supabase (EU) — Auth + PostgreSQL
```

- **Frontend/API** : Next.js 16, TypeScript, Tailwind CSS 4, Vercel
- **Parser** : FastAPI, pdfplumber, Fly.io region cdg
- **DB/Auth** : Supabase (org trailnav, projet relevefacile)
- **Paiement** : Stripe Checkout + Customer Portal
- **Monitoring** : Sentry (org trailnav, projet relevefacile)

## Conventions

- Code en **anglais**, UI en **francais**
- TypeScript strict pour le frontend
- Python 3.11+ pour le parser
- Path alias : `@/*` → `./src/*`
- Pas de `localStorage` dans les composants server
- Exports dans `src/lib/export/` (CSV, Excel, OFX) — cote Next.js, pas Python
- Parser Python = stateless, PDF in → JSON out, aucune donnee stockee

## Commandes

### Frontend (racine)
```bash
npm run dev          # Dev server localhost:3000
npm run build        # Build production
npm run check        # tsc + eslint + vitest
npm run test         # Vitest
npm run lint         # ESLint
npm run format       # Prettier
```

### Parser (dans parser/)
```bash
cd parser
python -m pytest -v          # Tests
uvicorn app.main:app --reload --port 8000  # Dev server
```

### Docker
```bash
docker-compose up parser     # Lance le parser en dev
```

## Structure cle

```
src/app/(marketing)/banques/[bankSlug]/  # Pages SEO par banque (SSG)
src/app/(app)/convertir/                 # Page de conversion (auth required)
src/app/api/convert/                     # API de conversion
src/lib/export/                          # Generateurs CSV/Excel/OFX
src/data/banks.ts                        # Registry des banques FR
parser/app/parsers/                      # Parsers par banque
parser/app/parsers/base.py               # Classe abstraite BankParser
```

## Regles

1. **Ne jamais stocker de donnees bancaires** — RGPD. Seules les metadonnees sont en DB.
2. **PDFs supprimes immediatement** apres extraction en memoire.
3. **Un parser par banque** — classe heritant de `BankParser`, enregistree dans `registry.py`.
4. **Tests obligatoires** pour chaque nouveau parser (PDFs synthetiques).
5. **Git identity** : `trailnavapp@gmail.com` / `TrailNav` (requis pour Vercel).

## Plans tarifaires

| Plan | Prix | Conversions | Formats | Watermark |
|------|------|-------------|---------|-----------|
| Gratuit | 0 | 3/mois | CSV | Oui |
| Pro | 9,90/mois | Illimite | CSV+Excel+OFX | Non |
| Cabinet | 29/mois | Illimite | Tout + API + batch | Non |
