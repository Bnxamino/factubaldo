# Factubaldo

## Descripción
Factubaldo es una aplicación web de facturación desarrollada con Next.js y Supabase. Permite a los usuarios gestionar clientes, servicios y facturas de manera eficiente, con funcionalidades de autenticación y almacenamiento en la nube.

## Tecnologías Utilizadas
- **Frontend:** Next.js + TypeScript
- **Backend:** Supabase (sin backend propio)
- **Base de datos:** PostgreSQL (Supabase)
- **Autenticación:** Supabase Auth (email + password o Magic Link)
- **Estilos:** Tailwind CSS
- **Almacenamiento en la nube:** Google Drive API (OAuth2)
- **Despliegue:** Vercel

## Estructura del Proyecto
```
factubaldo
├── public
│   └── favicon.ico
├── src
│   ├── components
│   ├── hooks
│   ├── lib
│   ├── pages
│   ├── styles
│   ├── types
│   └── utils
├── .env.local
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Funcionalidades Principales
1. **Autenticación:**
   - Login con email y contraseña (o Magic Link)
   - Gestión de sesión persistente
   - Protección de rutas privadas
   - Registro opcional de nuevos usuarios

2. **Dashboard:**
   - Mostrar facturas recientes
   - Navegación a secciones: clientes, servicios, configuración
   - Botón para crear nueva factura

3. **Clientes:**
   - CRUD completo
   - Campos: nombre, dirección, NIF/CIF, email, teléfono

4. **Servicios:**
   - CRUD completo
   - Campos: nombre, descripción, precio_unitario, IVA (%)

5. **Facturas:**
   - Crear, editar y eliminar facturas
   - Cálculo automático de totales
   - Descarga en PDF y almacenamiento en Google Drive

6. **Configuración:**
   - Datos de empresa y ajustes generales
   - Conexión a Google Drive vía OAuth2

## Instalación
1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```
   cd factubaldo
   ```
3. Instala las dependencias:
   ```
   npm install
   ```
4. Configura las variables de entorno en `.env.local`.

5. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o un pull request.

## Licencia
Este proyecto está bajo la Licencia MIT.