import { validateUserRegistration } from "../utils/validateUserRegistration.ts";
import { describe, test, expect } from "@jest/globals";
describe("White Box Testing", () => {
    const validCases = [
        [25, "user", "a@b.c", true, "Âge adulte, rôle user, email valide"],
        [17, "stagiaire", "a@b.c", true, "Mineur mais stagiaire, email valide"],
        [17, "user", "a@b.c", false, "Mineur non stagiaire, email valide"],
        [18, "user", "a@b.c", true, "Âge limite bas, rôle valide, email valide"],
        [120, "admin", "a@b.c", true, "Âge limite haut, rôle valide, email valide"],
        [25, "user", "abc.c", false, "Email invalide, pas de @"],
        [25, "user", "a@bc", false, "Email invalide, pas de ."],
        [17, "stagiaire", "", false, "Email vide, mineur stagiaire"],
        [25, "stagiaire", "", false, "Email vide, adulte stagiaire"],
        [120, "user", "a@bc", false, "Email invalide, âge limite haut"]
    ];
    test.each(validCases)("%s", (age, role, email, expected, description) => {
        expect(validateUserRegistration(age, role, email)).toBe(expected);
    });
    const invalidCases = [
        [121, "user", "a@b.c", "Erreur âge"], // âge > 120
        [121, "stagiaire", "a@b.c", "Erreur âge"], // âge > 120
        ["trente", "user", "a@b.c", "Erreur âge"], // âge type incorrect
        [null, "user", "a@b.c", "Erreur âge"], // âge null
        [25, "guest", "a@b.c", "Erreur rôle"], // rôle invalide
        [18, "guest", "a@b.c", "Erreur rôle"] // rôle invalide
    ];
    test.each(invalidCases)("%s", (age, role, email, description) => {
        expect(() => validateUserRegistration(age, role, email)).toThrow();
    });
});
//# sourceMappingURL=validateUserRegistration.test.js.map