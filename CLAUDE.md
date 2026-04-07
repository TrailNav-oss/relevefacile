# ReleveFacile — CLAUDE.md

@AGENTS.md

## Projet

**ReleveFacile** — SaaS de conversion de releves bancaires PDF francais en Excel/CSV.
Cible : comptables, freelances, TPE. Modele freemium. Acquisition par SEO programmatique (~50 pages banques).
Domaine prevu : `relevefacile.com`

Monorepo : **Next.js 16** (TypeScript, Tailwind CSS 4) + **FastAPI** (Python, pdfplumber).

---

## Architecture

```
 Navigateur
     │
     ▼
 Next.js 16 (Vercel, Paris)
 ├── Pages marketing / SEO (SSG)
 ├── Pages app (auth required)
 ├── API routes (/api/convert, /api/export, /api/stripe/*)
 │        │
 │        ▼
 │   FastAPI parser (Fly.io, Paris cdg)
 │   └── PDF → JSON (pdfplumber, stateless)
 │
 ├── Supabase (EU, eu-west-1)
 │   ├── Auth (email + Google OAuth)
 │   └── PostgreSQL (profiles, subscriptions, conversion_logs, api_keys)
 │
 └── Stripe (checkout, webhooks, portal)
```

### Services et identifiants

| Service | Detail |
|---------|--------|
| **GitHub** | `TrailNav-oss/relevefacile` — branche `master` |
| **Supabase** | Org `trailnav`, projet `relevefacile`, ID: `kojquwzzkuicwmsoapsm`, region `eu-west-1` |
| **Sentry** | Org `trailnav`, projet `relevefacile` (a creer dans le dashboard) |
| **Stripe** | A configurer (produits Pro + Cabinet) |
| **Vercel** | Auto-deploy depuis GitHub (a lier avec `npx vercel link`) |
| **Fly.io** | App `relevefacile-parser`, region `cdg` (Paris) |
| **Git identity** | `trailnavapp@gmail.com` / `TrailNav` — **obligatoire** pour Vercel Hobby |

### Secrets

Fichier `D:\Dev\_secrets\relevefacile.json` contient toutes les clefs. Ne jamais commit.
Le `.env` local a la racine contient les variables d'environnement (voir `.env.example`).

Variables requises :
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — deja remplies
- `SUPABASE_SERVICE_ROLE_KEY` — recuperer dans Supabase > Settings > API
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_PRO` / `STRIPE_PRICE_CABINET` — IDs Stripe des prix
- `PARSER_SERVICE_URL` — `http://localhost:8000` en dev, URL Fly.io en prod
- `PARSER_API_KEY` — cle partagee entre Next.js et le parser
- `NEXT_PUBLIC_SENTRY_DSN` / `SENTRY_AUTH_TOKEN`

---

## Conventions

