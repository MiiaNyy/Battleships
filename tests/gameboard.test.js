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
        console.log('computer has placed ships in mediterranean' + x.shipsCoordinates);
        expect(x.shipsCoordinates.length).toBe(4);
        expect(x.placingShipSuccessful).toBeTruthy();
    })

    test('Atlantic grid successful, there is 5 ships on board', ()=>{
        let x = new Gameboard('player');
        x.setGameLevel = 'atlantic';
        x.placeAllShipsOnBoard();
        console.log('computer has placed ships in atlantic:  ' + x.shipsCoordinates);
        expect(x.shipsCoordinates.length).toBe(5);
        expect(x.placingShipSuccessful).toBeTruthy();
    })

    test('Not successful, because game level has not yet been declared', ()=>{
        let x = new Gameboard('player');
        x.placeAllShipsOnBoard();
        expect(x.placingShipSuccessful).toBeFalsy();
    })
})

describe('Human player places ships on Mediterranean grid', ()=>{
    test('Placing ship successful', () => {
        let y = new Gameboard('player')
        y.placeShip(mediterranean[0], 'a1', true)
        expect(y.placingShipSuccessful).toBeTruthy();
    })

    test('Placing ship not successful. Coordinate is not included in grid', () => {
        let y = new Gameboard('player')
        y.setGameLevel = 'mediterranean';
        y.placeShip(mediterranean[0], 'a6', true)
        expect(y.placingShipSuccessful).toBeFalsy();
    })

})


/*
    test('', () => {

    })


    test('placed ship successfully on the board', ()=>{
        expect(userGameboard.placeShip(shipTypes[0], 'b1', true)).toEqual('placing ship was successful')
    })

    test('tried to position ship to invalid position', ()=>{
        expect(userGameboard.placeShip(shipTypes[0], 'a10', true)).toEqual('invalid position, try again')
    })


    test('returned array of obj that contains one placed ships information on board', ()=>{
        let x = new Gameboard('player')
        x.placeShip(shipTypes[2], 'a1', true)
        expect(x.ships).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "axelIsVertical": true,
                    "hitPositions": [],
                    "length": 3,
                    "name": "Cruiser",
                    "position": ["a1", "a2", "a3"],
                    "startPosition": "a1",
                    "validPosition": true
                })
            ])
        )
    })

    test('returned array of obj that contains TWO placed ships information on board', ()=>{
        let y = new Gameboard('player')
        y.placeShip(shipTypes[2], 'a1', true)
        y.placeShip(shipTypes[2], 'b1', true)
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

describe('Placing ship ', ()=>{
    test('successful with two ships. Ships are valid positions', ()=>{
        let x = new Gameboard();
        x.placeShip(shipTypes[0], 'a1', true)
        expect(x.placeShip(shipTypes[0], 'b1', true)).toBe('placing ship was successful')
    })

    test('Not successful with two ships. Ships are invalid positions', ()=>{
        let y = new Gameboard();
        y.placeShip(shipTypes[0], 'a1', true)
        expect(y.placeShip(shipTypes[0], 'a1', true)).toBe('invalid position, try again')
    })


})


describe('Gameboard received attack and attack info is that: ', ()=>{
    const enemy = new Gameboard('enemy')
    enemy.placeShip(shipTypes[0], 'a2', true);
    enemy.placeShip(shipTypes[1], 'f4', false);
    enemy.placeShip(shipTypes[2], 'g6', true);
    enemy.placeShip(shipTypes[3], 'd7', false);
    enemy.placeShip(shipTypes[4], 'i9', true);

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
        enemy.placeShip(shipTypes[0], 'a2', true);
        enemy.receiveAttack('a2');
        enemy.receiveAttack('h10');
        enemy.receiveAttack('j2');
        expect(enemy.missedShots.length).toBe(2);
        expect(enemy.hitShots.length).toBe(1);
    })

    test('There is no sunken ships on gameboard', ()=>{
        enemy.placeShip(shipTypes[0], 'a2', true);
        enemy.receiveAttack('a2');
        enemy.receiveAttack('h10');
        enemy.receiveAttack('j2');
        expect(enemy.sunkenShips.length).toBe(0);

    })
})*/
