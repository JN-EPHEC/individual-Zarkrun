export function validateUserRegistration(age, role, email) {
    if (typeof age !== "number" || isNaN(age)) {
        throw new Error("Âge invalide");
    }
    if (age > 120) {
        throw new Error("Âge invalide");
    }
    const validRoles = ["admin", "user", "stagiaire"];
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
//# sourceMappingURL=validateUserRegistration.js.map