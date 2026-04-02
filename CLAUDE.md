# Bacheame Frontend

## Descripcion del Proyecto

Frontend para la aplicacion Bacheame, un sistema de gestion de direcciones de hallazgos (baches/problemas en calles). La aplicacion permite visualizar, filtrar y paginar direcciones reportadas.

## Stack Tecnologico

- **Framework**: React 19
- **Lenguaje**: TypeScript 5.9
- **Build Tool**: Vite 7
- **Estilos**: Tailwind CSS 4
- **Componentes UI**: Radix UI + shadcn/ui
- **Iconos**: Lucide React
- **Utilidades de fecha**: date-fns

## Estructura del Proyecto

```
src/
├── api/           # Funciones para llamadas a la API
│   └── events.ts  # Fetch de finding_addresses
├── components/    # Componentes React
│   ├── ui/        # Componentes base de shadcn/ui
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── pagination.tsx
│   │   ├── select.tsx
│   │   └── table.tsx
│   ├── EventDetailDialog.tsx  # Dialog de detalle de direccion
│   ├── EventFilters.tsx       # Filtros de busqueda
│   ├── EventsPagination.tsx   # Controles de paginacion
│   ├── EventsTable.tsx        # Tabla de direcciones
│   └── Header.tsx             # Cabecera de la app
├── lib/           # Utilidades
│   └── utils.ts   # Funcion cn() para clases CSS
├── types/         # Tipos TypeScript
│   └── event.ts   # Tipos de FindingAddress y respuestas API
├── assets/        # Recursos estaticos
├── App.tsx        # Componente principal
├── App.css        # Estilos del App
├── index.css      # Estilos globales y variables CSS
└── main.tsx       # Punto de entrada
```

## Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilar TypeScript y build de produccion
npm run lint     # Ejecutar ESLint
npm run preview  # Vista previa del build
```

## API Backend

- **URL Base**: `https://juanifernandez.com/bacheame/api.php`
- **Tabla principal**: `finding_addresses`
- **Parametros de query**:
  - `table`: nombre de la tabla
  - `limit`: cantidad de registros
  - `offset`: desplazamiento para paginacion
  - `finding_id`: filtro opcional por ID de hallazgo

## Tipos Principales

### FindingAddress
```typescript
type FindingAddress = {
  id: string
  findingId: string
  createdAt: string
  updatedAt: string
  street: string
  number: string
  city: string
  province: string
  country: string
  municipality: string
  neighborhood: string
  latitude: number
  longitude: number
}
```

## Configuracion

- **Path alias**: `@` apunta a `./src`
- **Tailwind CSS**: Integrado via plugin de Vite (`@tailwindcss/vite`)
- **ESLint**: Configurado con reglas para React Hooks y React Refresh

## Patrones de Codigo

- Componentes funcionales con hooks de React
- Estado manejado con `useState` y `useEffect`
- Funciones de fetch separadas en `src/api/`
- Tipos TypeScript en `src/types/`
- Componentes UI reutilizables siguiendo patrones de shadcn/ui
- Uso de `useCallback` para funciones memorizadas