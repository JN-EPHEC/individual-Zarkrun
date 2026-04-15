import { calculateShipping } from "../utils/shipping.ts";
import { describe, test, expect } from "@jest/globals";
// [distance, weight, type, expected, description]
const validCases = [
    [0, 5, "standard", 10, "Distance 0 km -> Base 10€"],
    [50, 5, "standard", 10, "Distance 50 km -> Base 10€"],
    [51, 5, "standard", 25, "Distance 51 km -> Base 25€"],
    [500, 5, "standard", 25, "Distance 500 km -> Base 25€"],
    [501, 5, "standard", 50, "Distance 501 km -> Base 50€"],
    [10, 9, "standard", 10, "Poids 9kg -> pas de majoration"],
    [10, 10, "standard", 15, "Poids 10kg -> +50%"],
    [10, 50, "standard", 15, "Poids 50kg -> +50%"],
];
const invalidCases = [
    [-1, 5, "standard", "Invalid distance"],
    [10, 0, "standard", "Invalid weight"],
    [10, -5, "standard", "Invalid weight"],
    [10, 51, "standard", "Invalid weight"],
];
const pairwiseCases = [
    [10, 5, "standard", 10, "D1 W1 T1"],
    [10, 20, "express", 30, "D1 W2 T2"],
    [100, 5, "express", 50, "D2 W1 T2"],
    [100, 20, "standard", 37.5, "D2 W2 T1"],
    [600, 5, "express", 100, "D3 W1 T2"],
    [600, 20, "standard", 75, "D3 W2 T1"],
];
describe("Shipping Calculator - Tests Fonctionnels", () => {
    test.each(validCases)("%s", (distance, weight, type, expected) => {
        expect(calculateShipping(distance, weight, type)).toBe(expected);
    });
    test.each(invalidCases)("Entrée invalide (%i, %i)", (distance, weight, type) => {
        expect(() => calculateShipping(distance, weight, type)).toThrow();
    });
    test.each(pairwiseCases)("%s", (distance, weight, type, expected) => {
        expect(calculateShipping(distance, weight, type)).toBe(expected);
    });
});
//# sourceMappingURL=shipping.test.js.map