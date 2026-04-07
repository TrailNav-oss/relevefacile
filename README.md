# ReleveFacile

Convertissez vos releves bancaires PDF en Excel et CSV en quelques secondes. Compatible avec toutes les banques francaises.

## Architecture

- **Frontend** : Next.js 16 (TypeScript) + Tailwind CSS — deploye sur Vercel
- **Parser** : FastAPI (Python) + pdfplumber — deploye sur Fly.io (Paris)
- **Database** : Supabase (PostgreSQL + Auth)
- **Paiement** : Stripe

## Developpement

```bash
# Frontend
npm install
npm run dev

# Parser (dans un autre terminal)
cd parser
pip install -r requirements-dev.txt
uvicorn app.main:app --reload --port 8000

# Ou avec Docker
docker-compose up parser
```

## Tests

```bash
# Frontend
npm run check    # tsc + eslint + vitest

# Parser
cd parser && python -m pytest -v
```

## Deploiement

- Frontend : push sur `master` → auto-deploy Vercel
- Parser : `cd parser && fly deploy`
