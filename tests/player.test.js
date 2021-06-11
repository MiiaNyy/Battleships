import Player from "../src/factories/PlayerFactory";
import {
    getFirstCharacterFromHint,
    getRowCoordinate,
    getColumnCoordinate,
    isNumeric
} from "../src/factories/playerFactoryHelpers"

describe('Players ', () => {
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

describe('Shooting enemy: ', () => {
    const computer = new Player('computer', false)
    test('Players shot is valid', () => {
        expect(computer.shotIsValid('a1')).toBe(true);
    })

    test('Players shot is not valid', () => {
        computer.setShots(true, 'a2')
        computer.setShots(false, 'b2')
        computer.setShots(true, 'c2')
        expect(computer.shotIsValid('a2')).toBe(false);
    })

    test('Shooting enemy with coordinate that is not null', () => {
        computer.shootTheEnemy();
        expect(computer.latestShotCoordinate).not.toBeNull();
    })

    test('Shooting enemy with coordinate that is done using a hint', () => {
        computer.setShots(true, 'd2');
        computer.shootTheEnemy();
        expect(computer.latestShotCoordinate).not.toBeNull();
    })
})

describe('Getting coordinates with hint', () => {
    test('First character from hint is alphabet', () => {
        expect(getFirstCharacterFromHint('a3', ['a1', 'a2', 'a3'])).toBe('a')
    })

    test('First character from hint is number', () => {
        expect(getFirstCharacterFromHint('a3', ['a1', 'b3', 'a3'])).toBe('3')
    })

    test('Row coordinate is greater than or equal to 5 and less than or equal than 7', () => {
        expect(getRowCoordinate('h6')).toBeGreaterThanOrEqual(5);
        expect(getRowCoordinate('h6')).toBeLessThanOrEqual(7);
    })

    test('Row coordinate always 9 when hint is  something + 10', () => {
        expect(getRowCoordinate('a10')).toEqual(9);
        expect(getRowCoordinate('b10')).toEqual(9);
        expect(getRowCoordinate('c10')).toEqual(9);
        expect(getRowCoordinate('d10')).toEqual(9);
        expect(getRowCoordinate('e10')).toEqual(9);
    })

    test('Column coordinate is always b, when hint is A + something', () => {
        expect(getColumnCoordinate('a1')).toBe('b');
        expect(getColumnCoordinate('a2')).toBe('b');
        expect(getColumnCoordinate('a3')).toBe('b');
        expect(getColumnCoordinate('a4')).toBe('b');
    })

    test('Column coordinate is always I, when hint is J + something', () => {
        expect(getColumnCoordinate('j1')).toBe('i');
        expect(getColumnCoordinate('j2')).toBe('i');
        expect(getColumnCoordinate('j3')).toBe('i');
        expect(getColumnCoordinate('j4')).toBe('i');
    })

    test('When giving B5, column coordinate A or C ', () => {
        expect(getColumnCoordinate('b5')).not.toMatch('d');
        expect(getColumnCoordinate('b5')).not.toMatch('e');
        expect(getColumnCoordinate('b5')).not.toMatch('f');
        expect(getColumnCoordinate('b5')).not.toMatch('g');
        expect(getColumnCoordinate('b5')).not.toMatch('h');
        expect(getColumnCoordinate('b5')).not.toMatch('i');
        expect(getColumnCoordinate('b5')).not.toMatch('j');
    })
})

describe('Testing if value is numeric ', () => {

    test('Number 7 is number', () => {
        expect(isNumeric(7)).toBeTruthy();
    })

    test('"7" is number', () => {
        expect(isNumeric(7)).toBeTruthy();
    })

    test('"A" is not number', () => {
        expect(isNumeric('a')).toBeFalsy();
    })


})

describe('Getting coordinates with a hint but not comparing last hit shots', () => {
    test('First character is truthy when using big coordinate a10', () => {
        expect(getFirstCharacterFromHint('a10', ['a10'])).toBeTruthy();
    })

    test('First character is truthy when using smaller coordinate a1', () => {
        expect(getFirstCharacterFromHint('a1', ['a1'])).toBeTruthy();
    })
})