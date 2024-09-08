# clinico-app

An Electron application with React

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

## Manejo de datos

El tratamiento de los datos debería eliminar/agregar cualquier dato calculado y convertir los campos _especiales_ (ver a continuación) en un formato adecuado para su almacenamiento/representación.

Por lo general, los datos empleados por `formData` (para representar datos en la UI) son de tipo `String`. Entonces, cuando se habla de _convertir_ campos se refiere a convertirlo a un `String` con formato, o viceversa (cuando es necesario guardar la entidad en la base de datos).

### Fechas

**API utilizada: `luxon`**

- `Date`: MongoDB.
- `DateTime`: Representación en UI.

El formato es, generalmente, `dd/mm/yyyy`.

### Imágenes

**API utilizada: `sharp`**

- `base64`: Para la visualización de imágenes en la UI.
- `jpg`: Para el almacenamiento persistente. Las imágenes se guardan en la aplicación en `/static/img/{collection}/{document._id}.jpg`.

La conversión `imgToBase64` se utiliza para mostrar la imagen con alguno de estos dos orígenes:

- Ruta local del dispositivo del usuario.
- Almacenamiento local de la aplicación.

La conversión `base64ToImg` se utiliza solo cuando se necesita guardar la imagen en la aplicación (y solo debería convertir a `jpg`).
