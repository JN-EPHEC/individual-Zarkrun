import { validateUserRegistration } from "../utils/validateUserRegistration.js";
import { describe, test, expect } from "@jest/globals";

type UserRole = "user" | "admin" | "stagiaire";

describe("White Box Testing", () => {
    const validCases: Array<[number, UserRole, string, boolean, string]> = [
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

    test.each(validCases)(
        "%s",
        (age, role, email, expected) => {
            expect(validateUserRegistration(age, role, email)).toBe(expected);
        }
    );

    const invalidCases: Array<[any, any, string, string]> = [
        [121, "user", "a@b.c", "Erreur âge"],
        [121, "stagiaire", "a@b.c", "Erreur âge"],
        ["trente", "user", "a@b.c", "Erreur âge"],
        [null, "user", "a@b.c", "Erreur âge"],
        [25, "guest", "a@b.c", "Erreur rôle"],
        [18, "guest", "a@b.c", "Erreur rôle"]
    ];

    test.each(invalidCases)(
        "%s",
        (age, role, email) => {
            expect(() => validateUserRegistration(age, role, email)).toThrow();
        }
    );
});