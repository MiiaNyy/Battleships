import styled from "styled-components";

const Console = styled.div`
  position: sticky;
  top: 10px;
  width: 100%;
  max-width: 600px;
  min-height: 90px;
  margin: 1em auto ;
  padding: 0.5em 0;
  font-size: 0.8rem;
  font-family: 'Special Elite', cursive;
  text-align: center;
  letter-spacing: 1px;
  color: #9e9d9d;
  background-color: rgba(45, 45, 45, 0.9);
  border: 10px ridge #292b27;

  & > p {
    margin-bottom: 0.5px;
  }
`;

const Divider = styled.hr`
  align-self: stretch;
  background-color: white;
`;

export {
    Console,
    Divider,
}
