import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Función para insertar datos en una tabla
export const insertData = async (table: string, data: any) => {
  const { data: result, error } = await supabase.from(table).insert(data);
  if (error) throw error;
  return result;
};

// Función para actualizar datos en una tabla
export const updateData = async (table: string, id: number | string, data: any) => {
  const { data: result, error } = await supabase.from(table).update(data).eq('id', id);
  if (error) throw error;
  return result;
};

// Función para eliminar datos de una tabla
export const deleteData = async (table: string, id: number | string) => {
  const { data: result, error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
  return result;
};

// Función para obtener datos de una tabla
export const fetchData = async (table: string, filters: Record<string, any> = {}) => {
  let query = supabase.from(table).select('*');
  Object.keys(filters).forEach((key) => {
    query = query.eq(key, filters[key]);
  });
  const { data, error } = await query;
  if (error) throw error;
  return data;
};
