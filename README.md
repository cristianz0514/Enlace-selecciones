# FC26 National Team Selector

Aplicacion web inspirada en el flujo de seleccion de plantillas de EA Sports FC: elegir seleccion, convocar 23 jugadores, definir formacion, organizar la alineacion y exportar imagenes PNG.

## Stack

- React + Vite
- TailwindCSS
- Framer Motion
- html2canvas
- LocalStorage

## Ejecutar

```bash
npm install
npm run dev
```

En Windows tambien puedes usar:

```bat
ejecutar-app.bat
```

## Deploy en Render

1. Sube este proyecto a un repositorio de GitHub.
2. En Render crea un nuevo **Static Site** conectado al repo.
3. Usa:

```text
Build Command: npm install && npm run build
Publish Directory: dist
```

El archivo `render.yaml` ya deja esa configuracion lista para Blueprint si prefieres importarlo desde Render.

## Arquitectura

```text
src/
  components/      Componentes visuales reutilizables
  data/            Selecciones, jugadores semilla y formaciones
  utils/           Helpers de exportacion
  App.jsx          Flujo principal de la aplicacion
  main.jsx         Bootstrap React
  styles.css       Tailwind + estilos de cancha/tarjetas/export
```

## Modelo de jugador

```js
{
  id,
  name,
  age,
  position,
  secondaryPositions,
  club,
  nationalNumber,
  photo,
  flag,
  rating,
  foot,
  height,
  fitness,
  country
}
```

## Fuente de datos recomendada

Para un producto real conviene usar un modelo hibrido:

1. API-Football para plantillas, clubes, posiciones y datos estructurados.
2. TheSportsDB como apoyo gratuito para fotos cuando existan.
3. Curadoria manual propia para convocatorias recientes y ratings estilo FC.

Sofascore no oficial y scraping de Transfermarkt pueden romper terminos, cambiar HTML o bloquearse. Football-Data.org es estable para fixtures y competiciones, pero no cubre bien fotos y plantillas nacionales profundas.
