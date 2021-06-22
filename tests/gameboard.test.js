import Gameboard from "../src/factories/GameboardFactory";
import { pacific, atlantic, mediterranean } from "../src/game_helpers/shipTypes"


describe('GameBoard', ()=>{
    let x = new Gameboard('player')

    test('returned empty array when none ships on gameboard', ()=>{
        expect(x.shipsCoordinates).toEqual(
            expect.arrayContaining([])
        )
    })
});

describe('Game levels', ()=>{
    let x = new Gameboard('player');
    test('returned empty string, when gamelevel has not been set yet', ()=>{
        expect(x.gameLevel).toBe('')
    })

    test('returned PACIFIC, when game level is pacific', ()=>{
        x.setGameLevel = 'pacific'
        expect(x.gameLevel).toBe('pacific')
    })
})

describe('Computer places ships', ()=>{

    test('On Mediterranean grid successful, there is 4 ships on board', ()=>{
        let x = new Gameboard('player');
        x.setGameLevel = 'mediterranean';
        x.placeAllShipsOnBoard();
        console.log('computer has placed ships in mediterranean: ' + x.shipsCoordinates);
        expect(x.shipsCoordinates.length).toBe(4);
    })

    test('Atlantic grid successful, there is 5 ships on board', ()=>{
        let x = new Gameboard('player');
        x.setGameLevel = 'atlantic';
        x.placeAllShipsOnBoard();
        console.log('computer has placed ships in atlantic:  ' + x.shipsCoordinates);
        expect(x.shipsCoordinates.length).toBe(5);

    })

    test('Not successful, because game level has not yet been declared', ()=>{
        let x = new Gameboard('player');
        x.placeAllShipsOnBoard();
        expect(x.placingShipSuccessful).toBeFalsy();
    })
})

describe('Human player places ships on Mediterranean grid', ()=>{
    test('Placing ship successful', ()=>{
        let y = new Gameboard('player')
        y.placeShip(mediterranean[0], 'a1', true)
        expect(y.placingShipSuccessful).toBeTruthy();
    })

    test('Placing ship not successful. Coordinate is not included in grid', ()=>{
        let y = new Gameboard('player')
        y.setGameLevel = 'mediterranean';
        y.placeShip(mediterranean[1], 'f6', true)
        expect(y.placingShipSuccessful).toBeFalsy();
    })

    test('Not successful. Coordinate is not included in grid', ()=>{
        let y = new Gameboard('player')
        y.setGameLevel = 'mediterranean';
        y.placeShip(mediterranean[0], 'j6', true)
        expect(y.placingShipSuccessful).toBeFalsy();
    })

})

describe('Human player places ships on Atlantic grid', ()=>{
    test('Placing ship successful', ()=>{
        let y = new Gameboard('player')
        y.placeShip(atlantic[0], 'g1', true)
        expect(y.placingShipSuccessful).toBeTruthy();
    })

    test('Placing ship not successful. Coordinate is not included in grid', ()=>{
        let y = new Gameboard('player')
        y.setGameLevel = 'mediterranean';
        y.placeShip(mediterranean[0], 'a6', true)
        expect(y.placingShipSuccessful).toBeFalsy();
    })

    test('Not successful. Coordinate is not included in grid', ()=>{
        let y = new Gameboard('player')
        y.setGameLevel = 'mediterranean';
        y.placeShip(mediterranean[0], 'j6', true)
        expect(y.placingShipSuccessful).toBeFalsy();
    })


    test('successful with two ships. Ships are valid positions', ()=>{
        let x = new Gameboard('player');
        x.setGameLevel = 'mediterranean';
        x.placeShip(mediterranean[0], 'a1', true)
        x.placeShip(mediterranean[1], 'b1', false)
        expect(x.placingShipSuccessful).toBeTruthy();
    })

    test('Not successful with two ships. Ships are overlapping each other, so invalid position', ()=>{
        let y = new Gameboard('player')
        y.setGameLevel = 'mediterranean';
        y.placeShip(mediterranean[0], 'a1', true)
        y.placeShip(mediterranean[1], 'a1', true)
        expect(y.placingShipSuccessful).toBeFalsy();
    })

    test('Not successful with two ships. Ships are overlapping each other, so invalid position', ()=>{
        let y = new Gameboard('player')
        y.setGameLevel = 'mediterranean';
        y.placeShip(mediterranean[0], 'a1', true)
        y.placeShip(mediterranean[1], 'a3', false)
        expect(y.placingShipSuccessful).toBeFalsy();
    })
})

