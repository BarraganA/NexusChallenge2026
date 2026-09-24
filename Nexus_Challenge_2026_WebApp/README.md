# Nexus Challenge 2026 · Web App

Aplicación estática preparada para GitHub Pages.

## Incluye
- Landing page oficial de Nexus Challenge 2026: Space Exploration.
- Cuenta regresiva al 5 de diciembre de 2026.
- Explicación del reto, cancha y robot oficial.
- Match Center con cronómetro de 1:30 min.
- Cambio automático a Endgame durante los últimos 15 segundos.
- Efectos sonoros básicos generados por navegador.
- Calculadora de score Blue vs Yellow.
- Diseño responsive para computadora, tablet y celular.
- Sin frameworks, base de datos ni servidor.

## Publicar en GitHub Pages
1. Crea un repositorio, por ejemplo `nexus-challenge-2026`.
2. Sube `index.html`, `styles.css`, `app.js` y la carpeta `assets`.
3. En GitHub: **Settings → Pages**.
4. En **Build and deployment**, selecciona `Deploy from a branch`.
5. Selecciona `main` y `/ (root)`.
6. Guarda.

## Scoring configurado
- Pelota en Bahía de Carga: +1
- Cubo en Plataforma de Bloques: +3
- Robot dentro de zona Nexus de su alianza: +2
- Ambos robots regresan: +2 bonus

No utiliza Ranking Points.

## Personalización
Los valores principales del cronómetro están al inicio de `app.js`:
```js
const MATCH_SECONDS = 90;
const ENDGAME_SECONDS = 15;
```

Los colores están definidos como variables CSS al inicio de `styles.css`.

## Estructura
```text
nexus_challenge_app/
├── index.html
├── styles.css
├── app.js
├── README.md
└── assets/
    ├── arena.png
    ├── robot-kit.png
    └── inspiracion.png
```