- **Code en anglais** (variables, fonctions, commentaires techniques)
- **UI en francais** (tout ce que l'utilisateur voit)
- TypeScript strict, path alias `@/*` → `./src/*`
- Python 3.11+, pydantic v2 pour les modeles
- Prettier : semi, double quotes, tabWidth 2, printWidth 120
- ESLint flat config (`eslint.config.mjs`)
- Pas de `localStorage` dans les composants server
- Pas d'over-engineering : pas de Redis, pas de message queue, pas de microservices

---

## Commandes

```bash
# ── Frontend (racine du projet) ──────────────────────────
npm run dev              # Dev server → http://localhost:3000
npm run build            # Build production Next.js
npm run check            # tsc + eslint + vitest (validation complete)
npm run test             # Vitest uniquement
npm run lint             # ESLint uniquement
npm run format           # Prettier (ecriture)
npm run format:check     # Prettier (verification)

# ── Parser Python (dans parser/) ─────────────────────────
cd parser
uvicorn app.main:app --reload --port 8000   # Dev server
python -m pytest -v                          # Tests
cd ..

# ── Docker ────────────────────────────────────────────────
docker-compose up parser          # Parser en dev avec hot reload

# ── Deploiement ──────────────────────────────────────────
git push                          # Frontend → Vercel auto-deploy
cd parser && fly deploy           # Parser → Fly.io
```

---

## Structure du projet

```
relevefacile/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                          # Root layout (Header + Footer)
│   │   ├── page.tsx                            # Landing page (hero + upload zone + trust signals)
│   │   ├── sitemap.ts                          # Sitemap dynamique (toutes les banques)
│   │   ├── robots.ts
│   │   │
│   │   ├── (marketing)/                        # Pages publiques (pas d'auth)
│   │   │   ├── tarifs/page.tsx                 # Pricing 3 colonnes, connecte a Stripe checkout
│   │   │   ├── banques/page.tsx                # Index des banques compatibles
│   │   │   ├── banques/[bankSlug]/page.tsx     # Page SEO par banque (SSG, generateStaticParams)
│   │   │   ├── faq/page.tsx
│   │   │   ├── confidentialite/page.tsx        # RGPD
│   │   │   └── cgu/page.tsx
│   │   │
│   │   ├── (auth)/                             # Redirect vers /convertir si deja connecte
│   │   │   ├── connexion/page.tsx              # Login (email + Google OAuth)
│   │   │   └── inscription/page.tsx            # Register + email confirmation
│   │   │
│   │   ├── (app)/                              # Routes protegees (redirect /connexion si pas auth)
│   │   │   ├── convertir/page.tsx              # Page principale : upload → preview → download
│   │   │   ├── historique/page.tsx             # Historique des conversions (server component)
│   │   │   ├── compte/page.tsx                 # Profil + plan + gestion abonnement
│   │   │   ├── abonnement/                     # Placeholder
│   │   │   └── api-keys/                       # Placeholder (Cabinet plan)
│   │   │
│   │   ├── auth/callback/route.ts              # OAuth callback handler
│   │   │
│   │   └── api/
│   │       ├── convert/route.ts                # POST: auth → quota check → forward au parser Python → log metadata
│   │       ├── export/route.ts                 # POST: genere CSV ou Excel depuis les transactions JSON
│   │       └── stripe/
│   │           ├── checkout/route.ts           # POST: cree Stripe Checkout Session
│   │           ├── portal/route.ts             # POST: cree Stripe Customer Portal session
│   │           └── webhook/route.ts            # POST: Stripe webhooks (checkout.completed, sub.updated, sub.deleted)
│   │
│   ├── components/
│   │   ├── conversion/
│   │   │   ├── UploadZone.tsx                  # Drag-and-drop PDF, gere l'upload
│   │   │   ├── TransactionPreview.tsx          # Tableau de preview (gere maxRows + watermark free tier)
│   │   │   └── ExportOptions.tsx               # Boutons CSV/Excel/OFX selon le plan
│   │   └── layout/
│   │       ├── Header.tsx                      # Responsive, auth-aware (client component)
│   │       └── Footer.tsx                      # Liens nav + legal (server component)
│   │
│   ├── data/
│   │   └── banks.ts                            # Registry de 13 banques FR (slug, nom, BIC, SEO, FAQ)
│   │                                           # Utilise par SSG, sitemap, et detection
│   │
│   ├── lib/
│   │   ├── types.ts                            # Transaction, ParseResult, Bank, Plan, PLANS config
│   │   ├── config.ts                           # SITE_URL, PARSER_SERVICE_URL, PARSER_API_KEY
│   │   ├── parser-client.ts                    # Client HTTP vers le service Python (detectBank, parsePdf)
│   │   ├── supabase/
│   │   │   ├── client.ts                       # createBrowserClient (composants client)
│   │   │   ├── server.ts                       # createServerClient (server components, API routes)
│   │   │   └── middleware.ts                   # updateSession (gere cookies, protege les routes)
│   │   ├── stripe/
│   │   │   ├── client.ts                       # Instance Stripe SDK (server-side)
│   │   │   └── plans.ts                        # STRIPE_PRICES mapping, getPlanFromPriceId()
│   │   ├── export/
│   │   │   ├── csv.ts                          # generateCSV() — BOM UTF-8, separateur ;, virgule decimale
│   │   │   └── excel.ts                        # generateExcel() — ExcelJS, headers en gras, zebra, format EUR
│   │   └── __tests__/
│   │       └── csv.test.ts                     # 7 tests sur le format CSV francais
│   │
│   ├── middleware.ts                           # Entry point middleware (matcher excluant static + webhook)
│   │
│   └── styles/
│       └── globals.css                         # Tailwind 4 (@theme inline), couleurs brand-*
│
├── parser/                                     # Service Python FastAPI (stateless, PDF → JSON)
│   ├── app/
│   │   ├── main.py                             # FastAPI app, CORS, health check
│   │   ├── config.py                           # PARSER_API_KEY, ENVIRONMENT
│   │   ├── models.py                           # Pydantic: Transaction, ParseResult, DetectResult
│   │   ├── dependencies.py                     # verify_api_key (X-Api-Key header)
│   │   ├── routers/
│   │   │   ├── detect.py                       # POST /detect → bank detection
│   │   │   └── parse.py                        # POST /parse → transaction extraction
│   │   └── parsers/
│   │       ├── base.py                         # BankParser ABC + parse_french_amount()
│   │       ├── registry.py                     # _PARSERS dict, get_parser(), get_all_parsers()
│   │       ├── detector.py                     # detect_bank() — score chaque parser, seuil 0.4
│   │       ├── bnp_paribas.py                  # Parser BNP Paribas (le seul implemente)
│   │       └── generic.py                      # Fallback heuristique pour banques inconnues
│   ├── tests/
│   │   ├── conftest.py                         # TestClient fixture, api_headers
│   │   ├── test_health.py                      # Health + auth tests (3 tests)
│   │   └── test_parsers/
│   │       ├── test_amount_parsing.py          # 12 tests parse_french_amount()
│   │       └── test_detector.py                # 3 tests detection de banque
│   ├── Dockerfile                              # Python 3.12-slim
│   ├── fly.toml                                # Fly.io config (cdg, auto-stop)
│   ├── requirements.txt                        # fastapi, uvicorn, pdfplumber, python-multipart, pydantic
│   └── requirements-dev.txt                    # + pytest, httpx, reportlab
│
├── supabase/migrations/                        # 4 migrations SQL (deja appliquees)
│   ├── 001_initial_schema.sql                  # profiles + auto-create trigger + RLS
│   ├── 002_subscriptions.sql                   # subscriptions (Stripe sync) + RLS
│   ├── 003_conversion_logs.sql                 # conversion_logs (metadata ONLY, RGPD) + RLS
│   └── 004_api_keys.sql                        # api_keys (Cabinet plan) + RLS
│
├── .github/workflows/ci.yml                    # CI: tsc + eslint + vitest + pytest
├── docker-compose.yml                          # Service parser avec hot reload
├── .env.example                                # Toutes les variables d'environnement
├── sentry.client.config.ts                     # Sentry client (replays on error)
├── sentry.server.config.ts                     # Sentry server
└── sentry.edge.config.ts                       # Sentry edge
```

---

## Data flow : conversion PDF

```
1. User drop PDF sur UploadZone (src/components/conversion/UploadZone.tsx)
2. → POST /api/convert (src/app/api/convert/route.ts)
   a. Verifie auth (Supabase session)
   b. Verifie quota (free: 3/mois, pro/cabinet: illimite)
   c. Reset compteur mensuel si necessaire
   d. Forward le PDF au parser Python via parser-client.ts
3. → POST /parse sur le service Python (parser/app/routers/parse.py)
   a. Detecte la banque (detector.py → score patterns)
   b. Selectionne le parser (registry.py)
   c. Parse les pages pdfplumber → liste de Transaction
   d. Retourne ParseResult JSON
4. ← Next.js recoit le JSON, log les metadonnees (RGPD: aucune donnee bancaire stockee)
5. Affiche TransactionPreview (free: 10 lignes + watermark)
6. User clique "Telecharger CSV/Excel"
7. → POST /api/export (src/app/api/export/route.ts)
   a. Verifie le plan (CSV=free, Excel/OFX=pro+)
   b. Genere le fichier via csv.ts ou excel.ts
   c. Retourne le fichier en download
8. PDF supprime de la memoire — jamais ecrit sur disque
```

---

## Auth flow

Le middleware (`src/middleware.ts` → `src/lib/supabase/middleware.ts`) gere :
- `/(marketing)/*` → public, pas d'auth
- `/(auth)/*` (connexion, inscription) → redirect `/convertir` si deja connecte
- `/(app)/*` (convertir, historique, compte) → redirect `/connexion?redirect=<path>` si pas connecte
- `/api/stripe/webhook` → exclu du middleware (pas de cookie, signature Stripe)

Auth providers : email/password + Google OAuth (via Supabase Auth).
Callback OAuth : `/auth/callback/route.ts` — echange le code contre une session.

---

## Stripe flow

**Checkout :** Page tarifs → bouton "S'abonner" → `POST /api/stripe/checkout` → cree Stripe Checkout Session → redirect vers Stripe → retour sur `/convertir?upgraded=true`

**Webhook** (`/api/stripe/webhook/route.ts`) gere :
- `checkout.session.completed` → cree subscription en DB, update plan du profil
- `customer.subscription.updated` → sync status/plan/periode
- `customer.subscription.deleted` → repasse en plan free

**Portal :** Page compte → bouton "Gerer l'abonnement" → `POST /api/stripe/portal` → redirect vers Stripe Customer Portal

Le webhook utilise `SUPABASE_SERVICE_ROLE_KEY` (pas de session user) pour ecrire en DB.

---

## Parser Python : ajouter une banque

Pour ajouter un parser pour une nouvelle banque :

### 1. Creer le fichier parser

```python
# parser/app/parsers/credit_agricole.py
from app.models import ParseResult, Transaction
from app.parsers.base import BankParser, parse_french_amount

class CreditAgricoleParser(BankParser):
    slug = "credit-agricole"
    name = "Credit Agricole"
    detection_patterns = [
        r"CREDIT\s*AGRICOLE",
        r"CAISSES?\s+REGIONALE",
        r"www\.credit-agricole",
    ]

    def parse(self, pages: list) -> ParseResult:
        transactions = []
        # ... extraction specifique au format CA
        return ParseResult(
            bank_slug=self.slug,
            bank_name=self.name,
            confidence=0.0,
            transactions=transactions,
            page_count=0,
            transaction_count=0,
        )
```

### 2. Enregistrer dans le registry

```python
# parser/app/parsers/registry.py
from app.parsers.credit_agricole import CreditAgricoleParser

_PARSERS = {
    "bnp-paribas": BNPParibasParser,
    "credit-agricole": CreditAgricoleParser,  # ← ajouter ici
    "generic": GenericParser,
}
```

### 3. Ajouter les tests

Creer `parser/tests/test_parsers/test_credit_agricole.py` avec des PDFs synthetiques ou du texte fixture.

### 4. Verifier que la banque existe dans banks.ts

Le slug doit correspondre a une entree dans `src/data/banks.ts` (deja fait pour les 13 banques principales).

### Utilitaire cle : `parse_french_amount()`

Fonction dans `base.py` qui gere tous les formats francais :
- `"1 234,56"` → `1234.56` (espace insecable comme separateur de milliers)
- `"-45,67"` ou `"45,67-"` → `-45.67` (signe negatif en debut ou fin)
- `"1.234,56"` → `1234.56` (point comme separateur de milliers)

---

## Base de donnees (Supabase PostgreSQL)

4 tables, toutes avec RLS active :

| Table | Contenu | RLS |
|-------|---------|-----|
| `profiles` | Extension auth.users : plan, conversions_this_month, stripe_customer_id | Read/Update own |
| `subscriptions` | Sync Stripe : subscription_id, plan, status, periode | Read own |
| `conversion_logs` | **Metadonnees UNIQUEMENT** : bank_slug, page_count, tx_count, format, timing | Read/Insert own |
| `api_keys` | Cabinet plan : key_hash (SHA-256), key_prefix, revoked_at | All own |

**RGPD critique :** `conversion_logs` ne contient **JAMAIS** de donnees bancaires (pas de montants, pas de libelles, pas de numeros de compte). Seulement des metadonnees.

Trigger `on_auth_user_created` → auto-cree un `profiles` a l'inscription.

---

## Plans tarifaires

Definis dans `src/lib/types.ts` (constante `PLANS`) :

| Plan | Prix | Conversions/mois | Preview | Formats | Watermark | Batch | API |
|------|------|-----------------|---------|---------|-----------|-------|-----|
| **Gratuit** | 0 | 3 | 10 lignes | CSV | Oui | Non | Non |
| **Pro** | 9,90 EUR | Illimite | Tout | CSV+Excel+OFX | Non | Non | Non |
| **Cabinet** | 29 EUR | Illimite | Tout | Tout | Non | Oui | Oui |

La logique de gating est dans :
- `/api/convert/route.ts` : quota mensuel (free)
- `/api/export/route.ts` : formats disponibles selon le plan
- `TransactionPreview.tsx` : maxRows + watermark
- `ExportOptions.tsx` : boutons disabled si format pas dans le plan

---

## Tests

```bash
# Frontend — 7 tests
npx vitest run
# Teste: BOM, separateur ;, dates DD/MM/YYYY, virgule decimale, escape CSV, watermark, CRLF

# Parser Python — 75 tests
cd parser && python -m pytest -v
# Teste: 10 banques (detection + parsing), parse_french_amount, health + auth

# Validation complete
npm run check   # tsc + eslint + vitest
```

---

## Mode demo / test

### PDF de demo
Un releve BNP synthetique est disponible dans `public/demo/releve-demo-bnp.pdf`.
Sur la page `/convertir`, un lien "Essayez avec un releve de demonstration" le charge automatiquement.

### Stripe test mode
Quand `STRIPE_SECRET_KEY` commence par `sk_test_`, un bandeau jaune s'affiche en haut du site :
"Mode test — les paiements ne sont pas reels."
Carte de test : `4242 4242 4242 4242`, date future, CVC quelconque.

### Bypass quota (DEMO_MODE)
Mettre `DEMO_MODE=true` dans les env vars pour desactiver la limite de 3 conversions/mois du plan gratuit.
Utile pour tester le flow en boucle sans se retrouver bloque.

### Compte de test (seed user)
Creer un compte test via le dashboard Supabase :

1. Aller dans Supabase Dashboard > Authentication > Users > Add User
2. Email : `test@relevefacile.com`, mot de passe : `test1234!`
3. Cocher "Auto Confirm User" (pas besoin de verifier l'email)
4. Le trigger `on_auth_user_created` cree automatiquement un profil (plan `free`)
5. Pour tester le plan Pro, modifier le profil dans la table `profiles` :
   ```sql
   UPDATE profiles SET plan = 'pro' WHERE email = 'test@relevefacile.com';
   ```

---

## Etat actuel et TODO

### Fait
- [x] Scaffold complet (Next.js + FastAPI)
- [x] 13 pages SEO banques (SSG)
- [x] Auth Supabase (email + Google)
- [x] Flow de conversion (upload → parse → preview → download)
- [x] Export CSV format francais (BOM, ;, virgule decimale)
- [x] Export Excel (ExcelJS, format EUR, zebra)
- [x] Stripe checkout + webhooks + portal
- [x] Plan gating (quotas, formats, watermark)
- [x] Header/Footer responsive
- [x] Page historique
- [x] Page compte
- [x] CI GitHub Actions
- [x] 82 tests (7 Vitest + 75 pytest)
- [x] Supabase projet cree + 4 migrations appliquees
- [x] Sentry 3-file config
- [x] 10 parsers bancaires (BNP, CA, SG, CE, CM, CIC, LBP, LCL, Boursorama, BP)
- [x] Script generate_test_pdfs.py (reportlab) — 10 PDFs synthetiques
- [x] Deploiement Vercel (relevefacile.vercel.app)
- [x] Services externes configures (Supabase, Stripe, Sentry, Fly.io)
- [x] OG image dynamique + meta tags complets + Twitter card
- [x] Pages 404 et 500 en francais
- [x] Plausible Analytics (cookieless)
- [x] Mode demo/test (PDF demo, banner Stripe test, bypass quota, seed user doc)
- [x] Fix snake_case/camelCase entre parser Python et frontend TS

### A faire — post-launch
- [ ] Parsers supplementaires : Fortuneo, Hello Bank
- [ ] Export OFX (XML template pour logiciels comptables)
- [ ] Page /abonnement (redirect vers Stripe portal)
- [ ] Page /api-keys (generation et gestion de cles API pour plan Cabinet)
- [ ] API publique /api/v1/convert (authentification par API key)
- [ ] Batch upload multi-fichiers (plan Cabinet)
- [ ] Enrichir les FAQ des pages SEO banques
- [ ] JSON-LD structuredData sur les pages banques et FAQ
- [ ] OG images dynamiques par banque

### A faire — polish
- [ ] Ajouter les logos SVG des banques dans public/banks/
- [ ] Ameliorer les parsers avec de vrais PDFs (les parsers actuels sont bases sur des heuristiques)
- [ ] Responsive mobile de la page /convertir (le tableau TransactionPreview)
- [ ] Animations de chargement / transitions
- [ ] Google Search Console verification
- [ ] Acheter le domaine `relevefacile.com`

---

## Regles strictes

1. **RGPD** : ne jamais stocker de donnees bancaires en DB. Les PDFs n'existent qu'en memoire pendant le traitement.
2. **Git identity** : toujours `trailnavapp@gmail.com` / `TrailNav`. Vercel Hobby refuse les commits d'un autre email.
3. **Validation avant commit** : `npm run check` doit passer (tsc + eslint + vitest).
4. **Tests parser** : tout nouveau parser doit avoir ses tests dans `parser/tests/test_parsers/`.
5. **Registry** : tout nouveau parser doit etre enregistre dans `parser/app/parsers/registry.py`.
6. **banks.ts** : tout nouveau parser doit avoir une entree dans `src/data/banks.ts` pour le SSG.
7. **Pas de secrets en dur** : utiliser les variables d'environnement via `.env`.
