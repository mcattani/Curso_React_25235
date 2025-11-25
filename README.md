# Proyecto Curso React JS - Comisión 25235
### Mariano C.

Este proyecto corresponde al curso de React JS, comisión 25235. Es una aplicación de e-commerce desarrollada para demostrar la adquisición y aplicación de los conceptos fundamentales de **Vite+React**.

## ✨ Características Principales

El proyecto cumple con los siguientes requerimientos:

-   **Arquitectura Basada en Componentes:** La aplicación está completamente modularizada, utilizando componentes reutilizables para la UI.
-   **Hooks de React:** Uso extensivo de hooks como `useState`, `useEffect` y `useContext`, para manejar el estado y la lógica de la aplicación.
-   **Manejo de Eventos:** Implementación de interactividad a través del manejo de eventos de React para acciones del usuario.
-   **Layout de E-commerce:** Diseño de una interfaz de usuario típica de una tienda online, con páginas para Home, Productos, Carrito, etc.
-   **Integración con API:** Consumo de datos desde API ([mockapi](https://mockapi.io/)) para mostrar información dinámica de productos.
-   **Manejo de Estado de Carga y Errores:** Implementación de feedback visual para el usuario durante las peticiones a la API (estados de "cargando") y manejo de posibles errores.
-   **Enrutamiento con React Router:** Navegación fluida entre las distintas páginas de la aplicación utilizando `react-router-dom`.
-   **Rutas Protegidas:** Implementación de rutas que requieren autenticación para acceder, como un panel de administración.
-   **Interactividad Mejorada:** Uso de librerías como `SweetAlert2` para notificaciones y alertas más amigables.
- **Formularios Controlados:** Implementación de formularios controlados funcionales con el uso de [Formspree.](https://formspree.io/)
- **CRUD Completo:** Se ha implementado un CRUD (Crear, Leer, Actualizar, Eliminar) completo para la gestión de productos, permitiendo interactuar de forma integral con la API.
- **Búsqueda de Productos:** Implementación de una función de búsqueda que permite a los usuarios filtrar productos por nombre en tiempo real.
- **Optimización SEO con React Helmet:** Se utiliza `react-helmet` para gestionar dinámicamente el contenido del `head` del documento, mejorando el SEO de la aplicación.
-   **Animaciones Fluidas:** Incorporación de animaciones utilizando `framer-motion` para una experiencia de usuario más dinámica y atractiva.
-   **Deploy en Netlify:** [Link al deploy](https://marianoctt.netlify.app/)

## 🚀 Tecnologías y Librerías

Este proyecto fue construido utilizando las siguientes tecnologías:

-   **Core:**
    -   [**React**](https://react.dev/): Biblioteca principal para la construcción de la interfaz de usuario.
    -   [**Vite**](https://vitejs.dev/): Herramienta de desarrollo y empaquetado.
-   **Enrutamiento:**
    -   [**React Router DOM**](https://reactrouter.com/): Para manejar la navegación y las rutas en la aplicación.
-   **Estilos y UI:**
    -   [**Bootstrap**](https://getbootstrap.com/): Framework de CSS para un diseño responsive y moderno.
    -   [**React-Bootstrap**](https://react-bootstrap.github.io/): Componentes de Bootstrap reconstruidos para React.
    -   [**Styled-Components**](https://styled-components.com/): Librería para escribir CSS en JavaScript.
    -   [**FontAwesome**](https://fontawesome.com/): Biblioteca de iconos vectoriales.
-   **Alertas y Notificaciones:**
    -   [**SweetAlert2**](https://sweetalert2.github.io/): Para crear alertas personalizadas, agradables y responsivas.
    -   [**React-Toastify**](https://github.com/fkhadra/react-toastify): Para notificaciones personalizadas.
-   **Animaciones:**
    -   [**Framer Motion**](https://www.framer.com/motion/): Librería para animaciones en React.
-   **SEO:**
    -   [**React Helmet**](https://github.com/nfl/react-helmet): Para gestionar cambios en el `head` del documento y mejorar el SEO.

## 📦 Estructura del Proyecto

La estructura del código fuente está organizada de la siguiente manera para facilitar la modularidad y el mantenimiento:

```
/Curso_React_25235
├─── public/
│    └─── images/      (Imágenes estáticas y favicon)
│
└─── src/
     │
     ├─── components/    (Componentes reutilizables)
     │    ├─── Footer.jsx
     │    ├─── Header.jsx
     │    ├─── MaterialWrapper.jsx
     │    ├─── ModalProducto.jsx
     │    └─── SecRoute.jsx
     │
     ├─── context/       (Manejo de estado global con Context API)
     │    ├─── AuthContext.jsx
     │    ├─── CarritoContext.jsx
     │    └─── ProductosContext.jsx
     │
     ├─── pages/         (Componentes que representan páginas completas)
     │    ├─── Admin.jsx
     │    ├─── Carrito.jsx
     │    ├─── Contacto.jsx
     │    ├─── Equipo.jsx
     │    ├─── Home.jsx
     │    ├─── Login.jsx
     │    ├─── NotFound.jsx
     │    └─── Productos.jsx
     │
     ├─── App.jsx        (Componente principal y definición de rutas)
     └─── main.jsx       (Punto de entrada de la aplicación)
```

## 📦 Instalación y Uso

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/mcattani/Curso_React_25235.git
    ```

2.  **Navegar al directorio del proyecto:**
    ```bash
    cd Curso_React_25235
    ```

3.  **Instalar dependencias:**
    Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego, ejecuta el siguiente comando para instalar todas las librerías necesarias:
    ```bash
    npm install
    ```

4.  **Ejecutar el proyecto:**
    Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    Esto abrirá el proyecto en tu navegador en `http://localhost:5173` (o el puerto que Vite asigne).