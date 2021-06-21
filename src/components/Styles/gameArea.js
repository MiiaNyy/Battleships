import styled, { keyframes } from "styled-components";
import { Sidebar } from "./general";

const Console = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 90px;
  margin: 0 auto 0.5em;
  padding: 0.5em 0;
  font-size: 0.8rem;
  font-family: 'Special Elite', cursive;
  text-align: center;
  letter-spacing: 1px;
  color: #9e9d9d;
  background-color: rgba(45, 45, 45, 0.76);
  border: 10px ridge #292b27;

  & > p {
    margin-bottom: 0.5px;
  }

  @media (min-width: 800px) {
    font-size: 1rem;
    min-height: 180px;
    margin: 0 auto 3em;
    padding: 1em 0;
  }
`;

const Divider = styled.hr`
  align-self: stretch;
  /*margin-bottom: -50px;*/
  background-color: white;
`;

const specsSlideUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translate(0%, 90%);
    transform: translate(0%, 90%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translate(0%, 0%);
    transform: translate(0%, 0%)
  }
`;

const specsSlideDown = keyframes`
  0% {
    opacity: 1;
    -webkit-transform: translate(0%, 0%);
    transform: translate(0%, 0%);
  }
  100% {
    opacity: 0;
    -webkit-transform: translate(0%, 90%);
    transform: translate(0%, 90%);
  }
`;

const SideBarSpecs = styled(Sidebar)`
  position: absolute;
  display: ${ props=>props.showSpec ? 'block' : 'none' };;
  max-width: 200px;
  animation-name: ${ props=>props.slideDown ? specsSlideDown : specsSlideUp };
  animation-duration: 500ms;
  @media (min-width: 900px) {
    display: block;
    position: static;
    width: 90%;
    max-width: 250px;
    animation: none;
  }
`;
/* smallest screens, show this button, instead of specs container */
const SpecsButton = styled.button`
  visibility: ${ props=>props.showSpecBtn ? 'hidden' : 'initial' };
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 1em;
  border: 5px #585858 ridge;
  background-color: #a5a5a5;
  @media (min-width: 900px) {
    display: none;
  }
`;

export {
    SideBarSpecs,
    Console,
    Divider,
    SpecsButton,
}