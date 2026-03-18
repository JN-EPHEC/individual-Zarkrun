type UserRole = "admin" | "user" | "stagiaire";

export function validateUserRegistration(age: number, role: UserRole, email: string): boolean {
    if (typeof age !== "number" || isNaN(age)) {
        throw new Error("Âge invalide");
    }

    if (age > 120) {
        throw new Error("Âge invalide");
    }

    const validRoles: UserRole[] = ["admin", "user", "stagiaire"];
    if (!validRoles.includes(role)) {
        throw new Error("Rôle invalide");
    }

    if (!email.includes("@") || !email.includes(".")) {
        return false;
    }


    if (age < 18) {
        return role === "stagiaire";
    }

    return true;
}