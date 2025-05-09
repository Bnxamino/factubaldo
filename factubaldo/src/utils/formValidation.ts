import { useState } from 'react';

export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validateRequired = (value: string): boolean => {
    return value.trim() !== '';
};

export const useFormValidation = (initialValues: Record<string, string>) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        Object.keys(values).forEach((key) => {
            if (!validateRequired(values[key])) {
                newErrors[key] = 'Este campo es obligatorio';
            }
            if (key === 'email' && !validateEmail(values[key])) {
                newErrors[key] = 'Email no válido';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return {
        values,
        errors,
        handleChange,
        validate,
    };
};