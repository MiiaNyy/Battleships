import Ship from "../src/factories/ShipFactory";

test('Ship name is destroyer', ()=>{
    const destroyer = new Ship('Destroyer', 4, 'a1');
    expect(destroyer.name).toBe('Destroyer')
})
describe('Ship position', ()=>{
    test(' when axel is vertical calculated correctly', ()=>{
        const destroyer = new Ship('Destroyer', 4, 'a1', true);
        expect(destroyer.position).toContain('a4')
    })

    test(' when axel is horizontal calculated correctly', ()=>{
        const destroyer = new Ship('Destroyer', 4, 'a1', false);
        expect(destroyer.position).toEqual(['a1', 'b1', 'c1', 'd1'])
    })

    // Needs to modify
    test(' not valid. Ship is larger than horizontal grid', ()=>{
        const destroyer = new Ship('Destroyer', 4, 'i1', false);
        expect(destroyer.validPosition).toBe(false)
    })

    test(' not valid. Ship larger than vertical grid', ()=>{
        const destroyer = new Ship('Destroyer', 4, 'a10', true);
        expect(destroyer.validPosition).toBe(false)
    })
})

describe('Ship got hit?', ()=>{

    test('Ship has not got hit yet', ()=>{
        const destroyer = new Ship('Destroyer', 4, 'a1', true);
        expect(destroyer.hitPositions).toEqual([])
    })

    test('True and hit position array successful', ()=>{
        const destroyer = new Ship('Destroyer', 4, 'a1', true);

        destroyer.checkIfHit('a1')
        expect(destroyer.hitPositions).toEqual(expect.arrayContaining(['a1']))
    })

    test('False', ()=>{
        const destroyer = new Ship('Destroyer', 4, 'a1', true);

        expect(destroyer.checkIfHit('b1')).toBe(false)
    })

    test('True', ()=>{
        const destroyer = new Ship('Destroyer', 4, 'a1', true);

        expect(destroyer.checkIfHit('a1')).toBe(true)
    })


    test('True and ship is sunken', ()=>{
        const destroyer = new Ship('Destroyer', 1, 'a1', true);
        destroyer.checkIfHit('a1')
        expect(destroyer.isSunk()).toBe(true)
    })
    test('True but is not sunken', ()=>{
        const destroyer = new Ship('Destroyer', 2, 'a1', true);
        destroyer.checkIfHit('a1')
        expect(destroyer.isSunk()).toBe(false)
    })
})


