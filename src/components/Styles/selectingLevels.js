import styled from "styled-components";
import { Button } from "./dragAndDrop"

const Container = styled.div`
  padding: 1em;
  color: #9e9d9d;
  background-color: rgba(45, 45, 45, 0.76);
  border: 10px ridge #292b27;
  @media (min-width: 900px) {
    display: flex;
  }
`;

const ButtonSecondary = styled(Button)`
  background-color: ${ props=>props.easy ? 'rgba(210,210,210,0.89)' : props.medium ? 'rgba(69,123,157,0.8)' : props.hard ? '#656d4a' : 'initial' };
`;

const ColumnText = styled.div`
  width: 90%;
  max-width: 200px;
  margin: 0 auto;

  & > p, & > li {
    font-size: 0.9rem;
    letter-spacing: 1px;
  }

  & > p {
    text-transform: uppercase;
  }
`;

const ColumnHeader = styled.p`
  font-family: 'Wallpoet', cursive;
  font-size: 1rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: bolder;
  letter-spacing: 1px;
  text-decoration: underline;
  @media (min-width: 900px) {
    font-size: 1.1rem;;
  }
`;

export { ButtonSecondary, Container, ColumnHeader, ColumnText }