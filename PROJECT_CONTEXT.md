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
8. **Match Hub — Sistema de Partidos Compartidos**
   - Al reservar, se crea un "Partido" con link compartible (supartido.cl/match/abc123)
   - Jugadores entran al link, eligen equipo (A/B) y posición (GK/DEF/MID/FWD)
   - Vista en tiempo real: quién va, cuántos faltan, posiciones ocupadas
   - Post-partido: organizador registra resultado
   - Stats automáticas por jugador: partidos, wins, losses, draws, winRate, posición principal, racha
9. Perfil público de jugador con estadísticas y historial
10. Pagos online (Flow.cl sandbox)
11. Panel dueño: reservas, ingresos, gestión
12. Notificaciones email (confirmación de reserva + invitación a partido)

## Funcionalidades Fase 2 (post-MVP)
- Rating entre jugadores (valoración post-partido)
- Matchmaking (buscar jugadores por posición/nivel para completar equipo)
- Ligas y torneos
- App móvil (React Native / Capacitor)
- WhatsApp notifications
- Leaderboard por zona (Iquique, Alto Hospicio)

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

## Modelo de Datos — Match Hub

### Match (Partido)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | PK |
| bookingId | UUID | FK → Booking (la reserva que originó el partido) |
| shareCode | string(8) | Código único para link compartible (nanoid) |
| format | enum | 5V5, 6V6, 7V7, 11V11 |
| maxPlayers | int | Calculado: format × 2 (10, 12, 14, 22) |
| status | enum | OPEN, FULL, IN_PROGRESS, FINISHED, CANCELLED |
| scoreTeamA | int | Goles equipo A (null hasta que termine) |
| scoreTeamB | int | Goles equipo B |
| organizerId | UUID | FK → User (quien reservó) |
| notes | text | Notas del organizador ("traer pecheras", etc.) |
| createdAt | timestamp | |
| updatedAt | timestamp | |

**Regla:** El organizador puede cambiar el formato después de crear el partido (ej: de 7v7 a 6v6). Si hay más jugadores inscritos que el nuevo máximo, se notifica y los últimos en unirse quedan en "suplentes".

### MatchFormation (Formación por formato)
Configuración de slots por formato — define cuántas posiciones de cada tipo hay.

| Formato | GK | DEF | MID | FWD | Total por equipo |
|---------|----|----|-----|-----|-----------------|
| 5v5 | 1 | 1 | 2 | 1 | 5 |
| 6v6 | 1 | 2 | 2 | 1 | 6 |
| 7v7 | 1 | 2 | 2 | 2 | 7 |
| 11v11 | 1 | 4 | 3 | 3 | 11 |

Estas formaciones se usan para renderizar la **cancha interactiva** con los slots correctos.

### MatchPlayer (Inscripción a Partido)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | PK |
| matchId | UUID | FK → Match |
| userId | UUID | FK → User |
| team | enum | TEAM_A, TEAM_B |
| position | enum | GK, DEF, MID, FWD |
| slotIndex | int | Índice del slot (ej: DEF-1, DEF-2 en 7v7) |
| confirmed | boolean | Si confirmó asistencia |
| joinedAt | timestamp | Cuando se inscribió |

**Constraint:** UNIQUE(matchId, team, position, slotIndex) — no dos jugadores en el mismo slot.

### PlayerStats (Estadísticas Acumuladas)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| userId | UUID | PK, FK → User |
| matchesPlayed | int | Total partidos jugados |
| wins | int | Partidos ganados |
| losses | int | Partidos perdidos |
| draws | int | Empates |
| winRate | decimal | % de victorias |
| preferredPosition | enum | Posición más jugada (calculada) |
| positionBreakdown | jsonb | { GK: 2, DEF: 5, MID: 12, FWD: 3 } |
| favoriteCourtId | UUID | Cancha donde más juega |
| currentStreak | int | Racha actual (+3 = 3 wins, -2 = 2 losses) |
| longestWinStreak | int | Mejor racha histórica |

## UX — Cancha Interactiva (Componente Core)
La página /match/[shareCode] muestra una cancha de fútbol visual (SVG/Canvas) vista desde arriba:
- Fondo verde con líneas blancas (como la imagen de referencia: cancha con franjas verdes, arcos, círculo central)
- Equipo A a la izquierda, Equipo B a la derecha
- Slots de posición renderizados como círculos sobre la cancha según la formación del formato
- **Slot vacío:** Círculo punteado gris con icono "+" — clickeable para unirse
- **Slot ocupado:** Avatar circular del jugador (foto de perfil) + nombre debajo en texto pequeño
- **Organizador:** Badge especial (corona/estrella) en su avatar
- Header: nombre cancha, fecha/hora, formato (con selector si eres organizador), contador "X/Y jugadores"
- Footer: botón "Compartir Link" (copy + WhatsApp share) + "Editar Partido" (solo organizador)
- **Responsive:** En mobile la cancha se muestra vertical (rotada 90°), en desktop horizontal
- **Tiempo real:** Supabase Realtime para ver jugadores unirse sin refresh

## Sprints
- Sprint 0: Setup monorepo + scaffolds
- Sprint 1: Auth + Landing page
- Sprint 2: Canchas CRUD + Catálogo
- Sprint 3: Reservas + Calendario
- Sprint 4: Match Hub (partidos compartidos + stats)
- Sprint 5: Pagos + Comisiones
- Sprint 6: Polish + Deploy Vercel
