# Nexus Challenge 2026 · Web App

Aplicación estática preparada para GitHub Pages. TECH FEST 2026 presenta Nexus Challenge 2026: Space Exploration, organizado por Keybot 5716 en el Tec de Monterrey, Campus Hidalgo (5 de diciembre de 2026).

Contenidos homologados con el **Manual de Juego y Reglamento Oficial v1.4 (20 de noviembre de 2026)**.

## Scoring configurado (Match Center)
- Pelota en Bahía de Carga: +1
- Cubo en Plataforma de Bloques: +3
- Robot estacionado en el semicírculo de su alianza: +2 por robot
- Bonus de alianza cuando ambos robots se estacionan: +2 (se aplica automáticamente)
- Faltas (se registran en la alianza que las comete y suman a la contraria):
  - Violación de posesión: +1 al rival
  - Falta menor: +3 al rival
  - Falta mayor: +10 al rival

## Ranking
- Ranking Points por match: victoria 2 RP, empate 1 RP, derrota 0 RP.
- El ranking se ordena por el promedio de RP por partida clasificatoria.
- Desempates: TB1 puntuación total, TB2 cubos, TB3 estacionamiento, TB4 pelotas, TB5 moneda.

## Personalización
Los valores principales del cronómetro y del scoring están en `app.js`:
```js
const MATCH_SECONDS = 90;
const ENDGAME_SECONDS = 15;
const POINTS = {balls:1, cubes:3, robots:2, parkBonus:2};
const FOUL_POINTS = {poss:1, minor:3, major:10};
```

## Estructura
```text
Nexus_Challenge_2026_WebApp/
├── index.html
├── styles.css
├── app.js
├── README.md
└── assets/
    ├── arena.webp         (usada en la página)
    ├── robot-kit.webp     (usada en la página)
    ├── nexus-logo.webp    (usada en la página)
    ├── keybot-logo.webp   (usada en la página)
    └── *.png              (originales en alta resolución)
```

El logotipo de TECH FEST se compone con texto (tipografía Anton y la "H" en morado #9F5BFF), igual que en el sitio oficial de TECH FEST, por lo que no requiere archivo de imagen.
