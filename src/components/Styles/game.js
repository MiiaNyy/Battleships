import styled from 'styled-components'

const GameContent = styled.main`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto 5em;
  border: 2px solid yellow;
`;

const GameboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  width: 100%;
  min-width: 350px;
  height: 350px;
  background-color: #cad9e5;
`;

const GameboardCell = styled.div`
  border: 1px solid #3e3e3f;
  background-color: ${ props=>props.shipPosition ? "#878787" : props.shipSunk ? "red" : "inherit" };
  cursor:  ${ props=>props.hitPosition || props.shipSunk ? "not-allowed" : props.enemy ? "crosshair" : "initial" };
`;

export {
    GameboardGrid,
    GameContent,
    GameboardCell,
}