import styled from 'styled-components'
import { getGridCellBackgroundColor, getGridCellCursor, getGridCellFontSize, getGridSize } from './stylingHelpers';


const Header = styled.header`
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
  filter: ${ props => props.blurOn ? 'blur(2px) grayscale(20%)' : 'none' };
  transition: all 0.5s ease-in-out;

  & > p {
    font-size: 0.6rem;
    font-weight: bolder;
    @media (min-width: 800px) {
      font-size: 0.8rem;
    }
  }
`;

const Main = styled.main`
  width: 95%;
  max-width: 1200px;
  margin: 0 auto;
  transition: all 0.5s ease-in-out;
  filter: ${ props => props.blurOn || props.gameIsOver ? 'blur(2px) grayscale(20%)' : 'none' };
  @media (min-width: 950px) {
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 25px ${ props => getGridSize(props) };
  grid-template-rows: 25px ${ props => getGridSize(props) };
  justify-content: center;

  @media (min-width: 400px) {
    grid-template-columns: 25px ${ props => getGridSize(props, 400) };
    grid-template-rows: 25px ${ props => getGridSize(props, 400) };
  }

  @media (min-width: 800px) {
    grid-template-columns: 25px ${ props => getGridSize(props, 800) };
    grid-template-rows: 25px ${ props => getGridSize(props, 800) };
  }
`;

function getHoverEffect(props) {
    if ( props.enemy && !props.shipSunk && !props.hitPosition && !props.infoOpen ) {
        return "#a0c2fd"
    } else {
        return "none";
    }
}

const CellStyled = styled.div`
  border: 1px solid #3e3e3f;
  background-color: ${ props => getGridCellBackgroundColor(props) };
  cursor: ${ props => getGridCellCursor(props) };
  text-align: center;
  transition: all 0.2s ease-in-out;

  &:nth-child(-n+7) { // target first row of 7 column grid
    background-color: pink;
  }

  &:hover { // Only show hover effect on enemy board cells that are not hit
    background-color: ${ props => getHoverEffect(props) };
  }
  

  & > p {
    font-family: 'Raleway', sans-serif;
    margin: 0;
    font-size: ${ props => getGridCellFontSize(props.gameLevel) }; //0.8rem;
    font-weight: bolder;
    @media (min-width: 400px) {
      font-size: ${ props => getGridCellFontSize(props.gameLevel, 400) }; //1.1rem;
    }
    @media (min-width: 800px) {
      font-size: ${ props => getGridCellFontSize(props.gameLevel, 800) }; //1.3rem;
    }
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
  background-color: ${ props => props.info ? 'rgba(33,33,33,0.96)' : 'rgba(255, 255, 255, 0.92)' };
  color: ${ props => props.info ? '#a5a5a5' : 'initial' };
  text-align: ${ props => props.info ? 'left' : 'center' };

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
`;

/* Game over messages btn container */
const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  gap: 1em;
  margin: 1em auto;

`;

const SidebarContainer = styled.div`
  border: 10px #585858 ridge;
  font-size: 0.9rem;
  background-color: #a5a5a5;
  width: 100%;
  padding: 1em;
  margin: 0 auto 2em;
  @media (min-width: 700px) {
    margin: 0;
    max-width: 350px;
  }
`;

const InfoBtnContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: right;
  color: #393939;
  filter: ${ props => props.blurOn ? 'blur(2px) grayscale(20%)' : 'none' };
  transition: all 0.5s ease-in-out;
`;

const Flex = styled.div`
  transition: all 0.3s ease-in-out;
  filter: ${ props => props.blurOn ? 'blur(2px) grayscale(20%)' : 'none' };
  @media (min-width: 700px) {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 1em;
  }
  @media (min-width: 900px) {
    margin: ${ props => props.gridSize === 5 ? '0 auto' : 'initial' };
    width: ${ props => props.gridSize === 5 ? '80%' : '100%' };
  }
`;

export {
    Header,
    Grid,
    Main,
    CellStyled,
    SidebarContainer,
    MessageContainer,
    InfoBtnContainer,
    Flex,
    ButtonWrapper,
}
