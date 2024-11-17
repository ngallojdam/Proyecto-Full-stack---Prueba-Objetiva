export interface AuthResponse {
    user: {
        id: number;
        password: string;
        name: string;
        username: string;
        isAdmin: boolean;
        token: string;
    },
    access_token: string
}
