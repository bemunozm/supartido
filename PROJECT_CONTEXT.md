# SuPartido — Plataforma de Reserva de Canchas de Fútbol

## Visión
Plataforma web (PWA) para reservar canchas de fútbol sintético en Iquique y Alto Hospicio, Chile.
Modelo de negocio: comisión por cada reserva (5-10% del arriendo).

## Contexto de Negocio
- **Cliente/Owner:** Alexander Stik (socio EVONOVA)
- **Mercado objetivo:** Canchas sintéticas de fútbol en Iquique y Alto Hospicio
- **Competidores:** QuieroCancha (Santiago), EasyCancha (clubes grandes), AlquilaTuCancha (Argentina)
- **Gap:** Ninguno tiene presencia real en el norte de Chile. Reservas actuales = WhatsApp/llamada.
- **Nombre:** SuPartido
- **Dominio:** Pendiente. Deploy inicial en Vercel.

## Stack Técnico
| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 15 (App Router) + Tailwind CSS + shadcn/ui |
| Backend | NestJS + TypeORM + PostgreSQL |
| Auth/DB/Storage | Supabase |
| Pagos | Flow.cl (sandbox para MVP) |
| Maps | Google Maps API / Leaflet |
| Realtime | Supabase Realtime (notificaciones) |
| Deploy | Vercel (frontend) + VPS/Railway (backend) |

## Diseño Visual
- **Referencia:** Estilo EVONOVA / GeoCampus — moderno, limpio, profesional
- **Paleta primaria:** Verde fútbol (#22C55E) + Negro (#0F172A) + Blanco
- **Paleta secundaria:** Azul EVONOVA (#3B4BF9) como acento
- **Tipografía:** Inter (body) + Sora o Outfit (headings)
- **Estilo:** Bordes redondeados, sombras suaves, glassmorphism sutil, gradientes verdes
- **NO copiar Padelero** — identidad propia tipo EVONOVA

## Funcionalidades MVP (Fase 1)
1. Landing page pública con catálogo de canchas
2. Registro/Login (Supabase Auth: email + Google)
3. Roles: Jugador / Dueño de cancha / Admin
4. CRUD canchas (panel dueño): fotos, ubicación, tipo (5/7/11), precio/hora, horarios
5. Catálogo público con filtros, búsqueda y mapa
6. Calendario de disponibilidad por cancha
7. Flujo de reserva completo (seleccionar → confirmar → pagar)
8. Pagos online (Flow.cl sandbox)
9. Panel dueño: reservas, ingresos, gestión
10. Notificaciones email (confirmación de reserva)

## Funcionalidades Fase 2 (post-MVP)
- Armar partidos (buscar jugadores)
- Rating de canchas y jugadores
- Historial y estadísticas
- App móvil (React Native / Capacitor)
- WhatsApp notifications

## Estructura del Monorepo
```
supartido/
├── apps/
│   ├── web/          # Next.js 15 frontend
│   └── api/          # NestJS backend
├── packages/
│   └── shared/       # Types, utils compartidos
├── turbo.json
├── package.json
└── PROJECT_CONTEXT.md
```

## Sprints
- Sprint 0: Setup monorepo + scaffolds
- Sprint 1: Auth + Landing page
- Sprint 2: Canchas CRUD + Catálogo
- Sprint 3: Reservas + Calendario
- Sprint 4: Pagos + Comisiones
- Sprint 5: Polish + Deploy Vercel
