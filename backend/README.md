## Backend - Fabiebsky API

Node modules dan .env **tidak pernah di-commit ke git**.

### Cara Setup
1. Install dependencies: `npm install`
2. Isi file `.env` dengan URL database PostgreSQL Anda
3. Jalankan migrasi: `npm run db:migrate`
4. Seed admin user: `npm run db:seed`
5. Jalankan server: `npm run dev`

### Struktur

```
backend/
├── .env                  # Konfigurasi (jangan commit!)
├── prisma/
│   └── schema.prisma     # Database schema
├── src/
│   ├── index.ts          # Entry point Express server
│   ├── lib/
│   │   └── prisma.ts     # Prisma client singleton
│   ├── middleware/
│   │   └── auth.ts       # JWT auth middleware
│   ├── routes/
│   │   └── auth.ts       # Auth API routes
│   └── scripts/
│       └── seed.ts       # Database seeder
└── tsconfig.json
```

### Endpoints
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register user baru
- `GET /api/auth/me` - Data user (butuh JWT)
- `GET /api/health` - Health check
