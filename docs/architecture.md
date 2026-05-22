# Arquitectura del proyecto

## Objetivo

Aplicacion web para construir una convocatoria nacional estilo FC26:

1. Seleccionar seleccion.
2. Convocar exactamente 23 jugadores desde una lista de 70 elegibles.
3. Elegir formacion.
4. Organizar titulares en una cancha con drag and drop.
5. Exportar convocatoria y alineacion como PNG.

## Stack elegido

- React + Vite para UI modular y arranque rapido.
- TailwindCSS como sistema base de estilos.
- Framer Motion para microinteracciones.
- html2canvas para exportar nodos HTML a imagen.
- LocalStorage para persistir seleccion, convocatoria, formacion, once y nombre del DT.

## Estructura

```text
src/
  components/
    ExportPanel.jsx       Exportacion de convocatoria y alineacion
    FormationPicker.jsx   Selector visual de formaciones
    Pitch.jsx             Cancha y drag and drop
    PlayerCard.jsx        Tarjeta tipo FC
    SquadBuilder.jsx      Busqueda, filtros y convocatoria
    TeamSelect.jsx        Pantalla de seleccion nacional
  data/
    formations.js         Coordenadas tacticas y grupos posicionales
    teams.js              Datos semilla de 5 selecciones x 70 jugadores
  utils/
    exportImage.js        Wrapper html2canvas
  App.jsx                 Orquestador del flujo
  main.jsx                Bootstrap
  styles.css              Estilos globales y responsive
```

## Modelo de datos

```js
{
  id: "colombia-18",
  name: "Jhon Arias",
  age: 28,
  position: "RW",
  secondaryPositions: ["CAM"],
  club: "Wolverhampton",
  nationalNumber: 11,
  photo: "https://...",
  flag: "https://...",
  rating: 82,
  foot: "Der.",
  height: "1.68 m",
  fitness: "Disponible",
  country: "Colombia"
}
```

## Validacion de convocatoria

La app exige 23 convocados y minimo:

- 3 porteros.
- 6 defensas.
- 5 mediocampistas.
- 4 delanteros.

Estos umbrales estan en `src/App.jsx` y `src/components/SquadBuilder.jsx`.

## Formaciones iniciales

- 4-3-3
- 4-2-3-1
- 4-4-2
- 3-5-2
- 5-3-2
- 4-1-2-1-2
- 4-3-2-1

Cada formacion usa coordenadas porcentuales `x/y` para ubicar los slots en la cancha.

## Datos deportivos recomendados

Recomendacion practica para este proyecto:

1. **API-Football / API-Sports** como fuente principal de datos estructurados. Tiene endpoints de equipos, jugadores, plantillas, lineups, lesiones y estadisticas. La capa gratuita sirve para prototipo, pero el limite actual publicado es de 100 requests/dia, asi que para produccion conviene cachear o pagar.
2. **TheSportsDB** como complemento para imagenes, escudos y metadatos visuales. Su documentacion publica indica API gratuita y artwork, con limite gratuito de 30 requests/minuto.
3. **Curadoria propia** para convocatorias recientes, ratings estilo FC, estados fisicos y ajustes editoriales. Esto evita depender de una API que no entrega exactamente el criterio de convocatoria.

Alternativas:

- **Football-Data.org**: buena para competiciones, partidos, tablas y algunos squads, pero no es ideal como fuente principal de fotos de jugadores.
- **Sofascore unofficial APIs**: utiles para exploracion, pero no recomendadas como base legal/estable si no hay contrato o API oficial para el caso de uso.
- **Transfermarkt scraping**: fuerte para perfiles y valor de mercado, pero el scraping es fragil y riesgoso por terminos, bloqueos y cambios de HTML.

## Futuras ampliaciones

- Integrar backend cacheado para normalizar jugadores desde API-Football y TheSportsDB.
- Guardar multiples convocatorias por seleccion.
- Comparador de ratings entre selecciones.
- Lesiones, fatiga y disponibilidad.
- Simulador simple de partido usando rating promedio, localia y quimica.
- Compartir alineacion mediante URL serializada.
