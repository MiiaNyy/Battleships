import styled from "styled-components";

const BtnContainer = styled.div`
  text-align: center;
  margin: ${ props=>props.axel ? "1.5em 0 2em" : "2.5em 0" };
  border: 2px solid aquamarine;
`;

const Button = styled.button`
  cursor: ${props => props.large && !props.active ? "initial" : "pointer"};
  border: ${props => props.large && !props.active ? "3px solid #141720" : "3px groove #3f4238"};
  background-color: ${props => props.large && !props.active ? "#141720" : "white"};
  font-size: ${ props=>props.small ? "0.9rem" : props.large ? "1.2rem" : "initial" };
  &:hover {
    transform: ${props => props.large && !props.active ? "none" : "scale(1.1)"} ;
    opacity: ${props => props.large && !props.active ? "1" : "0.8"};
  }
`;


export { BtnContainer, Button}