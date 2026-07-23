# AGENTS.md

## Contexto del proyecto

Este archivo sirve como guía de referencia para trabajar de forma consistente en una aplicación Next.js sencilla, gestionada con npm. Debe adaptarse al contexto del proyecto, priorizando claridad, mantenibilidad y buenas prácticas de desarrollo.

## Arquitectura principal

- El proyecto es una aplicación web moderna construida con Next.js.
- El enrutado se basa en App Router o en la estructura estándar del framework.
- La lógica de negocio debe organizarse en módulos o carpetas temáticas para mantener el código claro.
- La autenticación, internacionalización y utilidades compartidas pueden ubicarse en capas separadas cuando la app lo requiera.
- Se prefiere una estructura simple, escalable y fácil de entender sobre soluciones excesivamente complejas.

## Arquitectura hexagonal

Este proyecto sigue una aproximación de arquitectura hexagonal, donde la lógica de negocio se organiza alrededor de dominios, puertos y adaptadores, manteniendo el núcleo independiente de detalles técnicos como Next.js, APIs externas o almacenamiento.

- La capa de presentación corresponde a los componentes, páginas, layouts, route handlers y demás puntos de entrada del framework.
- La capa de controller actúa como adaptador de entrada. Recibe la solicitud del framework, extrae los datos necesarios, los convierte a un formato útil y delega la ejecución a los servicios o casos de uso del dominio. No debe contener reglas de negocio ni lógica de infraestructura.
- No se utiliza una capa de aplicación explícita como una capa independiente. La orquestación de casos de uso se resuelve directamente desde los controllers o desde servicios de dominio cuando la complejidad lo justifica.
- La capa de dominio contiene entidades, value objects, reglas de negocio y servicios de dominio.
- La capa de infraestructura contiene implementaciones concretas de repositorios, clientes HTTP, integraciones con bases de datos, autenticación y adaptadores externos.
- Los puertos definen contratos para interactuar con el dominio, mientras que los adaptadores implementan esas interfaces según el motor técnico concreto.

### Ubicación de los DTOs

Los DTOs deben ubicarse en la capa más cercana al uso que les da sentido:

- Si representan datos de entrada/salida del dominio, deben ir junto al módulo o dominio que los consume.
- Si son compartidos entre varios módulos o integraciones, pueden ubicarse en una carpeta shared dentro del módulo correspondiente o en una carpeta de tipos comunes del proyecto.
- No deben mezclarse con la lógica de UI ni con los componentes de presentación.
- En general, se recomienda mantener los DTOs cerca de los servicios, repositorios, controllers o adaptadores que los utilizan para evitar acoplamientos innecesarios.

### Creación de interfaces

Las interfaces deben crearse siguiendo este criterio:

- Las interfaces que representan contratos del dominio, como puertos o repositorios, se definen en la capa de dominio o en el módulo que las consume.
- Las implementaciones concretas de esas interfaces van en la capa de infraestructura.
- Si una interfaz es específica de un módulo concreto, debe permanecer cerca de ese módulo.
- Si una interfaz es compartida entre varios módulos, puede ubicarse en una carpeta shared o en un módulo común del proyecto.

## Estructura relevante

- src/app
  - Contiene las páginas, layouts y rutas principales de la aplicación.
  - Los grupos de rutas o segmentos pueden usarse para separar secciones por contexto.
- src/components
  - Contiene componentes reutilizables de UI.
- src/lib
  - Contiene utilidades, helpers, servicios y lógica compartida.
- src/modules o src/features
  - Contiene módulos o áreas funcionales del negocio cuando la aplicación crece.
- src/styles o src/app/globals.css
  - Contiene estilos globales y temas visuales.
- public
  - Contiene assets estáticos como imágenes, íconos y archivos públicos.

## Convenciones de desarrollo

- Mantener el código claro, modular y fácil de mantener.
- Preferir separar responsabilidades entre componentes, servicios, controllers y utilidades.
- Organizar la lógica por dominio o funcionalidad cuando la app crece.
- Usar TypeScript siempre que sea posible.
- Evitar duplicar lógica cuando ya exista una solución reutilizable.
- Mantener los componentes pequeños y enfocados en una sola responsabilidad.
- Los controllers deben ser delgados y traducir solicitudes externas al dominio, no implementar reglas de negocio.

## Estilo y tecnologías

- Next.js como framework principal.
- TypeScript para el desarrollo del proyecto.
- React y componentes funcionales.
- CSS Modules, Tailwind CSS o estilos globales según la configuración del proyecto.
- Librerías adicionales solo cuando aporten valor claro y sean mantenibles.

## Comandos frecuentes

Desde la raíz del proyecto:

- Instalar dependencias: npm install
- Ejecutar la aplicación en desarrollo: npm run dev
- Construir la aplicación para producción: npm run build
- Iniciar la aplicación en modo producción: npm run start
- Validar el proyecto con lint: npm run lint

## Reglas para cambios

- Antes de agregar nuevas rutas, componentes, controllers o servicios, revisar si ya existe una estructura similar.
- Mantener coherencia con el patrón de arquitectura del proyecto.
- Si se agregan nuevas páginas o vistas, verificar que se integren correctamente con el layout y el enrutado.
- Si se cambia lógica de autenticación, datos o estilos globales, revisar impacto en toda la aplicación.
- Si se agregan reglas de negocio, colocarlas en el dominio y no en el controller.
- Mantener el código alineado con las convenciones del proyecto y con la experiencia de usuario esperada.

## Recomendación general

Cuando trabajes en esta base, piensa en la aplicación como un sistema sencillo, bien organizado y escalable, donde la claridad, la consistencia y la facilidad de mantenimiento son prioridades.
