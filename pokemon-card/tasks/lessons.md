# Lessons

- TiltCard n'avait pas de `children` (carte = image de fond seule) : ajout d'un `children` rendu AVANT `.tlt-sheen`, pour que le reflet reste au-dessus du contenu.
- Carousel : les cartes sont dessinées à 260 px puis réduites par `scale(0.7923)` dans `.car-face`. Ça évite de recalculer chaque taille de texte pour 206 px. `onFront` est ajouté pour savoir quelle carte est devant (`turn` n'est jamais ramené modulo N, donc on calcule `frontOf`).
