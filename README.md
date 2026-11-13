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
# Hola. soy un programador externo, me di cuenta que el sitio no funcionaba asi que hice un 
# pequeño fork para que pudiera funcionar, no hice gran cosa solo era cuestion de quitar la carpeta
# pues el deployments trataba de acceder a un archivo que estaba afuera de la carpeta (index.html)

# y ya :) me llamo Angel 
