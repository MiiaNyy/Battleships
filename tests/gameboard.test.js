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

describe('GameboardGrid received attack', ()=>{
    test('Two ships on board and neither got hit', ()=>{
        let y = new Gameboard();
        y.placeShip(shipTypes[0], 'a1', true)
        y.placeShip(shipTypes[1], 'b1', true)
        expect(y.receiveAttack('c1')).toBe(`Shot didn't hit any ship`)
    })

    test('Two ships on board and second one got hit', ()=>{
        let y = new Gameboard();
        y.placeShip(shipTypes[0], 'a1', true)
        y.placeShip(shipTypes[1], 'b1', true)
        expect(y.receiveAttack('b1')).toBe(`Ship Battleship got hit`)
    })

    test('Two ships on board and second one got hit and sunk', ()=>{
        let y = new Gameboard();
        y.placeShip(shipTypes[0], 'a1', true)
        y.placeShip(shipTypes[4], 'b1', true)
        expect(y.allShipHaveSunk).toBe(false)
        expect(y.receiveAttack('b1')).toBe(`Ship Patrol Boat got hit and sunk`)
    })

    test('One ship on board and got hit and sunk. Now all ships are sunk', ()=>{
        let y = new Gameboard();
        y.placeShip(shipTypes[4], 'b1', true)
        expect(y.receiveAttack('b1')).toBe(`Ship Patrol Boat got hit, sunk and now all the ships are sunk`)
    })


})