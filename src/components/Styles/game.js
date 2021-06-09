import styled from 'styled-components'


const Header = styled.header`
  display: ${ props=>props.gameHasStarted ? 'flex' : 'block' };
  align-items: center;
  justify-content: center;
  gap: 3em;
  width: 90%;
  max-width: 1200px;
  margin: 1em auto 0.5em;
  padding: 0.5em;
  color: #808080;
  background-color: rgba(0, 0, 0, 0.44);
  text-transform: uppercase;
  text-align: center;
  transition: all 0.5s ease-in-out;

  & > p {
    width: ${ props=>props.gameHasStarted ? '30%' : '100%' };
    font-size: ${ props=>props.gameHasStarted ? '0.8rem' : '1rem' };
    font-weight: bolder;
  }
`;

const GameContent = styled.main`
  width: 90%;
  max-width: 1200px;
  margin: ${ props=>props.positionShips ? '2em auto' : '0 auto 5em' };
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
  background-color: ${ props=>props.shipPosition ? "#6d737d" : props.shipSunk ? "red" : "inherit" };
  cursor: ${ props=>(props.hitPosition && props.enemy) || (props.shipSunk && props.enemy) ? "not-allowed" : props.enemy ? "crosshair" : props.dragAndDrop ? 'default' : "not-allowed" };
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
  padding: ${props => props.info ? '0 1em 0' : '1em 1em 0'} ;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 10px ridge #3f4238;
  background-color: ${props => props.info ? 'rgba(33,33,33,0.93)' : 'rgba(255, 255, 255, 0.92)'} ;
  color: ${props => props.info ? '#a5a5a5' : 'initial'} ;
  text-align: ${props => props.info ? 'left' : 'center'};


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

  & > h3 {
    margin-top: -20px;
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
    Header,
    GameboardGrid,
    GameContent,
    Cell,
    Sidebar,
    MessageContainer,
}