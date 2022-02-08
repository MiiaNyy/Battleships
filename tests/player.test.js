import Player from "../src/factories/PlayerFactory";
import { getCoordinateFromOlderHit } from "../src/factories/factoryHelpers/playerFactoryHelpers";

describe('Players ', ()=>{
    const player = new Player('computer')

    test('name is Computer', ()=>{
        expect(player.name).toBe('computer')
    })
    test('Turn is false by default, if turn has not yet started', ()=>{
        expect(player.turn).toBeFalsy()
    })
    test('Turn is true after turn is started', ()=>{
        player.startTurn();
        expect(player.turn).toBeTruthy()
    })
    test('Turn is false after turn is over', ()=>{
        player.turnOver();
        expect(player.turn).toBeFalsy()
    })

    test('has not yet fired first shot', ()=>{
        expect(player.firstShotFired()).toBeFalsy()
    })

    test('first shot is fired', ()=>{
        player.setGameLevel = 'atlantic';
        player.setShots(false, {sunk: false}, 'a1')
        expect(player.firstShotFired()).toBeTruthy()
    })

})

describe('shooting enemy and checking if shot is valid: ', ()=>{
    const player = new Player('computer')


    test('shot is valid, this is first shot', ()=>{
        expect(player.shotIsValid('a1')).toBeTruthy();
    })

    test('after three shots, shot is valid', ()=>{
        player.allFiredShots.push('b5');
        player.allFiredShots.push('c2');
        player.allFiredShots.push('h7');
        expect(player.shotIsValid('a1')).toBeTruthy();
    })

    test('shot is NOT valid. There has another shot fired to this coordinate', ()=>{
        player.allFiredShots.push('b5');
        player.allFiredShots.push('c2');
        player.allFiredShots.push('h7');
        expect(player.shotIsValid('c2')).toBeFalsy();
    })

})

describe('Shooting enemy: ' , () => {
    const player = new Player('computer');
    test('with coordinate that is not null', ()=>{
        player.shootTheEnemy();
        expect(player.latestShotCoordinate).not.toBeNull();
    })
})

describe('Testing getting coordinate from older hit list', ()=>{
    test('when there is one ship found in specific coordinate, function returns it neighbors mark', ()=>{
        const foundShips = [{coordinates: ['a1'], shipSunk: false, neighbors: [{mark: 'b1', tried: false}]}];
        expect(getCoordinateFromOlderHit(foundShips)).toBe('b1')
    })
    test('when there is not found ships yet, function returns undefined', ()=>{
        const foundShips = [];
        expect(getCoordinateFromOlderHit(foundShips)).toBe(undefined)
    })
})

describe('Setting shots: ', () => {
    const player = new Player('friendly')
    test('Shot did not hit, missed shots arr contains right coordinate', () => {
        player.setShots(false, {sunk: false}, 'a1');
        expect(player.allFiredShots).toContain('a1');
    })
    test('after one hit shot, all hit shots number is 1', () => {
        player.setShots(true, {sunk: true, position: ['a1', 'a2']}, 'a1');
        expect(player.allFiredShots).toContain('a1');
    })
    test('', () => {
        player.setShots(false, {sunk: false}, 'a1');
        player.setShots(true, {sunk: true, position: ['a1', 'a2']}, 'a2');
        expect(player.allFiredShots).toContain('a1');
        expect(player.allFiredShots).toContain('a2');
    })
})
