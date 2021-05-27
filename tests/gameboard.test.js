import Gameboard from "../src/factories/GameboardFactory";
import shipTypes from "../src/game_helpers/shipTypes"


describe('GameBoard', ()=>{
    let userGameboard = new Gameboard('player')

    test('returned empty array when none ships on gameboard', ()=>{
        expect(userGameboard.shipsCoordinates).toEqual(
            expect.arrayContaining([])
        )
    })

    test('returned ships on board array when one ship has called', ()=>{
        userGameboard.placeShip(shipTypes[2], 'a1', true)
        expect(userGameboard.shipsCoordinates).toEqual(
            expect.arrayContaining([['a1', 'a2', 'a3']])
        )
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
})