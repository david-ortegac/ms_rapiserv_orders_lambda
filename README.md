# MS Rapiserv Orders Lambda

Microservicio de órdenes implementado como AWS Lambda usando TypeScript, TypeORM, MySQL e InversifyJS con autenticación JWT.

## 🏗️ Arquitectura

Este proyecto sigue una **arquitectura hexagonal (Clean Architecture)** con las siguientes capas:

- **Domain**: Lógica de negocio y entidades de dominio
- **Application**: Servicios de aplicación e interfaces
- **Infrastructure**: Implementaciones de repositorios y fuentes de datos (MySQL con TypeORM)
- **Adapter**: Controladores REST y mappers (versión v1)
- **IoC**: Configuración de inyección de dependencias con InversifyJS
- **Utils**: Utilidades compartidas (validación JWT, etc.)

## 📋 Requisitos Previos

- Node.js 22.x o superior
- npm o yarn
- Acceso a base de datos MySQL
- Clave secreta JWT para validación de tokens

## 🚀 Instalación

```bash
# Instalar dependencias
npm install
```

## 🛠️ Scripts Disponibles

### Desarrollo

```bash
# Compilar TypeScript (modo desarrollo)
npm run build-app
```

### Build para Lambda

```bash
# Limpiar directorio de distribución
npm run clean

# Build completo con bundling de dependencias
npm run build

# Empaquetar para deploy (build + zip)
npm run package
```

### Linting y Formato

```bash
# Ejecutar linter
npm run lint

# Corregir problemas de linting
npm run lint:fix

# Formatear código con Prettier
npm run prettier
```

## 📦 Proceso de Build

El proyecto usa **esbuild** para crear un bundle optimizado que incluye:

1. Todo el código TypeScript compilado
2. Todas las dependencias necesarias (excepto aws-sdk)
3. Sourcemaps para debugging

El resultado se genera en la carpeta `dist/` con:

- `index.js` - Lambda handler y todo el código bundled
- `index.js.map` - Sourcemap
- `package.json` - Metadata del paquete

## 🚢 Despliegue a AWS Lambda

### Opción 1: Manual

```bash
# 1. Generar el paquete
npm run package

# 2. Subir el archivo .zip generado en releases/ a AWS Lambda
```

### Opción 2: AWS CLI

```bash
# Build y package
npm run package

# Deploy usando AWS CLI
aws lambda update-function-code \
  --function-name tu-funcion-lambda \
  --zip-file fileb://releases/ms-orders-lambda-v0.0.1.zip
```

## 🏃 Ejecución Local (Desarrollo)

Para probar localmente, puedes usar AWS SAM CLI:

```bash
# Instalar SAM CLI primero
# https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

# Invocar localmente
sam local invoke -e event.json
```

## 🔧 Configuración

### Variables de Entorno

Configura las siguientes variables en tu función Lambda:

```bash
# Base de datos MySQL
DB_HOST=tu-host-mysql
DB_PORT=3306
DB_USERNAME=tu-usuario
DB_PASSWORD=tu-password
DB_DATABASE=tu-base-de-datos

# Autenticación JWT
JWT_SECRET=tu-clave-secreta-jwt
JWT_ISSUER=tu-issuer-opcional
JWT_AUDIENCE=tu-audience-opcional

# Entorno
NODE_ENV=production
```

**Nota**: El proyecto usa variables de entorno para la configuración de la base de datos y JWT. Asegúrate de configurar todas las variables necesarias en tu función Lambda.

## 📁 Estructura del Proyecto

```
src/
├── adapter/                    # Controladores REST y mappers
│   └── restful/
│       └── v1/
│           └── controller/     # Controladores y entidades de adapter
│               ├── Entity/     # Entidades del adapter
│               └── Mapper/     # Mappers del adapter
├── application/                # Servicios de aplicación e interfaces
│   └── services/               # Interfaces de servicios
├── domain/                     # Lógica de negocio y entidades
│   ├── Entities/               # Entidades de dominio
│   └── OrderServiceImpl.ts     # Implementación de servicios de dominio
├── infraestructure/            # Repositorios y conexión a DB
│   └── mysql/
│       ├── Entity/             # Entidades de TypeORM
│       ├── Mapper/             # Mappers de infraestructura
│       ├── Respository/        # Repositorios de MySQL
│       └── data-source.ts      # Configuración de TypeORM
├── ioc/                        # Configuración de inyección de dependencias
│   ├── inversify.config.ts     # Configuración de InversifyJS
│   └── Types.ts                # Tipos para inyección de dependencias
└── utils/                      # Utilidades compartidas
    └── jwt-validator.ts        # Validación de tokens JWT

build.config.mjs                 # Configuración de build con esbuild
tsconfig.json                    # Configuración de TypeScript
eslint.config.mjs                # Configuración de ESLint
```

## 🧪 Testing

```bash
# TODO: Implementar tests
npm test
```

## 📝 Notas Importantes

1. **Reflect Metadata**: El proyecto usa decoradores y necesita `reflect-metadata`. El bundling con esbuild incluye esta dependencia automáticamente.
2. **TypeORM**: Se usa TypeORM para la gestión de la base de datos MySQL. La conexión se inicializa una sola vez y se reutiliza entre invocaciones de Lambda.
3. **InversifyJS**: Inyección de dependencias usando InversifyJS para mantener bajo acoplamiento y facilitar el testing.
4. **Autenticación JWT**: Todas las peticiones requieren un token JWT válido en el header `Authorization`. El validador JWT está implementado en `utils/jwt-validator.ts`.
5. **Reutilización de Conexiones**: El handler Lambda reutiliza la conexión de base de datos y el controlador entre invocaciones para optimizar el rendimiento.
6. **Tamaño del Bundle**: El bundle final incluye todas las dependencias. Monitorea el tamaño para mantenerlo optimizado.
7. **Target Node.js**: El build está configurado para Node.js 22 (target: node22).

## 🐛 Troubleshooting

### Error: Cannot find module 'reflect-metadata'

✅ **Solucionado**: El nuevo proceso de build con esbuild incluye todas las dependencias.

### Error: ErrorOptions not found

✅ **Solucionado**: Actualizado tsconfig.json a ES2022.

### Error: Cannot find name 'console'

✅ **Solucionado**: Agregado `"types": ["node"]` en `tsconfig.json` para incluir los tipos de Node.js.

### Error: Cannot find module

Verifica que todas las dependencias estén instaladas con `npm install`.

### Error al comprimir

Verifica que tienes `bestzip` instalado y que el directorio `releases/` existe.

### Error de autenticación JWT

Asegúrate de configurar correctamente la variable de entorno `JWT_SECRET` y que el token JWT se envíe en el header `Authorization` con el formato `Bearer <token>`.

## 🔐 Seguridad

El proyecto incluye validación de JWT mediante el módulo `utils/jwt-validator.ts`. Todas las peticiones deben incluir un token JWT válido para ser procesadas.

### Autenticación JWT

El token JWT debe ser enviado en el header `Authorization` con el formato Bearer:

```
Authorization: Bearer <token_jwt>
```

**Importante**: El token JWT debe ser generado desde el microservicio `ms_auth_lambda`. Solo los tokens emitidos por este servicio serán aceptados y validados.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👥 Autor

David Ortega
