# 🥁 DrumFlow – App para Bateristas

**Aplicación profesional para estudiar, aprender y tocar en vivo canciones nuevas**, integrando:

- ⏱️ Metrónomo avanzado sincronizado
- 🎵 Gestión de partes de canciones (Intro, Estrofa, Puente, Estribillo, Solo, Outro)
- 📝 Letras sincronizadas con el tiempo
- 🎼 Partituras / patrones rítmicos visuales
- 🎭 Modo Live optimizado para escenario
- 🤖 IA para transcripción automática de batería (opcional)

---

## 📋 Tabla de Contenidos

1. [Tecnologías](#-tecnologías)
2. [Arquitectura del Monorepo](#-arquitectura-del-monorepo)
3. [Requisitos Previos](#-requisitos-previos)
4. [Instalación](#-instalación)
5. [Comandos Principales](#-comandos-principales)
6. [Estructura del Proyecto](#-estructura-del-proyecto)
7. [Puertos y URLs](#-puertos-y-urls)
8. [Módulos de la Aplicación](#-módulos-de-la-aplicación)
9. [Base de Datos](#-base-de-datos)
10. [API Endpoints](#-api-endpoints)
11. [Roadmap](#-roadmap)

---

## 🛠 Tecnologías

### **Core del Monorepo**

| Tecnología      | Versión | Propósito                                             |
| --------------- | ------- | ----------------------------------------------------- |
| **pnpm**        | 10.5.1  | Gestor de paquetes rápido y eficiente para monorepos  |
| **Turborepo**   | 2.6.1   | Orquestación de builds y tareas con caché inteligente |
| **TypeScript**  | 5.7.3   | Type safety en todo el proyecto                       |
| **Husky**       | 9.1.7   | Git hooks para quality gates                          |
| **Commitlint**  | 20.1.0  | Conventional Commits enforcement                      |
| **ESLint**      | 9.39.1  | Linting de código                                     |
| **Prettier**    | 3.4.2   | Formateo automático de código                         |
| **Lint-staged** | 16.2.7  | Pre-commit hooks optimizados                          |

---

### **Frontend (`apps/web`)**

| Tecnología          | Versión          | Propósito                                               |
| ------------------- | ---------------- | ------------------------------------------------------- |
| **React**           | 19.2.0           | Framework UI principal                                  |
| **Vite (Rolldown)** | 7.2.5            | Build tool ultra-rápido basado en Rust                  |
| **TypeScript**      | 5.9.3            | Type safety                                             |
| **Tailwind CSS**    | 3.4.17           | Utility-first CSS framework                             |
| **Zustand**         | 5.0.2            | Estado global ligero (timeline, reproductor, metrónomo) |
| **React Query**     | 5.62.14          | Server state management y caching                       |
| **Tone.js**         | 15.1.5           | Motor de audio para metrónomo y sincronización          |
| **VexFlow**         | _(por instalar)_ | Renderizado de partituras musicales                     |
| **Axios**           | _(por instalar)_ | Cliente HTTP para comunicación con el backend           |
| **Lucide React**    | _(opcional)_     | Iconos modernos                                         |

#### **¿Por qué estas tecnologías en el frontend?**

- **React 19**: Última versión con mejoras de performance y nuevas features (Server Components compatible).
- **Vite + Rolldown**: Build extremadamente rápido (~150ms), ideal para desarrollo ágil.
- **Zustand**: Más simple que Redux, perfecto para manejar estado complejo del reproductor de audio y timeline.
- **React Query**: Maneja caché de canciones, metadata, y sincronización con el backend de forma automática.
- **Tone.js**: Biblioteca profesional para Web Audio API, usada por Ableton Live y Splice. Permite:
  - Metrónomo preciso
  - Sincronización con BPM
  - Scheduling de eventos (cambios de sección)
  - Transport para control de reproducción
- **VexFlow**: Estándar de la industria para notación musical en web (usado por MuseScore, Flat.io).
- **Tailwind**: Desarrollo rápido de UI sin CSS custom, responsive por defecto.

---

### **Backend (`apps/backend`)**

| Tecnología         | Versión            | Propósito                                                 |
| ------------------ | ------------------ | --------------------------------------------------------- |
| **NestJS**         | 11.0.1             | Framework backend modular y escalable                     |
| **TypeScript**     | 5.7.3              | Type safety                                               |
| **Prisma**         | 7.0.0              | ORM type-safe para PostgreSQL                             |
| **Supabase**       | _(por configurar)_ | Base de datos PostgreSQL + Storage para archivos de audio |
| **@nestjs/config** | _(por instalar)_   | Variables de entorno                                      |
| **Multer**         | _(por instalar)_   | Upload de archivos de audio                               |
| **music-metadata** | _(por instalar)_   | Extracción de BPM y metadata de MP3/WAV                   |
| **Jest**           | 30.0.0             | Testing unitario y e2e                                    |

#### **¿Por qué estas tecnologías en el backend?**

- **NestJS**: Arquitectura modular, decoradores, inyección de dependencias. Ideal para APIs REST escalables.
- **Prisma**: Type-safe ORM, migraciones automáticas, perfecto para PostgreSQL.
- **Supabase**: PostgreSQL gestionado + Storage integrado para archivos grandes (audio). Alternativa open-source a Firebase.
- **music-metadata**: Biblioteca Node.js para leer metadata de archivos de audio (BPM, duración, artista, etc.).
- **Multer**: Manejo de uploads multipart/form-data, necesario para subir archivos MP3/WAV.

---

### **Packages Compartidos**

#### **`packages/types`**

- Tipos TypeScript compartidos entre frontend y backend
- Interfaces de canciones, secciones, partituras, usuarios
- **Ejemplo**: `DrumPattern`, `Song`, `SongSection`, `User`

#### **`packages/audio`**

- Utilidades de Tone.js reutilizables
- Funciones para crear samplers, loops, metrónomo
- **Ejemplo**: `createDrumSampler()`, `createMetronome()`

---

## 🏗 Arquitectura del Monorepo

```
drumflow/
├── apps/
│   ├── web/                 # Frontend React + Vite
│   │   ├── src/
│   │   │   ├── components/  # Componentes UI reutilizables
│   │   │   ├── features/    # Módulos por funcionalidad
│   │   │   │   ├── songs/   # Lista, viewer, importador
│   │   │   │   ├── editor/  # Editor de partituras
│   │   │   │   ├── player/  # Reproductor + metrónomo
│   │   │   │   └── live/    # Modo Live
│   │   │   ├── hooks/       # Custom hooks
│   │   │   ├── stores/      # Zustand stores
│   │   │   ├── services/    # React Query services
│   │   │   └── utils/       # Helpers (Tone.js)
│   │   └── package.json
│   │
│   └── backend/             # Backend NestJS
│       ├── src/
│       │   ├── songs/       # Módulo de canciones
│       │   ├── sections/    # Módulo de secciones
│       │   ├── sheets/      # Módulo de partituras
│       │   ├── auth/        # Autenticación (futuro)
│       │   ├── ai/          # Servicios de IA (futuro)
│       │   └── common/      # Guards, interceptors, filters
│       ├── prisma/
│       │   └── schema.prisma
│       └── package.json
│
├── packages/
│   ├── types/               # Tipos compartidos
│   │   └── src/index.ts
│   └── audio/               # Utilidades de Tone.js
│       └── src/index.ts
│
├── .husky/                  # Git hooks
├── pnpm-workspace.yaml      # Configuración del workspace
├── turbo.json               # Configuración de Turborepo
├── package.json             # Root package
└── README.md
```

---

## ✅ Requisitos Previos

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Git**

### Instalación de pnpm (si no lo tenés):

```bash
npm install -g pnpm
```

### Verificar versiones:

```bash
node -v   # Debe ser >= 18
pnpm -v   # Debe ser >= 8
```

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repo>
cd drumflow
```

### 2. Instalar todas las dependencias

```bash
pnpm install
```

Esto instalará dependencias en:

- Root
- `apps/web`
- `apps/backend`
- `packages/types`
- `packages/audio`

### 3. Configurar variables de entorno

#### Backend (`apps/backend/.env`):

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/drumflow?schema=public"
PORT=3000
```

_(Cuando configures Supabase, reemplazarás `DATABASE_URL` con la connection string de Supabase)_

### 4. Generar cliente de Prisma

```bash
cd apps/backend
npx prisma generate
cd ../..
```

### 5. Ejecutar migraciones (cuando tengas la DB lista)

```bash
cd apps/backend
npx prisma migrate dev --name init
cd ../..
```

---

## 🎮 Comandos Principales

### Desarrollo

```bash
# Correr TODO el monorepo (frontend + backend)
pnpm dev

# Solo frontend
cd apps/web
pnpm dev

# Solo backend
cd apps/backend
pnpm dev
```

### Build

```bash
# Build de TODO el monorepo
pnpm build

# Solo frontend
cd apps/web
pnpm build

# Solo backend
cd apps/backend
pnpm build
```

### Linting y Formateo

```bash
# Lint de todo el proyecto
pnpm lint

# Formatear todo el código
pnpm format
```

### Testing (Backend)

```bash
cd apps/backend

# Tests unitarios
pnpm test

# Tests e2e
pnpm test:e2e

# Coverage
pnpm test:cov
```

### Prisma

```bash
cd apps/backend

# Generar cliente
npx prisma generate

# Crear migración
npx prisma migrate dev --name <nombre>

# Ver base de datos en Prisma Studio
npx prisma studio
```

### Git Hooks

Los hooks están configurados automáticamente con Husky:

- **Pre-commit**: Ejecuta `lint-staged` (ESLint + Prettier)
- **Commit-msg**: Valida formato Conventional Commits

```bash
# Ejemplo de commit válido:
git commit -m "feat: add song import endpoint"
git commit -m "fix: resolve metronome sync issue"
git commit -m "docs: update README with API docs"
```

---

## 🌐 Puertos y URLs

| Servicio             | Puerto | URL                   |
| -------------------- | ------ | --------------------- |
| **Frontend (Vite)**  | 5173   | http://localhost:5173 |
| **Backend (NestJS)** | 3000   | http://localhost:3000 |
| **Prisma Studio**    | 5555   | http://localhost:5555 |

---

## 📁 Estructura del Proyecto (Detallada)

```
drumflow/
├── apps/
│   ├── web/
│   │   ├── public/              # Assets estáticos
│   │   │   └── samples/         # Samples de batería (kick, snare, hihat)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/          # Botones, inputs, modals
│   │   │   │   └── layout/      # Header, Sidebar, Footer
│   │   │   ├── features/
│   │   │   │   ├── songs/
│   │   │   │   │   ├── SongList.tsx
│   │   │   │   │   ├── SongViewer.tsx
│   │   │   │   │   └── SongImporter.tsx
│   │   │   │   ├── editor/
│   │   │   │   │   ├── SheetEditor.tsx
│   │   │   │   │   └── VexFlowRenderer.tsx
│   │   │   │   ├── player/
│   │   │   │   │   ├── AudioPlayer.tsx
│   │   │   │   │   ├── Metronome.tsx
│   │   │   │   │   └── Timeline.tsx
│   │   │   │   └── live/
│   │   │   │       └── LiveMode.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useMetronome.ts
│   │   │   │   ├── useAudioPlayer.ts
│   │   │   │   └── useSongSync.ts
│   │   │   ├── stores/
│   │   │   │   ├── playerStore.ts    # Zustand: estado del reproductor
│   │   │   │   └── timelineStore.ts  # Zustand: secciones, tiempo actual
│   │   │   ├── services/
│   │   │   │   ├── api.ts            # Axios instance
│   │   │   │   ├── songService.ts    # React Query hooks
│   │   │   │   └── uploadService.ts
│   │   │   ├── utils/
│   │   │   │   ├── toneUtils.ts      # Helpers de Tone.js
│   │   │   │   └── timeFormat.ts
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.js
│   │   └── package.json
│   │
│   └── backend/
│       ├── src/
│       │   ├── songs/
│       │   │   ├── songs.controller.ts
│       │   │   ├── songs.service.ts
│       │   │   ├── songs.module.ts
│       │   │   └── dto/
│       │   ├── sections/
│       │   │   ├── sections.controller.ts
│       │   │   ├── sections.service.ts
│       │   │   └── sections.module.ts
│       │   ├── sheets/
│       │   │   ├── sheets.controller.ts
│       │   │   ├── sheets.service.ts
│       │   │   └── sheets.module.ts
│       │   ├── upload/
│       │   │   ├── upload.controller.ts
│       │   │   └── upload.service.ts
│       │   ├── ai/                   # Futuro
│       │   │   ├── transcribe.service.ts
│       │   │   └── bpm-detection.service.ts
│       │   ├── common/
│       │   │   ├── filters/
│       │   │   ├── guards/
│       │   │   └── interceptors/
│       │   ├── app.module.ts
│       │   └── main.ts
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       ├── test/
│       └── package.json
│
├── packages/
│   ├── types/
│   │   └── src/
│   │       └── index.ts            # Song, SongSection, DrumPattern, User
│   └── audio/
│       └── src/
│           └── index.ts            # createDrumSampler, createMetronome
│
├── .husky/
│   ├── pre-commit
│   └── commit-msg
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── commitlint.config.js
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
└── README.md
```

---

## 🎯 Módulos de la Aplicación

### 1️⃣ **Song Library (Lista de Canciones)**

- Ver todas las canciones
- Búsqueda y filtros (artista, BPM, género)
- Favoritos
- Setlists (listas de canciones para shows)
- **Tecnología**: React Query (caching), Zustand (filtros)

### 2️⃣ **Song Viewer (Modo Estudio)**

- Ver partitura sincronizada
- Letra con timecodes
- Secciones (Intro, Verse, Chorus, etc.)
- Metrónomo visual y auditivo
- Reproductor de audio
- Loop de secciones
- Control de tempo (½x, ¾x, 1x, 1.25x)
- **Tecnología**: Tone.js (Transport, Scheduler), VexFlow (partituras)

### 3️⃣ **Song Viewer (Modo Live)**

- UI minimalista optimizada para distancia
- BPM grande y visible
- Sección actual destacada
- Letras con tamaño de escenario
- Cursor de progreso
- Sin distracciones
- **Tecnología**: Tailwind (responsive), Tone.js (metrónomo)

### 4️⃣ **Editor de Partituras**

- Modo notación completa (VexFlow)
- Modo bloques simplificado
- Modo piano roll (futuro)
- Guardado automático
- **Tecnología**: VexFlow, React Query (autosave)

### 5️⃣ **Importador de Canciones**

- Upload de archivos MP3/WAV
- Detección automática de BPM
- Metadata (título, artista, duración)
- Marcado manual de secciones
- **Tecnología**: Multer (backend), music-metadata (BPM detection)

### 6️⃣ **IA (Opcional - Futuro)**

- Transcripción automática de batería
- Conversión Audio → MIDI → Notación
- Detección automática de secciones
- Sugerencia de sticking
- **Tecnología**: TensorFlow.js, BasicPitch API, Magenta

### 7️⃣ **Progreso (Futuro)**

- Canciones aprendidas
- Horas de práctica
- Estadísticas semanales
- Gráficos de mejora
- **Tecnología**: Recharts, React Query

---

## 🗄 Base de Datos

### Esquema Prisma (`apps/backend/prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Usuario (futuro, para multi-usuario)
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  songs     Song[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Canción
model Song {
  id          String        @id @default(cuid())
  title       String
  artist      String
  bpm         Int
  duration    Float?        // En segundos
  audioUrl    String?       // URL de Supabase Storage
  coverUrl    String?
  userId      String?
  user        User?         @relation(fields: [userId], references: [id])
  sections    SongSection[]
  sheet       SongSheet?
  lyrics      SongLyrics?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

// Secciones de la canción
model SongSection {
  id        String   @id @default(cuid())
  songId    String
  song      Song     @relation(fields: [songId], references: [id], onDelete: Cascade)
  name      String   // "Intro", "Verse 1", "Chorus", etc.
  startTime Float    // En segundos
  endTime   Float    // En segundos
  order     Int      // Orden de la sección
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([songId])
}

// Partitura
model SongSheet {
  id        String   @id @default(cuid())
  songId    String   @unique
  song      Song     @relation(fields: [songId], references: [id], onDelete: Cascade)
  type      String   // "vexflow", "blocks", "midi"
  data      Json     // JSON con la partitura
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Letras
model SongLyrics {
  id        String   @id @default(cuid())
  songId    String   @unique
  song      Song     @relation(fields: [songId], references: [id], onDelete: Cascade)
  text      String   @db.Text
  timecodes Json?    // Array de { time: number, text: string }
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Setlist (futuro)
model Setlist {
  id        String        @id @default(cuid())
  name      String
  userId    String?
  songs     SetlistSong[]
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
}

model SetlistSong {
  id         String   @id @default(cuid())
  setlistId  String
  setlist    Setlist  @relation(fields: [setlistId], references: [id], onDelete: Cascade)
  songId     String
  order      Int
  createdAt  DateTime @default(now())

  @@unique([setlistId, songId])
  @@index([setlistId])
}
```

---

## 🔌 API Endpoints

### **Songs**

```
GET    /api/songs              # Listar todas las canciones
GET    /api/songs/:id          # Obtener una canción por ID
POST   /api/songs              # Crear nueva canción
PUT    /api/songs/:id          # Actualizar canción
DELETE /api/songs/:id          # Eliminar canción
POST   /api/songs/upload       # Subir archivo de audio
```

### **Sections**

```
GET    /api/songs/:songId/sections        # Listar secciones
POST   /api/songs/:songId/sections        # Crear sección
PUT    /api/songs/:songId/sections/:id    # Actualizar sección
DELETE /api/songs/:songId/sections/:id    # Eliminar sección
```

### **Sheet Music**

```
GET    /api/songs/:songId/sheet    # Obtener partitura
POST   /api/songs/:songId/sheet    # Crear/actualizar partitura
DELETE /api/songs/:songId/sheet    # Eliminar partitura
```

### **Lyrics**

```
GET    /api/songs/:songId/lyrics   # Obtener letras
POST   /api/songs/:songId/lyrics   # Crear/actualizar letras
DELETE /api/songs/:songId/lyrics   # Eliminar letras
```

### **AI (Futuro)**

```
POST   /api/ai/transcribe        # Transcribir batería de audio
POST   /api/ai/detect-bpm        # Detectar BPM automático
POST   /api/ai/split-sections    # Detectar secciones automáticamente
```

---

## 🎨 UI Mockups

### **Song Viewer (Estudio)**

```
┌─────────────────────────────────────────────────────┐
│  [Cover]  Song Title - Artist              🎵 96 BPM │
├─────────────────────────────────────────────────────┤
│  ▶️  Play  │  ⏸️  Pause  │  🔁 Loop  │  ⏩ 1.25x      │
├─────────────────────────────────────────────────────┤
│  Sections: [Intro] [Verse] [Chorus] [Solo] [Outro]  │
├─────────────────────────────────────────────────────┤
│                                                       │
│   ┌───────────────────────────────────────────┐     │
│   │                                           │     │
│   │        [PARTITURA VEXFLOW]                │     │
│   │        Auto-scroll activado               │     │
│   │                                           │     │
│   └───────────────────────────────────────────┘     │
│                                                       │
│   Lyrics:                                             │
│   When you were here before...                        │
│   Couldn't look you in the eye...                     │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### **Modo Live**

```
┌─────────────────────────────────────────────────────┐
│                                                       │
│                    BPM: 96                            │
│               SECTION: CHORUS                         │
│                                                       │
│                                                       │
│         When you were here before...                  │
│       Couldn't look you in the eye...                 │
│                                                       │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│   ├─────────────────────────────────►                │
│   0:45                               2:30             │
│                                                       │
└─────────────────────────────────────────────────────┘
```

---

## 📈 Roadmap

### **Fase 1: MVP (Actual)** ✅

- [x] Setup del monorepo
- [x] Frontend básico con React + Vite
- [x] Backend básico con NestJS
- [x] Prisma + Supabase configurado
- [x] Tone.js instalado
- [ ] Implementar Song Viewer básico
- [ ] Implementar metrónomo funcional
- [ ] CRUD de canciones

### **Fase 2: Editor y Partituras** 🚧

- [ ] Integrar VexFlow
- [ ] Editor de partituras simple
- [ ] Sincronización partitura + audio
- [ ] Modo Live básico

### **Fase 3: Import y Metadata** 📅

- [ ] Upload de archivos de audio
- [ ] Detección automática de BPM
- [ ] Marcado manual de secciones
- [ ] Agregar letras

### **Fase 4: IA (Opcional)** 🔮

- [ ] Integrar BasicPitch o TensorFlow.js
- [ ] Transcripción automática de batería
- [ ] Detección automática de secciones
- [ ] Sugerencias de sticking

### **Fase 5: Progreso y Setlists** 🎯

- [ ] Sistema de progreso
- [ ] Setlists para shows
- [ ] Estadísticas de práctica
- [ ] Gráficos de mejora

---

## 🧪 Testing

### Frontend

```bash
cd apps/web
# Por implementar: Vitest + React Testing Library
```

### Backend

```bash
cd apps/backend
pnpm test          # Unit tests
pnpm test:e2e      # E2E tests
pnpm test:cov      # Coverage
```

---

## 📦 Deployment (Futuro)

### Frontend

- **Vercel** o **Netlify** (recomendado para Vite)
- Build: `pnpm build`
- Output: `apps/web/dist`

### Backend

- **Railway**, **Render**, o **Fly.io**
- Con Supabase para DB + Storage
- Docker opcional

---

## 🤝 Contribución

Este es un proyecto personal, pero si querés contribuir:

1. Fork el repo
2. Crear una rama: `git checkout -b feature/nueva-feature`
3. Commit con Conventional Commits: `git commit -m "feat: add new feature"`
4. Push: `git push origin feature/nueva-feature`
5. Abrir un Pull Request

---
