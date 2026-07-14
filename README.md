# MI SALUD

PWA personal para iPhone con seguimiento de comidas, lista de compras, agua, peso, gimnasio y progreso. Está diseñada para funcionar sin cuenta: los datos se guardan localmente en el navegador del iPhone.

## Incluye

- Objetivo inicial de 2.700 kcal y 160 g de proteína.
- Recetas variadas con ingredientes y pasos de cocina.
- Lista de compras semanal marcable.
- Registro de agua, comidas, peso y entrenamiento.
- Rutina A/B de máquinas para tres días semanales.
- Visualizaciones 3D interactivas de máquinas seleccionadas.
- Gráfico de peso y objetivo orientativo de cuatro semanas.
- Exportación/importación de respaldo y recordatorios para Calendario de iPhone.
- Instalación PWA y uso offline, salvo modelos 3D y fuente web.

## Desarrollo

```bash
npm install
npm run dev
```

Para comprobar la versión de producción:

```bash
npm run build
npm run preview
```

## Publicar En GitHub Pages

1. Crea un repositorio en GitHub y sube este proyecto a la rama `main`.
2. En GitHub, abre `Settings` > `Pages` y selecciona `GitHub Actions` como fuente.
3. El flujo `.github/workflows/deploy.yml` publica automáticamente cada cambio enviado a `main`.
4. En el iPhone abre el enlace publicado en Safari, toca Compartir y elige `Añadir a pantalla de inicio`.

La configuración usa rutas relativas, por lo que funciona tanto en un dominio de proyecto como en un dominio propio de GitHub Pages.

## Privacidad Y Respaldo

Los registros se almacenan en `localStorage` del dispositivo. Exporta un respaldo desde `Más` antes de borrar datos de Safari, cambiar de teléfono o hacer una limpieza del navegador.

La aplicación no es un dispositivo médico ni sustituye el asesoramiento de profesionales de salud o entrenamiento.

## Créditos 3D

- [Leg Press Machine](https://sketchfab.com/models/99b9c28dd70d4131918d23f0b58cb14a) por [silentsheri](https://sketchfab.com/silentsheri), CC BY, vía Sketchfab.
- [Leg extension machine](https://sketchfab.com/models/f0e400579ad54b34b9cd06ba0c6e5f78) por [dragosburian](https://sketchfab.com/dragosburian), licencia Sketchfab Standard.
- [Cable Loaded Seated Shoulder Press Machine](https://sketchfab.com/models/01ece82aae8b478a9bb89eff41f59648) por [Mike - 3D Muscle Model](https://sketchfab.com/mikeshortall1991), licencia Sketchfab Standard.
- [Calf Raise Machine](https://sketchfab.com/models/2751050881754cacadee3f06904f8f29) por [Neske](https://sketchfab.com/Neske), licencia Sketchfab Standard.
- [Back Extension Cable Machine](https://sketchfab.com/models/c1c72e01eee241ac8fb19f7804d5b4c9) por [Mike - 3D Muscle Model](https://sketchfab.com/mikeshortall1991), licencia Sketchfab Standard.

Los modelos se reproducen como incrustaciones de Sketchfab y requieren conexión al abrirse.
