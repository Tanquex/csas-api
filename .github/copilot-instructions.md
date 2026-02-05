## Propósito

Guía breve para agentes IA que trabajan en este repositorio NestJS minimal (`csas-api`). Contiene el panorama general, comandos clave, patrones y ejemplos extraídos del código.

## Big picture (arquitectura)

- Proyecto NestJS monolítico y sencillo: `AppModule` registra controladores y providers.
- Entrada: `src/main.ts` — levanta el servidor y respeta `process.env.PORT` (por defecto 3000).
- Rutas/negocio: controladores en `src/*.controller.ts` y lógica en `src/*.service.ts` (inyección por constructor).
- Tests: unitarios en `src/**/*.spec.ts` (jest `rootDir: src`) y e2e en `test/` (`test/app.e2e-spec.ts`).

## Comandos y flujos de desarrollo

- Instalar dependencias: `npm install`
- Desarrollo (watch): `npm run start:dev` (usa `nest start --watch`).
- Build: `npm run build` (usa `nest build`).
- Ejecutar producción: `npm run start:prod` (ejecuta `node dist/main`).
- Lint + formateo: `npm run lint`, `npm run format` (Prettier + ESLint configurado en `eslint.config.mjs`).
- Tests:
  - Unit: `npm run test` (Jest, transform `ts-jest`).
  - E2E: `npm run test:e2e` (usa `test/jest-e2e.json`).
  - Cobertura: `npm run test:cov`.
  - Debug tests: `npm run test:debug` (arranca Node inspector con `ts-node` y `tsconfig-paths`).

## Patrones y convenciones del proyecto

- Módulos: `src/app.module.ts` agrupa `controllers` y `providers`. Para añadir un controlador, registrarlo en la matriz `controllers`.
- Inyección: los `Service` se inyectan vía constructor en los `Controller`s (ver `src/app.controller.ts`).
- Entrypoint minimal: evitar lógica pesada en `main.ts`; pliegue de configuración por variables de entorno.
- Tests e2e usan `supertest` y crean la app con `Test.createTestingModule({ imports: [AppModule] })` (ver `test/app.e2e-spec.ts`).
- Typescript: el proyecto usa `tsconfig-paths` y `ts-node` en scripts debug; respetar resoluciones de path si añades alias.

## Integraciones y dependencias relevantes

- Dependencias clave: `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`, `rxjs`.
- Dev tools: `ts-jest`, `ts-node`, `tsconfig-paths`, `eslint`, `prettier`, `jest`.
- No hay configuraciones de base de datos, cola o servicios externos en el código inicial; si añades integraciones, documenta las variables de entorno y los módulos que consumen los clientes.

## Ejemplos concretos para ediciones comunes

- Añadir ruta GET simple: ver `src/app.controller.ts` — usa decorador `@Get()` y delega a un `Service`.
- Añadir provider: crear `src/mi.service.ts` con `@Injectable()` y añadirlo a `providers` en `src/app.module.ts`.
- Ejecutar e2e localmente: `npm run test:e2e` — asegúrate que `PORT` no choque con servicios locales.

## Pistas para agentes IA

- Prioriza entender `src/app.module.ts`, `src/app.controller.ts`, `src/app.service.ts` y `src/main.ts` antes de cambiar rutas.
- Cuando modifiques tests, recuerda que Jest espera fuentes en `src/` (ver `jest.rootDir`).
- Para debugging rápido, use `npm run start:debug` o `npm run test:debug` según el caso.
- Mantén las transformaciones TypeScript consistentes con `ts-jest` y no asumas configuraciones adicionales fuera de `tsconfig.json`.

Si alguna sección está incompleta o quieres que añada ejemplos de cómo implementar un nuevo módulo/entidad, dime qué caso quieres cubrir y lo amplio con snippets.
