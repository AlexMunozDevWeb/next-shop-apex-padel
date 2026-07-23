# Teslo Shop - Next.js

Este es un proyecto de comercio electrónico construido con **Next.js** y **Tailwind CSS v4**, diseñado para ofrecer una experiencia de compra moderna y fluida.

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
