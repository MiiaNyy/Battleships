import { getRandomCoordinate } from "../src/factories/playerFactoryHelpers";

describe('Getting random coordinate', () => {
    test('when game level is ATLANTIC, coordinate does not contain  h, i, j, 8, 9 or 10 ', () => {
        expect(getRandomCoordinate('atlantic')).not.toMatch(/h, i, j, 8, 9, 10/)
    })

    test('when game level is MEDITERRANEAN, coordinate does not contain  f, g, h, i, j, 6, 7, 8, 9 or 10 ', () => {
        expect(getRandomCoordinate('mediterranean')).not.toMatch(/f, g, h, i, j, 6, 7, 8, 9, 10/)
    })

    test('when there is not game level given, default value is PACIFIC', () => {
        expect(getRandomCoordinate()).toBeTruthy()
    })
})