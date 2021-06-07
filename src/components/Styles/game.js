import styled from 'styled-components'

const GameContent = styled.main`
  width: 90%;
  max-width: 1400px;
  margin: ${props => props.positionShips ? '5em auto' : '0 auto 5em'} ;
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

const Cell = styled.div`
  border: 1px solid #3e3e3f;
  background-color: ${ props=>props.shipPosition ? "#555b6a" : props.shipSunk ? "red" : "inherit" };
  cursor: ${ props=>props.hitPosition || props.shipSunk ? "not-allowed" : props.enemy ? "crosshair" : "initial" };
  text-align: center;
  
  & > p {
    font-family: 'Raleway', sans-serif;
    margin: 0;
    font-size: 1.3rem;
  }
`;


const MessageContainer = styled.div`
  position: fixed;
  width: 90%;
  max-width: 650px;
  padding: 1em 1em 0;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 10px ridge #3f4238;
  background-color: rgba(255, 255, 255, 0.92);
  text-align: center;


  & > h2 {
    font-weight: 400;
    text-align: center;
    font-size: 2rem;
    text-decoration: underline;
    color: #414959;
    margin: 0;
    @media (min-width: 500px) {
      font-size: 3rem;
    }
  }

  & > p {
    margin: 1em 0;
    font-family: 'Special Elite', cursive;
  }

  & > button {
    background-color: #6d7892;
    margin: 1em 0;
  }
`;

const Sidebar = styled.div`
  padding: 1em;
  margin: 0 3em 0 0;
  border: 10px #585858 ridge;
  font-size: 0.9rem;
  background-color: #a5a5a5;
  width: 100%;
  max-width: 350px;
`;

export {
    GameboardGrid,
    GameContent,
    Cell,
    Sidebar,
    MessageContainer,
}