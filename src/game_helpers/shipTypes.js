const pacific = [
    {
        name: 'Carrier',
        count: 1, // how many this type of ships can be on the board
        length: 5
    },
    {
        name: 'Battleship',
        count: 1,
        length: 4
    },
    {
        name: 'Cruiser',
        count: 2,
        length: 3
    },
    {
        name: 'Submarine',
        count: 2,
        length: 2
    },
    {
        name: 'Patrol Boat',
        count: 3,
        length: 1
    },
];

const atlantic = [
    {
        name: 'Carrier',
        count: 1, // how many this type of ships can be on the board
        length: 5
    },
    {
        name: 'Cruiser',
        count: 1,
        length: 3
    },
    {
        name: 'Submarine',
        count: 1,
        length: 2
    },
    {
        name: 'Patrol Boat',
        count: 2,
        length: 1
    },
];

const mediterranean = [
    {
        name: 'Cruiser',
        count: 1,
        length: 3
    },
    {
        name: 'Submarine',
        count: 2,
        length: 2
    },
    {
        name: 'Patrol Boat',
        count: 1,
        length: 1
    },

];


export { pacific, atlantic, mediterranean };