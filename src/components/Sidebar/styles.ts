import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

type ContainerProps = {
  sidebar: boolean;
};
//Dispatch<SetStateAction<boolean>>
export const Container = styled.div < ContainerProps > `
  background-color: #2563eb;
  position: fixed;
  height: 100%;
  top: 0px;
  left: 0px;
  width: 300px;
  left: ${props => (props.sidebar ? '0' : '-100%')};
  animation: showSidebar 0.4s;
  z-index: 9999; /* Adicionei z-index ao Container */

  > svg {
    position: fixed;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
    z-index: 10000; /* Mantenha z-index alto para o ícone também */
  }

  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 300px;
    }
  }
`;

export const Content = styled.div`
  margin-top: 100px;
`;
