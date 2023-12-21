export interface User {
    id: number;
    email: string;
    password?: string;
    role: string;
    confirmPassword?: string;
    name: string;
}
