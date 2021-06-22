import Ship from "../src/factories/ShipFactory";

test('Ship name is destroyer', ()=>{
    const destroyer = new Ship('Destroyer', 4, 'a1');
    expect(destroyer.name).toBe('Destroyer')
})
describe('Ship position', ()=>{
    test(' when axel is vertical calculated correctly', ()=>{
        const destroyer = new Ship('Destroyer', 4, 'a1', true);
        destroyer.setPosition = ['a1', 'a2', 'a3', 'a4'];
        expect(destroyer.position).toEqual(['a1', 'a2', 'a3', 'a4'])
    })

    test(' when axel is horizontal calculated correctly', ()=>{
        const destroyer = new Ship('Destroyer', 4, 'a1', false);
        destroyer.setPosition = ['a1', 'b1', 'c1', 'd1'];
        expect(destroyer.position).toEqual(['a1', 'b1', 'c1', 'd1'])
    })

    test('is not valid', () => {
        const destroyer = new Ship('Destroyer', 4, 'a1', false);
        destroyer.positionIsInvalid();
        expect(destroyer.validPosition).toBeFalsy()
    })

    test('is valid', () => {
        const destroyer = new Ship('Destroyer', 4, 'a1', false);
        destroyer.positionIsValid();
        expect(destroyer.validPosition).toBeTruthy()
    })
})

describe('Ship got hit?', ()=>{

    test('Ship has not got hit yet', ()=>{
        const destroyer = new Ship('Destroyer', 4, 'a1', true);
        expect(destroyer.hitPositions).toEqual([])
    })

    test('True. Enemy found this ship position', ()=>{
        const destroyer = new Ship('Destroyer', 4, 'a1', true);
        destroyer.setPosition = ['a1', 'a2', 'a3', 'a4'];
        expect(destroyer.checkIfHit('a2')).toBeTruthy();
    })

    test('False', ()=>{
        const destroyer = new Ship('Destroyer', 4, 'a1', true);
        destroyer.setPosition = ['a1', 'a2', 'a3', 'a4'];
        expect(destroyer.checkIfHit('b1')).toBeFalsy()
    })

    test('True and ship is sunken', ()=>{
        const destroyer = new Ship('Destroyer', 1, 'a1', true);
        destroyer.setPosition = ['a1'];
        destroyer.checkIfHit('a1')
        expect(destroyer.isSunk()).toBeTruthy();
    })

    test('True but is not sunken', ()=>{
        const destroyer = new Ship('Destroyer', 2, 'a1', true);
        destroyer.checkIfHit('a1')
        expect(destroyer.isSunk()).toBe(false)
    })
})


