# Nexus Challenge 2026 · Web App

Aplicación estática preparada para GitHub Pages.

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