describe('Human player places ships on Pacific grid', ()=>{
    test('Placing ship successful', ()=>{
        let y = new Gameboard('player');
        y.setGameLevel = 'pacific';
        y.placeShip(pacific[0], 'j1', true)
        expect(y.placingShipSuccessful).toBeTruthy();
    })

    test('Placing ship not successful. Ship does not fit in the grid in horizontally', ()=>{
        let y = new Gameboard('player')
        y.setGameLevel = 'pacific';
        y.placeShip(pacific[0], 'j4', false)
        expect(y.placingShipSuccessful).toBeFalsy();
    })

    test('Not successful. Ship does not fit in the grid in vertically', ()=>{
        let y = new Gameboard('player')
        y.setGameLevel = 'pacific';
        y.placeShip(pacific[1], 'i10', true)
        expect(y.placingShipSuccessful).toBeFalsy();
    })

    test('returned array of obj that contains TWO placed ships information on board', ()=>{
        let y = new Gameboard('player')
        y.placeShip(pacific[2], 'a1', true)
        y.placeShip(pacific[2], 'b1', true)
        expect(y.ships).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "axelIsVertical": true,
                    "hitPositions": [],
                    "length": 3,
                    "name": "Cruiser",
                    "position": ["a1", "a2", "a3"],
                    "startPosition": "a1",
                    "validPosition": true
                }),
                expect.objectContaining({
                    "axelIsVertical": true,
                    "hitPositions": [],
                    "length": 3,
                    "name": "Cruiser",
                    "position": ["b1", "b2", "b3"],
                    "startPosition": "b1",
                    "validPosition": true
                })
            ])
        )
    })
})

describe('Gameboard received attack and attack info is that: ', ()=>{
    const enemy = new Gameboard('enemy')
    enemy.placeShip(pacific[0], 'a2', true);
    enemy.placeShip(pacific[1], 'f4', false);
    enemy.placeShip(pacific[2], 'g6', true);
    enemy.placeShip(pacific[3], 'd7', false);
    enemy.placeShip(pacific[4], 'i9', true);

    test('ship named CARRIER got hit', ()=>{
        enemy.receiveAttack('a2');
        expect(enemy.latestHitShipName).toBe('Carrier')
        expect(enemy.didLatestShotHit).toBe(true);

    })

    test('ship named BATTLESHIP got hit', ()=>{
        enemy.receiveAttack('f4');
        expect(enemy.latestHitShipName).toBe('Battleship');
        expect(enemy.didLatestShotHit).toBe(true);
    })

    test('No ships got hit, and attack message is correct', ()=>{
        enemy.receiveAttack('j10');
        expect(enemy.didLatestShotHit).toBe(false);
        expect(enemy.latestAttackInfoMsg).toBe('You shot at j10. Didn\'t hit any ship');

    })

})

describe('Checking shots that have been shot at gameboard', ()=>{
    const enemy = new Gameboard('enemy')
    test('There has been 3 shots. One hit and two missed', ()=>{
        enemy.placeShip(pacific[0], 'a2', true);
        enemy.receiveAttack('a2');
        enemy.receiveAttack('h10');
        enemy.receiveAttack('j2');
        expect(enemy.missedShots.length).toBe(2);
        expect(enemy.hitShots.length).toBe(1);
    })

    test('There is no sunken ships on gameboard', ()=>{
        enemy.placeShip(pacific[0], 'a2', true);
        enemy.receiveAttack('a2');
        enemy.receiveAttack('h10');
        enemy.receiveAttack('j2');
        expect(enemy.sunkenShips.length).toBe(0);

    })
})

describe('Checking for game over', () => {
    const player = new Gameboard('player');
    player.placeShip(atlantic[2], 'a2', true);

    test('When there has not been any hits, game is not over', () => {
        expect(player.gameOver).toBeFalsy()
    })

    test('When there is two attacks, one hit one missed, game is not over ', () => {
        player.receiveAttack('a2');
        player.receiveAttack('b4');
        expect(player.gameOver).toBeFalsy()
    })

    test('After three attacks, all of the ships are sunk and game is over', () => {
        player.receiveAttack('a3');
        player.receiveAttack('b4');
        player.receiveAttack('a2');
        expect(player.gameOver).toBeTruthy()
    })
})