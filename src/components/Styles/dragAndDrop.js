import styled from "styled-components";

const BtnContainer = styled.div`
  text-align: ${ props=>props.axel ? "center" : "right" };
  margin: ${ props=>props.axel ? "1.5em 0 2em" : "2.5em 0" };

  & > p {
    font-size: 0.8rem;
    font-weight: bolder;
    letter-spacing: 1px;
    @media(min-width: 800px) {
      font-size: 1rem;
    }

  }
`;

const Button = styled.button`
  cursor: ${ props=>props.large && !props.active ? "initial" : "pointer" };
  border: ${ props=>props.large && !props.active ? "3px solid rgba(0,7,15,0.1)" : "3px groove #3f4238" };
  background-color: ${ props=>props.large && !props.active ? "rgba(0,7,15,0.1)" : "white" };
  font-size: ${ props=>props.small ? "0.8rem" : props.large ? "1rem" : "initial" };
  @media(min-width: 800px) {
    font-size: ${ props=>props.small ? "0.9rem" : props.large ? "1.2rem" : "initial" };
  }
  &:hover {
    transform: ${ props=>props.large && !props.active ? "none" : "scale(1.1)" };
    opacity: ${ props=>props.large && !props.active ? "1" : "0.8" };
  }
`;


const ShipInfo = styled.div`
  margin: 0 0.5em 0.5em 0;
  & > p {
    font-family: 'Special Elite', cursive;
    font-weight: bolder;
    letter-spacing: 0.7px;
    margin: 0;
    align-self: center;
    font-size: 0.8rem;
    @media (min-width: 800px) {
      border-bottom: 1px solid black;
    }
  }
  @media (min-width: 800px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 0;
  }
`;

const ShipCell = styled.div`
  width: ${ props => getCellSize(props)};
  height: ${ props => getCellSize(props)};
  cursor: grab;
  background-color: #5e6574;
  border: 1px solid black;
  margin: 0 auto;
  @media (min-width: 700px) {
    width: ${ props => getCellSize(props, 700)};
    height: ${ props => getCellSize(props, 700)};   
  }
  @media (min-width: 1000px) {
    width: ${ props => getCellSize(props, 1000)};
    height: ${ props => getCellSize(props, 1000)};
  }

`;

function getCellSize(props, media) {
    const gridSize = props.size;
    switch (gridSize) {
        case (5):
            return `35px`
        case(7):
            if ( media === 700 || media === 1000 ) {
                return `35px` // larger screens
            } else {
                return `30px` // smaller screens
            }
        case(10):
            if ( media === 1000 ) {
                return `35px`
            } else if ( media === 700 ) {
                return `30px`
            } else {
                return `25px`
            }
    }

}

const PopUpMessage = styled.div`
  width: 90%;
  max-width: 325px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.5em 0;
  text-align: center;
  border: 10px ridge #ce0000;
  background-color: rgba(255, 255, 255, 0.88);
  -webkit-box-shadow: 3px 3px 12px 0 rgba(50, 50, 50, 0.45);
  -moz-box-shadow: 3px 3px 12px 0 rgba(50, 50, 50, 0.45);
  box-shadow: 3px 3px 12px 0 rgba(50, 50, 50, 0.45);
  transition: all 0.8s ease-in-out;
  opacity: 0;
  cursor: default;

  & > p {
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0;
  }
`;

export { BtnContainer, Button, ShipInfo, ShipCell, PopUpMessage, }