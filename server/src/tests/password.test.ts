import { validatePassword } from "../utils/password";
describe("Password Validator - White Box Testing", () => {
// Test initial pour initialiser le rapport de couverture
// Ce test ne couvre que la première ligne de la fonction (Branch 1)
    it("devrait rejeter un mot de passe vide", () => {
        const result = validatePassword("", 25);
        expect(result).toBe(false);
    });
// TODO: Ajoutez vos tests ici pour atteindre 100% de couverture...
    it("devrait rejeter un mot de passe trop court", () => {
        const taille = "abc";
        const result = validatePassword(taille, 25);
        expect(result).toBe(false);
    });

    it("devrait rejeter un mot de passe trop long", () => {
        const taille = "abcdefghijklmnopqrstuvxyz";
        const result = validatePassword(taille, 25);
        expect(result).toBe(false);
    });

    it("devrait accepter un mot de passe sans majuscule enfant", () => {
        const mdp = "abcdefgh";
        const result = validatePassword(mdp, 8);
        expect(result).toBe(true);
    });

    it("devrait rejeter un mot de passe sans majuscule senior", () => {
        const mdp = "abcdefgh";
        const result = validatePassword(mdp, 66);
        expect(result).toBe(false);
    });

    it("devrait rejeter un mot de passe sans majuscule, special, chiffre adulte", () => {
        const mdp = "abcdefghE5";
        const result = validatePassword(mdp, 20);
        expect(result).toBe(false);
    });

    it("devrait rejeter un mot de passe sans majuscule, chiffre adulte", () => {
        const mdp = "abcdefghE";
        const result = validatePassword(mdp, 20);
        expect(result).toBe(false);
    });

    it("devrait accepter un mot de passe correct adulte", () => {
        const mdp = "abcdefghE5@";
        const result = validatePassword(mdp, 20);
        expect(result).toBe(true);
    });

    it("devrait refuser un mot de passe sans lettre enfant", () => {
        const mdp = "123456789";
        const result = validatePassword(mdp, 8);
        expect(result).toBe(false);
    });

});
