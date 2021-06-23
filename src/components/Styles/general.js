import styled from 'styled-components'
import {
    getGridCellFontSize,
    getGridSize,
    getGridCellCursor,
    getGridCellBackgroundColor
} from './stylingHelpers';


const Header = styled.header`
  display: ${ props=>props.gameHasStarted ? 'flex' : 'block' };
  align-items: center;
  justify-content: center;
  gap: 3em;
  width: 95%;
  max-width: 1200px;
  margin: 1em auto 0.5em;
  padding: 0.5em;
  color: #808080;
  background-color: rgba(0, 0, 0, 0.44);
  text-transform: uppercase;
  text-align: center;
  filter: ${ props=>props.blurOn ? 'blur(2px) grayscale(20%)' : 'none' };
  transition: all 0.5s ease-in-out;

  & > p {
    width: ${ props=>props.gameHasStarted ? '30%' : '100%' };
    font-size: ${ props=>props.gameHasStarted ? '0.5rem' : '0.8rem' };
    font-weight: bolder;
    @media (min-width: 800px) {
      font-size: ${ props=>props.gameHasStarted ? '0.8rem' : '1rem' };
    }
  }
`;

const GameContent = styled.main`
  width: 90%;
  max-width: 1200px;
  margin: -30px auto 0;
  transition: all 0.5s ease-in-out;
  filter: ${ props=>props.blurOn || props.gameIsOver ? 'blur(2px) grayscale(20%)' : 'none' };
  @media (min-width: 950px) {
    margin: ${ props=>props.positionShips ? '2em auto' : '-30px auto 0' };
  }
`;

const GameboardGrid = styled.div`
  display: grid;
  grid-template-columns: ${ props=>getGridSize(props) };
  grid-template-rows: ${ props=>getGridSize(props) };
  justify-content: center;
  @media (min-width: 700px) {
    grid-template-columns:  ${ props=>getGridSize(props, 700) };
    grid-template-rows:  ${ props=>getGridSize(props, 700) };
  }
  @media (min-width: 1000px) {
    grid-template-columns:  ${ props=>getGridSize(props, 1000) };
    grid-template-rows:  ${ props=>getGridSize(props, 1000) };
  }

`;


const Cell = styled.div`
  border: 1px solid #3e3e3f;
  background-color: ${ props=>getGridCellBackgroundColor(props) };
  cursor: ${ props=>getGridCellCursor(props) };
  text-align: center;
  transition: all 0.3s ease-in-out;

  & > p {
    font-family: 'Raleway', sans-serif;
    margin: 0;
    font-size: ${ props=>getGridCellFontSize(props.gameLevel) }; //0.8rem;
    font-weight: bolder;
    @media (min-width: 700px) {
      font-size: ${ props=>getGridCellFontSize(props.gameLevel, 700) }; //1.1rem;
    }
    @media (min-width: 1000px) {
      font-size: ${ props=>getGridCellFontSize(props.gameLevel, 1000) }; //1.3rem;
    }
  }
`;

const MessageContainer = styled.div`
  position: fixed;
  width: 90%;
  max-width: 650px;
  padding: ${ props=>props.info ? '0 1em 0' : '1em 1em 0' };
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 10px ridge #3f4238;
  background-color: ${ props=>props.info ? 'rgba(33,33,33,0.93)' : 'rgba(255, 255, 255, 0.92)' };
  color: ${ props=>props.info ? '#a5a5a5' : 'initial' };
  text-align: ${ props=>props.info ? 'left' : 'center' };

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
`;

const Sidebar = styled.div`
  border: 10px #585858 ridge;
  font-size: 0.9rem;
  background-color: #a5a5a5;
  width: 90%;
  max-width: 250px;
  padding: 0 1em;
  margin: 0 auto;
  @media (min-width: 800px) {
    margin: 0;
    max-width: 350px;
  }

  @media (min-width: 900px) {
    padding: 1em;
  }
`;

const InfoBtnContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: right;
  color: #393939;
  filter: ${ props=>props.blurOn ? 'blur(2px) grayscale(20%)' : 'none' };
  transition: all 0.5s ease-in-out;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  gap: 1em;
  transition: all 0.3s ease-in-out;
  filter: ${ props=>props.blurOn ? 'blur(2px) grayscale(20%)' : 'none' };
  @media (min-width: 800px) {
    display: flex;
    flex-direction: row;
  }
  @media (min-width: 900px) {
    align-items: end;
    margin: ${ props=>props.gridSize === 5 ? '0 auto' : 'initial' };
    width: ${ props=>props.gridSize === 5 ? '80%' : '100%' };
  }
`;

const FlexSecondary = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 1em;
  @media (min-width: 900px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 2em;
    justify-content: space-between;
  }
`;

export {
    Header,
    GameboardGrid,
    GameContent,
    Cell,
    Sidebar,
    MessageContainer,
    InfoBtnContainer,
    Flex,
    FlexSecondary
}