import Player from "../src/factories/PlayerFactory";

describe('Player ', () => {
    const computer = new Player('computer', false)
    test('name is Computer', () => {
        expect(computer.name).toBe('computer')
    })
    test('Turn is false', () => {
        expect(computer.turn).toBe(false)
    })
    test('Turn is true after turn change', () => {
        computer.startTurn();
        expect(computer.turn).toBe(true);
    })
    test('Turn is false after turn change', () => {
        computer.turnOver();
        expect(computer.turn).toBe(false);
    })
})