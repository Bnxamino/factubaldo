-- Esquema SQL para la aplicación de facturación

-- Tabla de usuarios (autenticación manejada por Supabase Auth)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

-- Tabla de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    direccion TEXT,
    nif_cif TEXT,
    email TEXT,
    telefono TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- Tabla de servicios
CREATE TABLE servicios (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio_unitario NUMERIC(10, 2) NOT NULL,
    iva NUMERIC(5, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

-- Tabla de facturas
CREATE TABLE facturas (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    cliente_id INT REFERENCES clientes(id) ON DELETE SET NULL,
    numero_factura TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT now(),
    base_imponible NUMERIC(10, 2) NOT NULL,
    iva_total NUMERIC(10, 2) NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

-- Tabla de ítems de factura
CREATE TABLE factura_items (
    id SERIAL PRIMARY KEY,
    factura_id INT REFERENCES facturas(id) ON DELETE CASCADE,
    servicio_id INT REFERENCES servicios(id) ON DELETE SET NULL,
    descripcion TEXT NOT NULL,
    cantidad NUMERIC(10, 2) NOT NULL,
    precio_unitario NUMERIC(10, 2) NOT NULL,
    iva NUMERIC(5, 2) NOT NULL,
    total NUMERIC(10, 2) NOT NULL
);

-- Tabla para almacenar tokens de Google Drive
CREATE TABLE google_tokens (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    access_token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

-- Trigger para autonumeración de facturas por año
CREATE OR REPLACE FUNCTION generar_numero_factura()
RETURNS TRIGGER AS $$
DECLARE
    nuevo_numero TEXT;
BEGIN
    SELECT CONCAT(EXTRACT(YEAR FROM now())::TEXT, '-', LPAD((COUNT(*) + 1)::TEXT, 3, '0'))
    INTO nuevo_numero
    FROM facturas
    WHERE EXTRACT(YEAR FROM fecha) = EXTRACT(YEAR FROM now());

    NEW.numero_factura = nuevo_numero;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_numero_factura
BEFORE INSERT ON facturas
FOR EACH ROW
EXECUTE FUNCTION generar_numero_factura();

-- Configuración de Row Level Security (RLS)
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE facturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE factura_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY policy_clientes ON clientes
    USING (user_id = auth.uid());

CREATE POLICY policy_servicios ON servicios
    USING (user_id = auth.uid());

CREATE POLICY policy_facturas ON facturas
    USING (user_id = auth.uid());

CREATE POLICY policy_factura_items ON factura_items
    USING (factura_id IN (SELECT id FROM facturas WHERE user_id = auth.uid()));

CREATE POLICY policy_google_tokens ON google_tokens
    USING (user_id = auth.uid());
