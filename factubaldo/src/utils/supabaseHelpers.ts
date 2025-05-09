import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signUp = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    return { user, error };
};

export const signIn = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    return { user, error };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};

export const getUser = () => {
    return supabase.auth.user();
};

export const fetchClients = async () => {
    const { data, error } = await supabase.from('clientes').select('*');
    return { data, error };
};

export const fetchServices = async () => {
    const { data, error } = await supabase.from('servicios').select('*');
    return { data, error };
};

export const fetchInvoices = async () => {
    const { data, error } = await supabase.from('facturas').select('*');
    return { data, error };
};

export const createClient = async (clientData: any) => {
    const { data, error } = await supabase.from('clientes').insert([clientData]);
    return { data, error };
};

export const createService = async (serviceData: any) => {
    const { data, error } = await supabase.from('servicios').insert([serviceData]);
    return { data, error };
};

export const createInvoice = async (invoiceData: any) => {
    const { data, error } = await supabase.from('facturas').insert([invoiceData]);
    return { data, error };
};