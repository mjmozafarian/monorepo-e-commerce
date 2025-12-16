export interface CustomJwtSessionClaims {
    metadata?: {
        role?: "user" | "admin"; // if there is no role, it is a regular user
    };
}
