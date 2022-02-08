# Battleships

This project is my version of the classic Battleships board game. The player's task is to place their own ships on the
board and sink the opponent's ships before the opponent finds and sinks the player's ships.

## General things

The idea and goal of the project were to practice the use of JavaScript objects and classes and take the first touch on
TDD (Test Driven Development) practices. I built the game so that all the functions related to the game loop are
implemented within the Player, Ship, and Gameboard classes. The game loop passes through the game alternately between
the player and the computer using only the methods of the other. I used TDD to test the classes and objects I built.

## Game AI

When I started building an AI, I wondered what kind of decisions I as a person would make when I am deciding which
coordinate to shoot. If I haven’t found any ships yet, I would shoot it at random. But if any coordinate were hit, I
will try the coordinates around it until it becomes clear whether the ship is vertical or horizontal.

That's how I built the computer to shoot the player's game board.

1. The computer checks to see if any previously shot coordinates have already been hit
2. If not, it calculates a random coordinate for the game board

*Inside Player class. Computer uses this method. Human player chooses coordinate by clicking the cell.*

```javascript
    shootTheEnemy()
{
    let coordinate = getCoordinateFromOlderHit(this.foundShips);
    
    if ( coordinate === undefined ) { // if foundShips arr is empty/there is not any found ships
        coordinate = getRandomCoordinate(this.gameLevel);
    }
    
    if ( this.shotIsValid(coordinate) ) {
        this.latestShotCoordinate = coordinate;
    } else {
        this.shootTheEnemy();
    }
}
```

When the computer first shoots and hits a player's ship, it begins to build an array of coordinates from the ships
found. To this list, it calculates the coordinate of the hit neighbor's coordinates, which it later uses when it is its
turn to shoot again.

### Example of game AI

The computer shoots at random coordinate C3

&#8594; It is informed that the coordinate hit the ship

&#8594; It creates the first item in the foundShips list, which contains information about all the ships found:

- the coordinates that hit them,
- whether that ship sank,
- and uses the coordinates that hit, to calculate the coordinates of the neighbor. These neighbor coordinates will be
  used later on the next turn.

This list looks like this when C3 is shot and hit:

```javascript
foundShips = [{
    coordinates: ['c3'], // hit coordinate
    shipSunk: false, // is the ship that is in this coordinate sunk
    neighbors: [ // neighbor coordinates of c3
        {mark: 'c2', tried: false}, // is this particular neighbor already tried
        {mark: 'c4', tried: false},
        {mark: 'b3', tried: false},
        {mark: 'd3', tried: false},
    ],
}]
```

&#8594; The next turn, from this particular list, takes the coordinate of the first neighbor that has not yet been tried
(in this case C2) and shoots the enemy with it.

&#8594; If C2 hits, the computer can conclude that the ship is in the vertical c-pillar. In this case, it removes from
the list all neighbor coordinates that are not in the c column and calculates new neighbors for the C2 coordinate. The
list then looks like this:

```javascript
foundShips = [{
    coordinates: ['c3', 'c2'],
    shipSunk: false,
    neighbors: [
        {mark: 'c2', tried: true},
        {mark: 'c4', tried: false},
        {mark: 'c1', tried: false},
    ],
}]
```

&#8594; The computer continues this same loop until it is informed that the ship in question has sunk. It then shoots
the random coordinate again until it finds the next ship and this same loop is repeated.

```javascript
foundShips = [{
    coordinates: ['c3', 'c2', 'c4'],
    shipSunk: true, // Ship is sunk so there is no need to try other neighbor coordinates
    neighbors: [
        {mark: 'c2', tried: true},
        {mark: 'c4', tried: true},
        {mark: 'c1', tried: false},
    ],
}]
```

## What I learned

- How to create game AI
- How to use Jest in basic level
- What is TDD and how to implement using it.
    - At first, I started testing too large sections of my code but quickly noticed that it is much easier to focus on
      smaller methods and functions
    - I need to improve this method a lot. Writing tests first and functions second was not as easy as I thought, and I
      mainly wrote my functions first and after that the tests.
- I Improved my knowledge of classes and objects a lot in this project. Especially methods, getters and setters. They
  are not as scary as they used to be, and I found out why they are so useful.

## Technologies

- React
    - React Hooks
        - useState, useEffect, useRef
    - Styled Components
        - Easily write CSS in JavaScript and vice versa
        - Conditional formatting of components
- Webpack
    - npm packages
    - configuration files
- JEST
    - Building tests for Player-, Ship- and Gameboard classes methods
- CSS












