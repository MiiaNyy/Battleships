import styled from "styled-components";

const BtnContainer = styled.div`
  text-align: ${ props=>props.axel ? "center" : "right" };
  margin: ${ props=>props.axel ? "1.5em 0 2em" : "2.5em 0" };

  & > p {
    font-size: 1rem;
    font-weight: bolder;
    letter-spacing: 1px;

  }
`;

const Button = styled.button`
  cursor: ${ props=>props.large && !props.active ? "initial" : "pointer" };
  border: ${ props=>props.large && !props.active ? "3px solid rgba(0,7,15,0.1)" : "3px groove #3f4238" };
  background-color: ${ props=>props.large && !props.active ? "rgba(0,7,15,0.1)" : "white" };
  font-size: ${ props=>props.small ? "0.9rem" : props.large ? "1.2rem" : "initial" };

  &:hover {
    transform: ${ props=>props.large && !props.active ? "none" : "scale(1.1)" };
    opacity: ${ props=>props.large && !props.active ? "1" : "0.8" };
  }
`;

const ShipInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1em;
  padding-top: 0.5em;
  margin-bottom: 1em;  
  

  & > p {
    font-family: 'Special Elite', cursive;
    font-weight: bolder;
    letter-spacing: 0.7px;
    align-self: center;
    margin-bottom: 0;
    border-bottom: 1px solid black;
  }
`;

const ShipCell = styled.div`
  width: 35px;
  height: 35px;
  cursor: grab;
  background-color: #5e6574; 
  border: 1px solid black;

`;

const PopUpMessage = styled.div`
  width: 90%;
  max-width: 325px;
  position: fixed;
  top: 25%;
  right: 27%;
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