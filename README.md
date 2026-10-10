# Teslo Shop - Next.js

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.8-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Auth.js](https://img.shields.io/badge/Auth.js-5-000000?style=flat-square&logo=auth0&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5-2D3748?style=flat-square)
![Zod](https://img.shields.io/badge/Zod-4-3E67B1?style=flat-square&logo=zod&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-00457C?style=flat-square&logo=paypal&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E?style=flat-square&logo=prettier&logoColor=white)

Este es un proyecto de comercio electrónico construido con **Next.js** y **Tailwind CSS v4**, diseñado para ofrecer una experiencia de compra moderna y fluida.

**[Demo en Vivo](https://next-shop-apex-padel.vercel.app/)**

<img width="1578" height="708" alt="image" src="https://github.com/user-attachments/assets/1332a3bf-9cf5-478e-b92f-2f1308d57e03" />

## 🚀 Tecnologías Principales

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Estado Global:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Iconos:** [React Icons](https://react-icons.github.io/react-icons/)
- **Validaciones y Calidad:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Git Hooks:** [Husky](https://typicode.github.io/husky/) & [lint-staged](https://github.com/okonet/lint-staged)
- **Commits:** [Commitizen](https://github.com/commitizen/cz-cli) (Conventional Commits)

## 🛠️ Configuración del Proyecto

### Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AlexMunozDevWeb/next-shop.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   - Renombra el archivo `.env.template` a `.env`.
   - Cambia las variables de entorno con tus credenciales.
4. Configura la base de datos (requiere Docker):
   ```bash
   docker compose up -d
   ```
   _Esto levantará una base de datos Postgres 17 en el puerto 5432._
5. Ejecutar las migraciones de Prisma:
   ```bash
   npx prisma migrate dev
   ```
   Ejemplo al crear una migración (cambio en el schema.prisma)
   ```bash
   npx prisma migrate dev -n country
   ```
6. Ejecutar seed:
   ```bash
   npm run seed
   ```
7. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 📝 Flujo de Trabajo

### Commits

Este proyecto utiliza **Conventional Commits**. Para realizar un commit, utiliza el siguiente comando:

```bash
npm run commit
```

Esto abrirá un asistente interactivo para guiarte en la creación del mensaje de commit siguiendo los estándares.

### Linting y Formateo

El proyecto tiene configurados hooks de Git para asegurar la calidad del código antes de cada commit. Si deseas ejecutarlo manualmente:

```bash
npm run lint    # Ejecutar ESLint
# Prettier se ejecuta automáticamente en archivos guardados y durante el proceso de commit
```

## 🏗️ Estructura del Proyecto

- `src/app/`: Rutas y páginas de la aplicación.
- `src/modules/`: Componentes, configuración, servicios y lógica de negocio organizada por módulos.
  - `components/`: UI Reutilizable (TopMenu, Sidebar, Footer, etc.).
  - `config/`: Configuraciones globales (fuentes, etc.).
  - `seed/`: Datos iniciales para desarrollo.
- `public/`: Archivos estáticos e imágenes de productos.

---

Desarrollado por [Alex Muñoz](https://github.com/AlexMunozDevWeb)
