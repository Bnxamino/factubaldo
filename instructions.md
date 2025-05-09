Estoy desarrollando una aplicación web de facturación con Next.js y Supabase. Necesito que me ayudes a crear toda la estructura y funcionalidades, incluyendo frontend, lógica, base de datos, autenticación y conexión con Google Drive. A continuación te detallo todo lo que debe incluir:

---

### Tecnologías:

- **Frontend:** Next.js + TypeScript
- **Backend:** No hay backend propio (uso Supabase directamente)
- **Base de datos:** PostgreSQL (Supabase)
- **Autenticación:** Supabase Auth (email + password o Magic Link)
- **Estilos:** Tailwind CSS
- **Almacenamiento en la nube:** Google Drive API (OAuth2)
- **Despliegue:** Vercel

---

### Funcionalidades principales:

#### 1. Autenticación:
- Login con email y contraseña (o Magic Link)
- Gestión de sesión persistente
- Protección de rutas privadas
- Registro opcional de nuevos usuarios

#### 2. Dashboard:
- Mostrar facturas recientes
- Accesos a secciones: clientes, servicios, configuración
- Botón para crear nueva factura

#### 3. Clientes:
- CRUD completo
- Campos: nombre, dirección, NIF/CIF, email, teléfono

#### 4. Servicios:
- CRUD completo
- Campos: nombre, descripción, precio_unitario, IVA (%)

#### 5. Facturas:
- Crear nueva factura con:
  - Selección de cliente
  - Ítems múltiples (servicios)
  - Posibilidad de crear nuevos servicios directamente desde la pantalla de factura
  - También se pueden añadir ítems personalizados sin crear un servicio
  - IVA editable por línea
  - Autonumeración reiniciada por año (ej: 2025-001)
  - Cálculo automático: base imponible, IVA total, total
  - Botón para descargar en PDF
  - Guardar automáticamente una copia del PDF en Google Drive

- Editar factura:
  - Modificar los datos
  - Actualizar PDF y sobreescribir en Google Drive

- Eliminar factura:
  - Eliminar entrada de la base de datos
  - Eliminar PDF correspondiente de Google Drive

#### 6. Configuración:
- Datos de empresa: nombre, email, logo
- Moneda por defecto, tipo de IVA general, numeración inicial
- Conectar Google Drive vía OAuth2 (almacenamiento seguro de facturas PDF)

---

### Base de datos (Supabase):

Tablas:
1. `users` (auth)
2. `clientes`
3. `servicios`
4. `facturas`
5. `factura_items`
6. `google_tokens` (para almacenar tokens de Drive por usuario, encriptado si es posible)

Características:
- Relaciones entre tablas
- Triggers para autonumeración por año y usuario
- Row Level Security (RLS): cada usuario solo accede a sus datos

---

### Extras:

- UI limpia y responsive (Tailwind)
- Validación de formularios
- Manejo de errores de Supabase
- Composición de componentes reutilizables
- Generación de PDF en frontend (usando `react-pdf` o `jsPDF`)
- API client-side para subir y eliminar archivos en Google Drive (OAuth2 + REST API)

---

### ¿Qué necesito?

Genera:
- El código completo de frontend (pages, components, hooks)
- Las funciones para interactuar con Supabase (insert, update, delete)
- Las funciones para conectarse y sincronizar con Google Drive (upload, delete, auth)
- El esquema SQL con relaciones, RLS y trigger para numeración
- La lógica para permitir crear servicios nuevos desde la pantalla de factura