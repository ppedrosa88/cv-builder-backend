# CV Builder Backend

## Descripción

Este proyecto es un backend para una aplicación de construcción de CVs. Está construido utilizando Node.js, Express, Sequelize (con PostgreSQL), y JWT para autenticación.

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

- Node.js (v20.11.1 o superior)

- PostgreSQL

## Instalación

1. Clona el repositorio en tu máquina local:

```bash

git clone https://github.com/ppedrosa88/cv-builder-backend

```

2. Navega al directorio dle proyecto:

```bash

cd <URL_DEL_REPOSITORIO>

```

3. Instala las dependencias del proyecto:

```bash

npm  install

```

## Variables de Entorno

El proyecto requiere ciertas variables de entorno para funcionar correctamente. Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

```.env

PORT=port

JWT_SECRET=clave_secreta

DB_HOST=localhost

DB_NAME=nombre_bd

DB_USER=nombre_usuario

DB_PASS=contraseña

```

### Descripción de las Variables de Entorno

- **PORT**: El puerto en el que el servidor escuchará (por defecto es 3000).

- **JWT_SECRET**: Secreto para firmar los tokens JWT.

- **DB_HOST**: Host de la base de datos PostgreSQL (por defecto es localhost).

- **DB_NAME**: Nombre de la base de datos PostgreSQL.

- **DB_USER**: Usuario de la base de datos PostgreSQL.

- **DB_PASS**: Contraseña del usuario de la base de datos PostgreSQL.

## Ejecución del Proyecto

Para ejecutar el proyecto, utiliza el siguiente comando:

```bash

npm  start

```

Esto iniciará el servidor en el puerto configurado.

## Endpoints de la API

Aquí están los endpoints disponibles en la API:

### /auth

- GET /auth/

  - **Descripción**: Obtiene todos los usuarios.
  - **Respuesta**: Lista de usuarios.

- POST /auth/ - **Descripción**: Crea un nuevo usuario. - **Cuerpo de la Solicitud**:
  `    { 
		 "name": "Nombre", 
		 "surname": "Apellido", 
		 "email": "correo@example.com", 
		 "password": "contraseña", 
		 "linkedin": "https://www.linkedin.com/in/usuario", 
		 "github": "https://github.com/usuario" 
	}
   `
  No siendo necesarios los campos de linkedin y github.

- **GET /auth/**

  - **Descripción**: Obtiene un usuario por ID.
  - **Parámetros de Ruta**:
    - `id`: ID del usuario.
  - **Respuesta**: Detalles del usuario.
  - **Autenticación**: Requiere un token JWT en el encabezado `Authorization` como `Bearer <token>`.

- **PATCH /auth/**

  - **Descripción**: Actualiza un usuario por ID.
  - **Parámetros de Ruta**:
    - `id`: ID del usuario.
  - **Autenticación**: Requiere un token JWT en el encabezado `Authorization` como `Bearer <token>`.
  - **Cuerpo de la solicitud**:

```
{
  "name": "Nuevo Nombre",
  "surname": "Nuevo Apellido",
  "email": "nuevo-correo@example.com",
  "password": "nueva-contraseña",
  "linkedin": "https://www.linkedin.com/in/nuevo-usuario",
  "github": "https://github.com/nuevo-usuario"
}
```

- **DELETE /auth/**

  - **Descripción**: Marca un usuario como inactivo (no lo elimina realmente).
  - **Parámetros de Ruta**:
    - `id`: ID del usuario.
  - **Autenticación**: Requiere un token JWT en el encabezado `Authorization` como `Bearer <token>`.

- **POST /auth/login**

  - **Descripción**: Autentica a un usuario y genera un token JWT.
  - **Respuesta**: Token JWT.
  - **Cuerpo de la Solicitud**:

```
{
	"email": "correo@example.com",
	"password": "contraseña"
}
```

## Estructura del Proyecto

- **/controllers**: Contiene los controladores que manejan la lógica de negocio.
- **/models**: Contiene los modelos de datos definidos con Sequelize.
- **/routes**: Contiene las rutas de la API.
- **/db**: Contiene la configuración de la base de datos y la conexión.
- **index.js**: Punto de entrada de la aplicación.

## Uso de Sequelize y PostgreSQL

La conexión a la base de datos se maneja en el archivo `db/connection.js`. La base de datos se configura utilizando Sequelize y las credenciales proporcionadas en el archivo `.env`.
