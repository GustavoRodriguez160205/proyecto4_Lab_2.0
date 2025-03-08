# 📒 Sistema de Gestión de Contactos

## 📌 Descripción

Este es un Sistema de Gestión de Contactos desarrollado con React en el frontend, Express.js en el backend y MongoDB para la persistencia de datos. La aplicación permite gestionar contactos de manera segura, con control de visibilidad y administración de usuarios.

## 🚀 Tecnologías Utilizadas

### Frontend

- React
- Bootstrap (para diseño responsivo)
- Axios (para la comunicación con la API)

### Backend

- Node.js con Express.js
- MongoDB (Base de datos NoSQL)
- Mongoose (ODM para MongoDB)
- JWT (para autenticación de usuarios)
- Bcrypt (para el cifrado de contraseñas)
- Postman (para pruebas de la API)

## 🎯 Funcionalidad Requerida

- 📌 En la esquina superior izquierda, se mostrará el nombre del sitio.
- 📌 En la esquina superior derecha, aparecerán los botones "Registrar" e "Ingresar" si no hay un usuario identificado.
- 📌 Cuando el usuario inicie sesión:
  - Se mostrará su nombre en la esquina izquierda con un botón "Salir".
  - Al hacer clic en su nombre, podrá editar sus datos.
- 📌 La página principal mostrará una lista de contactos públicos ordenados por apellido y nombre.
- 📌 Usuarios registrados:
  - Pueden agregar nuevos contactos.
  - Verán sus propios contactos y los contactos públicos disponibles.
  - Son propietarios de los contactos que crean y pueden editar o eliminar los suyos.
  - Pueden hacer público o privado un contacto mediante un botón.
- 📌 Administrador:
  - Puede ver todos los contactos (públicos y privados, visibles o no).
  - Puede ocultar o mostrar contactos públicos mediante un botón.
- 📌 Registro, inicio de sesión, edición y creación de contactos se hacen en páginas separadas y al finalizar, se regresa a la página principal.
- 📌 Los usuarios se almacenan como contactos privados con una contraseña cifrada.
- 📌 Los usuarios no aparecen en el listado de contactos.

