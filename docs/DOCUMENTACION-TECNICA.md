# Documentación Técnica — Apex Padel Store

> Documentación técnica de referencia del proyecto **next-shop-apex-padel**.
> Aplicación de comercio electrónico (e-commerce) de material de pádel construida con **Next.js (App Router)**, **TypeScript**, **Prisma/PostgreSQL**, **NextAuth** y **Tailwind CSS v4**, siguiendo una aproximación de **arquitectura hexagonal**.

---

## Tabla de contenidos

1. [Descripción general](#1-descripción-general)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Requisitos previos](#3-requisitos-previos)
4. [Instalación y puesta en marcha](#4-instalación-y-puesta-en-marcha)
5. [Variables de entorno](#5-variables-de-entorno)
6. [Scripts de npm](#6-scripts-de-npm)
7. [Modelo de datos](#7-modelo-de-datos)
8. [Rutas y páginas](#8-rutas-y-páginas)
9. [Autenticación y autorización](#9-autenticación-y-autorización)
10. [Estado global del cliente](#10-estado-global-del-cliente)
11. [Flujo de compra](#11-flujo-de-compra)
12. [Pagos con PayPal](#12-pagos-con-paypal)
13. [Gestión de imágenes](#13-gestión-de-imágenes)
14. [Internacionalización, formato y temas](#14-internacionalización-formato-y-temas)
15. [Seed y datos iniciales](#15-seed-y-datos-iniciales)
16. [Calidad de código y flujo de trabajo](#16-calidad-de-código-y-flujo-de-trabajo)
17. [Despliegue y build](#17-despliegue-y-build)
18. [Consideraciones y notas de implementación](#18-consideraciones-y-notas-de-implementación)

---

## 1. Descripción general

**Apex Padel Store** es una tienda online de equipamiento de pádel (palas, calzado y textil). Permite a los usuarios:

- Navegar un catálogo paginado y filtrar por género (`men`, `women`, `kid`, `unisex`).
- Ver el detalle de cada producto con galería de imágenes y especificaciones.
- Añadir productos al carrito (con control de talla y cantidad).
- Registrarse e iniciar sesión.
- Gestionar una dirección de entrega.
- Realizar pedidos y pagarlos con PayPal.
- Consultar el historial de pedidos.

Los administradores (`role = admin`) disponen además de:

- CRUD de productos (alta/edición, subida y borrado de imágenes).
- Supervisión global de pedidos.
- Gestión de roles de usuarios.

La lógica de negocio se organiza **por dominios/módulos** y el núcleo permanece independiente de los detalles técnicos (framework, ORM, proveedores externos), según el enfoque hexagonal descrito en `AGENTS.md`.

---

## 2. Stack tecnológico

### Núcleo

| Categoría     | Tecnología                                   | Versión        |
| ------------- | -------------------------------------------- | -------------- |
| Framework     | Next.js (App Router)                         | 16.2.4         |
| UI            | React / React DOM                            | 19.2.4         |
| Lenguaje      | TypeScript                                   | ^5             |
| Estilos       | Tailwind CSS (config CSS-first vía `@theme`) | ^4             |
| Base de datos | PostgreSQL                                   | 17 (alpine)    |
| ORM           | Prisma (`prisma-client`)                     | ^7.8.0         |
| Driver de BD  | `@prisma/adapter-pg` + `pg`                  | ^7.8.0         |
| Autenticación | NextAuth (Auth.js)                           | ^5.0.0-beta.31 |
| Hashing       | bcryptjs                                     | ^3.0.3         |
| Validación    | Zod                                          | ^4.4.3         |

### Librerías de soporte

| Categoría            | Tecnología                         |
| -------------------- | ---------------------------------- |
| Estado global        | Zustand (`persist`)                |
| Formularios          | react-hook-form                    |
| Pagos                | `@paypal/react-paypal-js`          |
| Imágenes             | Cloudinary (server) + `next/image` |
| Carrusel             | Swiper                             |
| Iconografía          | react-icons (`io5`)                |
| Utilidades de clases | clsx                               |
| UUID                 | uuid                               |
| Variables de entorno | dotenv                             |

### Calidad y DX

| Herramienta    | Propósito                                               |
| -------------- | ------------------------------------------------------- |
| ESLint 9       | Linting con `eslint-config-next` (core-web-vitals + TS) |
| Prettier 3     | Formateo (`prettier-plugin-tailwindcss`)                |
| Husky 9        | Git hooks (`pre-commit`)                                |
| lint-staged 16 | Lint + formato solo a archivos en stage                 |
| Commitizen     | Commits con _Conventional Commits_ (`npm run commit`)   |
| tsx            | Ejecución de scripts TS (seed)                          |

> El proyecto activa el **React Compiler** (`reactCompiler: true` en `next.config.ts`).

---

## 3. Requisitos previos

- **Node.js 18+** (recomendado 20+).
- **npm**.
- **Docker** (opcional pero recomendado) para levantar PostgreSQL localmente.

---

## 4. Instalación y puesta en marcha

```bash
# 1. Clonar el repositorio
git clone https://github.com/AlexMunozDevWeb/next-shop.git

# 2. Instalar dependencias (ejecuta `prisma generate` en postinstall)
npm install

# 3. Configurar variables de entorno
#    Copiar .env.template a .env y completar credenciales
copy .env.template .env        # Windows

# 4. Levantar PostgreSQL (docker-compose.yml en la raíz)
docker compose up -d

# 5. Aplicar migraciones de Prisma
npx prisma migrate dev

# 6. Poblar la base de datos con datos de ejemplo
npm run seed

# 7. Arrancar el servidor de desarrollo
npm run dev
```

La aplicación queda disponible en [http://localhost:3000](http://localhost:3000).

### Base de datos local (Docker)

`docker-compose.yml` define un servicio `db` con la imagen `postgres:17-alpine`:

- Contenedor: `next-shop-db`.
- Puerto: `5432`.
- Volumen persistente: `./postgres-data`.
- Credenciales por defecto: usuario `postgres`, base `next-shop`, contraseña `postgres` (configurables con `DB_USER`, `DB_NAME`, `DB_PASSWORD`).

---

## 5. Variables de entorno

Referencia basada en `.env.template` (el archivo real `.env` no se versiona).

| Variable                       | Descripción                                              | Obligatoria        |
| ------------------------------ | -------------------------------------------------------- | ------------------ |
| `DB_USER`                      | Usuario de PostgreSQL (docker-compose)                   | Sí                 |
| `DB_NAME`                      | Nombre de la base de datos (docker-compose)              | Sí                 |
| `DB_PASSWORD`                  | Contraseña de PostgreSQL (docker-compose)                | Sí                 |
| `DATABASE_URL`                 | Cadena de conexión usada por Prisma                      | Sí                 |
| `AUTH_SECRET`                  | Secreto de firma de NextAuth (`openssl rand -base64 32`) | Sí                 |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Client ID público de PayPal                              | Sí (para pagos)    |
| `PAYPAL_SECRET`                | Secret de PayPal (servidor)                              | Sí (para pagos)    |
| `PAYPAL_OAUTH_URL`             | Endpoint OAuth2 de PayPal                                | Sí (para pagos)    |
| `PAYPAL_ORDERS_URL`            | Endpoint de órdenes de PayPal                            | Sí (para pagos)    |
| `CLOUDINARY_URL`               | Credenciales de Cloudinary para subir imágenes           | Sí (para imágenes) |
| `STITCH_API_KEY`               | API key para el MCP de Stitch (diseño, tooling)          | No                 |

Ejemplo de `DATABASE_URL`:

```
postgresql://postgres:123456@localhost:5432/next-shop?schema=public
```

> `prisma.config.ts` carga `dotenv/config` y toma `DATABASE_URL` desde el entorno.
> El cliente Prisma (`src/modules/shared/lib/prisma.ts`) también importa `dotenv/config` y construye el adaptador `PrismaPg` con esa cadena.

---

## 6. Scripts de npm

Definidos en `package.json`:

| Script          | Comando                                 | Descripción                               |
| --------------- | --------------------------------------- | ----------------------------------------- |
| `dev`           | `next dev`                              | Servidor de desarrollo                    |
| `build`         | `prisma generate && next build`         | Genera el cliente Prisma y compila la app |
| `start`         | `next start`                            | Servidor de producción                    |
| `lint`          | `eslint`                                | Análisis estático                         |
| `prepare`       | `husky`                                 | Instala los hooks de Git                  |
| `commit`        | `cz`                                    | Commit guiado (Commitizen)                |
| `postinstall`   | `prisma generate`                       | Genera el cliente tras `npm install`      |
| `prisma:deploy` | `npx prisma migrate deploy`             | Aplica migraciones en despliegue          |
| `seed`          | `tsx src/modules/seed/seed-database.ts` | Ejecuta el seed de datos                  |

---

## 7. Modelo de datos

Definido con Prisma en `prisma/schema.prisma`. El cliente generado se emite en `src/generated/prisma` (carpeta ignorada por Git y por ESLint).

### Enums

| Enum     | Valores                      |
| -------- | ---------------------------- |
| `Size`   | `XS, S, M, L, XL, XXL, XXXL` |
| `Gender` | `men, women, kid, unisex`    |
| `Role`   | `admin, user`                |

### Entidades y relaciones

```mermaid
erDiagram
    Category     ||--o{ Product       : "clasifica"
    Product      ||--o{ ProductImage  : "tiene"
    Product      ||--o{ OrderItem     : "aparece en"
    User         ||--o{ Order         : "realiza"
    User         ||--o| UserAddress   : "guarda"
    Country      ||--o{ UserAddress   : "ubica"
    Country      ||--o{ OrderAddress  : "ubica"
    Order        ||--o{ OrderItem     : "contiene"
    Order        ||--o| OrderAddress  : "envía a"
```

| Modelo         | Descripción                               | Campos clave                                                                                                                                                                              |
| -------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Category`     | Categoría de producto                     | `id` (uuid), `name` (unique), `Product[]`                                                                                                                                                 |
| `Product`      | Producto del catálogo                     | `id` (uuid), `title`, `description`, `inStock`, `price`, `sizes: Size[]`, `slug` (unique), `tags: String[]`, `gender`, `categoryId`, `ProductImage[]`, `OrderItem[]` (índice en `gender`) |
| `ProductImage` | Imagen de un producto                     | `id` (autoincrement), `url`, `productId`                                                                                                                                                  |
| `User`         | Usuario autenticado                       | `id` (uuid), `name`, `email` (unique), `emailVerified`, `password`, `role` (`user` por defecto), `image`, `userAddress?`, `Order[]`                                                       |
| `Country`      | País para direcciones                     | `id`, `name`, `UserAddress[]`, `OrderAddress[]`                                                                                                                                           |
| `UserAddress`  | Dirección por defecto del usuario (1‑a‑1) | `id`, datos de dirección, `countryId`, `userId` (unique)                                                                                                                                  |
| `Order`        | Pedido                                    | `id` (uuid), `subTotal`, `tax`, `total`, `itemsInOrder`, `isPaid`, `paidAt`, `createdAt`, `updatedAt`, `userId`, `OrderItem[]`, `OrderAddress?`, `transactionId`                          |
| `OrderItem`    | Línea de pedido                           | `id`, `quantity`, `price`, `size`, `orderId`, `productId`                                                                                                                                 |
| `OrderAddress` | Dirección de envío del pedido (1‑a‑1)     | `id`, datos de dirección, `countryId`, `orderId` (unique)                                                                                                                                 |

### Migraciones

Ubicadas en `prisma/migrations/`:

```
20260424134850_product_category
20260424135210_product_image
20260513170855_user_role
20260516110447_country
20260519161502_user_address
20260519164036_add_city_to_user_address
20260525145508_order_address_items
20260528172553_transaction_id
```

Comandos habituales:

```bash
npx prisma migrate dev                 # aplicar/crear migraciones en desarrollo
npx prisma migrate dev -n <nombre>     # crear una nueva migración
npx prisma migrate deploy              # aplicar en entornos gestionados (prod)
```

---

## 8. Rutas y páginas

Estructura basada en **App Router** con _route groups_. El detalle completo está en [`PAGES.md`](./PAGES.md). Resumen:

### Rutas públicas (grupo `(shop)`)

| Ruta                | Archivo                                       | Notas                                     |
| ------------------- | --------------------------------------------- | ----------------------------------------- |
| `/`                 | `src/app/(shop)/page.tsx`                     | Home con hero, categorías y grid paginado |
| `/product/[slug]`   | `src/app/(shop)/product/[slug]/page.tsx`      | Detalle de producto (`generateMetadata`)  |
| `/gender/[gender]`  | `src/app/(shop)/gender/[gender]/page.tsx`     | Catálogo filtrado por género              |
| `/cart`             | `src/app/(shop)/cart/page.tsx`                | Carrito                                   |
| `/checkout`         | `src/app/(shop)/checkout/(checkout)/page.tsx` | Resumen y confirmación del pedido         |
| `/checkout/address` | `src/app/(shop)/checkout/address/page.tsx`    | Formulario de dirección                   |
| `/orders`           | `src/app/(shop)/orders/page.tsx`              | Historial del usuario                     |
| `/orders/[id]`      | `src/app/(shop)/orders/[id]/page.tsx`         | Detalle del pedido + pago PayPal          |
| `/profile`          | `src/app/(shop)/profile/page.tsx`             | Perfil del usuario                        |
| `/empty`            | `src/app/(shop)/empty/page.tsx`               | Estado de carrito vacío                   |

### Rutas de autenticación (grupo `auth`)

| Ruta                | Archivo                             |
| ------------------- | ----------------------------------- |
| `/auth/login`       | `src/app/auth/login/page.tsx`       |
| `/auth/new-account` | `src/app/auth/new-account/page.tsx` |

### Rutas de administración (anidadas en `(shop)/admin`)

| Ruta                    | Archivo                                        |
| ----------------------- | ---------------------------------------------- |
| `/admin/products`       | `src/app/(shop)/admin/products/page.tsx`       |
| `/admin/product/[slug]` | `src/app/(shop)/admin/product/[slug]/page.tsx` |
| `/admin/orders`         | `src/app/(shop)/admin/orders/page.tsx`         |
| `/admin/users`          | `src/app/(shop)/admin/users/page.tsx`          |

### Layouts

| Layout                               | Responsabilidad                                                |
| ------------------------------------ | -------------------------------------------------------------- |
| `src/app/layout.tsx`                 | Root layout: fuentes (Manrope/Inter), tema oscuro, `Providers` |
| `src/app/(shop)/layout.tsx`          | Chrome de tienda: `TopMenu`, `Sidebar`, `Footer`               |
| `src/app/(shop)/admin/layout.tsx`    | Guard de rol: redirige si `role !== 'admin'`                   |
| `src/app/(shop)/checkout/layout.tsx` | Guard de sesión: exige autenticación (`?redirectTo`)           |
| `src/app/auth/layout.tsx`            | Exige **no** estar autenticado; redirige a `/` si hay sesión   |

### Estrategias de renderizado y caché

| Página             | `revalidate` | Comentario       |
| ------------------ | ------------ | ---------------- |
| Home               | `60`         | ISR cada 60 s    |
| `/gender/[gender]` | `60`         | ISR cada 60 s    |
| `/product/[slug]`  | `608400`     | ISR (~7 días)    |
| Admin y pedidos    | `0`          | Siempre dinámico |

Los controllers invocan `revalidatePath(...)` tras mutaciones (productos, pagos) para invalidar cachés.

---

## 9. Autenticación y autorización

Configurada con **NextAuth (Auth.js) v5** sobre una sesión **JWT** y proveedor de **Credentials**.

### Configuración — `src/auth.config.ts`

- `pages.signIn = /auth/login` y `pages.newUser = /auth/new-account`.
- `providers`: `Credentials` con validación Zod (`email` válido y `password` de mínimo 6 caracteres).
- `authorize`:
  1. Normaliza el email a minúsculas y busca al usuario en Prisma.
  2. Compara la contraseña con `bcryptjs.compareSync`.
  3. Retorna el usuario **sin** el campo `password`.
- Callbacks:
  - `jwt`: copia el usuario al `token.data` cuando inicia sesión.
  - `session`: expone `token.data` como `session.user`.
- Exporta `signIn`, `signOut`, `auth` y `handlers`.

### Tipado de sesión — `nextauth.d.ts`

Amplía los tipos de `next-auth` y `next-auth/jwt` para incluir `id`, `role`, `emailVerified` e `image` tanto en `Session.user`, `User` como en `JWT.data`.

### Middleware/proxy — `src/proxy.ts`

Exporta `NextAuth(authConfig).auth` con un `matcher` que excluye `api`, `_next/static`, `_next/image` y `*.png`. El callback `authorized()` devuelve siempre `true`, de modo que la protección fina se realiza en los **layouts** y **controllers** (server-side).

### Protección por capas

- **Layouts** (guard de navegación): `(shop)/admin/layout.tsx`, `(shop)/checkout/layout.tsx`, `auth/layout.tsx`.
- **Controllers** (guard de dominio/datos): p. ej. `serverUserController` y `serverOrderController` usan `auth()` y la regla de negocio `canManageUsers(role)` (`role === 'admin'`) antes de exponer datos sensibles.

### Roles

Se gestionan con el enum `Role` (`admin` | `user`). El cambio de rol se realiza desde `/admin/users` a través de la Server Action `changeUserRoleAction`, que delega en `serverUserController.changeUserRole` (verifica admin) y en `userRepository.changeUserRole`.

---

## 10. Estado global del cliente

Implementado con **Zustand**. Exportado desde `src/modules/store/index.ts`.

| Store             | Archivo                          | Persistencia                       | Responsabilidad                              |
| ----------------- | -------------------------------- | ---------------------------------- | -------------------------------------------- |
| `useCartStore`    | `store/cart/cart-store.ts`       | `localStorage` (`shopping-cart`)   | Carrito: añadir/actualizar/eliminar, totales |
| `useAddressStore` | `store/address/address-store.ts` | `localStorage` (`address-storage`) | Dirección durante el checkout                |
| `useUIStore`      | `store/ui/ui-store.ts`           | No                                 | Estado del menú lateral (`isSideMenuOpen`)   |

Detalles relevantes:

- `useCartStore` distingue ítems por `id + size` y calcula `getSummaryInformation()` con la tasa de impuestos compartida `TAX_RATE` (importada del dominio de `order`).
- Los componentes que leen estado persistido usan `useSyncExternalStore` para evitar _hydration mismatch_ (patrón visto en `TopMenu`, `OrderSummary`, `ProductsInCart`, `PlaceOrder`).

---

## 11. Flujo de compra

```mermaid
sequenceDiagram
    participant U as Usuario
    participant C as Carrito (Zustand)
    participant A as /checkout/address
    participant S as /checkout
    participant SA as Server Action (placeOrder)
    participant DB as PostgreSQL
    participant P as /orders/[id] + PayPal

    U->>C: Añade productos (AddToCart)
    U->>A: Define dirección de entrega
    A-->>C: Guarda dirección (address-store)
    U->>S: Verifica resumen (PlaceOrder)
    S->>SA: placeOrder(productIds, address)
    SA->>DB: Transacción: descuenta stock, crea Order, OrderItem, OrderAddress
    DB-->>SA: order.id
    SA-->>S: { ok, order }
    S-->>U: Redirige a /orders/[id] y limpia carrito
    U->>P: Paga con PayPal
    P->>DB: paypalCheckPayment → isPaid = true, paidAt = now
```

Puntos clave:

1. `PlaceOrder` construye `ProductToOrder[]` desde el carrito y llama a la Server Action `placeOrder`.
2. `orderRepository.placeOrder` ejecuta una **transacción Prisma**:
   - Descuenta `inStock` de cada producto (lanza error si queda negativo).
   - Crea la `Order` y sus `OrderItem` en lote.
   - Crea la `OrderAddress` a partir de la dirección del checkout.
3. Con éxito, el carrito se limpia y se navega a `/orders/[id]`.
4. El pago se completa con PayPal (ver siguiente sección).

---

## 12. Pagos con PayPal

Integración basada en `@paypal/react-paypal-js` y llamadas REST a la API de PayPal.

### Cliente

- `src/modules/payments/ui/providers/Provider.tsx`: envuelve la app con `PayPalScriptProvider` (`intent: 'capture'`, `currency: 'EUR'`) y `SessionProvider` de NextAuth.
- `src/modules/payments/ui/components/PayPalButton.tsx`:
  - `createOrder`: crea la orden en PayPal con `invoice_id = order.id`, importe redondeado a 2 decimales, y persiste el `transactionId` vía `setTransactionId`.
  - `onApprove`: captura el pago y llama a `paypalCheckPayment(details.id)`.

### Servidor

`src/modules/payments/infra/paymentRepository.ts`:

- `setTransactionId(orderId, transactionId)`: guarda el `transactionId` en la orden.
- `paypalCheckPayment(paypalTransactionId)`:
  1. Obtiene un **Bearer token** (`getPayPalBearerToken`) mediante Basic Auth con `NEXT_PUBLIC_PAYPAL_CLIENT_ID` y `PAYPAL_SECRET`.
  2. Consulta la orden en PayPal (`verifyPayPalPayment`).
  3. Verifica que `status === 'COMPLETED'` y, si procede, marca la orden como pagada (`isPaid = true`, `paidAt = new Date()`).

> Los endpoints se configuran con `PAYPAL_OAUTH_URL` y `PAYPAL_ORDERS_URL` (por defecto, entorno _sandbox_).

---

## 13. Gestión de imágenes

- **Almacenamiento:** Cloudinary. Configurado en `src/modules/products/infra/productRepository.ts` con `cloudinary.config(process.env.CLOUDINARY_URL ?? '')`.
- **Subida:** `uploadImages` convierte cada `File` a `data:image/png;base64,...` y llama a `cloudinary.uploader.upload`, almacenando el `secure_url`.
- **Borrado:** `deleteProductImage` extrae el nombre público de la URL y llama a `cloudinary.uploader.destroy`, luego elimina el registro `ProductImage`.
- **Render:** `ProductImage` resuelve la fuente:
  - URL absoluta (`http...`) → se usa tal cual.
  - Nombre relativo → `/products/<archivo>` (imágenes del seed en `public/products`).
  - Sin fuente → `/imgs/placeholder.jpg`.
- **Optimización:** `next.config.ts` habilita `res.cloudinary.com` en `images.remotePatterns`.

---

## 14. Internacionalización, formato y temas

- **Idioma:** la app está en español (`<html lang="es">`).
- **Formato de moneda:** `currencyFormat` usa `Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })`.
- **Tipografías:** `titleFont = Manrope`, `mainFont = Inter` (cargadas con `next/font/google` y expuestas como variables CSS).
- **Tema:** tema oscuro por defecto, definido en `src/app/globals.css` mediante directiva `@theme` de Tailwind v4.
  - Superficies: `--color-surface*`.
  - Primario: `--color-primary-fixed: #caf300`.
  - Utilidades propias: `.app-container`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-disabled`, `.btn-danger`, `.glass-panel-dark`, `.fade-in`, `.no-scrollbar`.

---

## 15. Seed y datos iniciales

- Punto de entrada: `src/modules/seed/seed-database.ts` (ejecutado con `tsx`).
- Datos: `src/modules/seed/seed.ts` (usuarios, categorías y productos) y `src/modules/seed/seed-countries.ts` (países).
- Comportamiento:
  1. Limpia tablas (orders, order items/addresses, users, user addresses, countries, product images, products, categories).
  2. Crea usuarios (`createMany`), países y categorías.
  3. Mapea categorías por nombre y crea productos con sus imágenes.
  4. El script **no se ejecuta** si `NODE_ENV === 'production'`.

> Los usuarios del seed usan contraseña `123456` (hasheada) e incluyen un `admin`. Es material únicamente para desarrollo.

---

## 16. Calidad de código y flujo de trabajo

### Lint y formato

- **ESLint** (`eslint.config.mjs`): extiende `eslint-config-next/core-web-vitals` y `.../typescript`; ignora `.next/**`, `out/**`, `build/**`, `next-env.d.ts` y `src/generated/**`.
- **Prettier** (`.prettierrc`): sin punto y coma, comillas simples, `printWidth: 120`, `singleAttributePerLine: true`, plugin de Tailwind.

### Git hooks

- **Husky** con hook `pre-commit`.
- **lint-staged**:
  - `*.{js,jsx,ts,tsx}` → `eslint --fix` + `prettier --write`.
  - `*.{json,md,css}` → `prettier --write`.

### Conventional Commits

- Commitizen configurado (`npm run commit`) con `cz-conventional-changelog`.
- Ejemplos de mensajes del historial: `feat(auth): ...`, `fix(prisma): ...`, `refactor(components): ...`.

---

## 17. Despliegue y build

```bash
npm run build     # prisma generate + next build
npm run start     # next start
```

Notas:

- El build requiere `DATABASE_URL` válida porque `prisma generate` se ejecuta primero.
- En entornos gestionados, aplicar migraciones con `npm run prisma:deploy`.
- El seed no se ejecuta en producción por diseño.
- Superficie de despliegue: aplicación Next.js + PostgreSQL + servicios externos (Cloudinary, PayPal).

---

## 18. Consideraciones y notas de implementación

- **Arquitectura hexagonal:** cada módulo separa `domain` (reglas), `infra` (puertos + adaptadores), `controller` (adaptadores de entrada) y `ui` (presentación). Ver [`ARQUITECTURE.md`](./ARQUITECTURE.md) para el detalle.
- **Server Actions:** las acciones (`*Actions.ts`) son la superficie pública segura (`'use server'`) que consume la UI; internamente crean un controller server-side y llaman al repositorio.
- **Validación en dos niveles:** el esquema Zod del controller valida los datos entrantes (p. ej. `productSchema`) antes de delegar en infraestructura.
- **Imágenes de pedido:** el seed referencia imágenes en `public/products`; las imágenes subidas por el admin viven en Cloudinary (URLs absolutas). Ambos casos se resuelven en `ProductImage`.
- **`generateMetadata`** de producto usa `product.images[1]` para Open Graph; con imágenes de Cloudinary se espera URL absoluta.
- **Redirecciones de guard:** el layout de admin redirige a `/login` (ruta inexistente en este proyecto), mientras que el de checkout usa `/auth/login?redirectTo=...`. Conviene unificar a `/auth/login` si se desea consistencia.
- **`TODO` pendiente:** documentar Prisma y migraciones en GitBook (comentario en `schema.prisma`).

---

### Referencias cruzadas

- Estructura y decisiones de arquitectura: [`ARQUITECTURE.md`](./ARQUITECTURE.md)
- Inventario de páginas: [`PAGES.md`](./PAGES.md)
- Guía de trabajo del repositorio: [`AGENTS.md`](../AGENTS.md)
- Guía de inicio rápido: [`README.md`](../README.md)
