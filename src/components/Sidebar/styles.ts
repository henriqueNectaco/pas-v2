import styled from 'styled-components';

type ContainerProps = {
  sidebar: boolean;
};

export const Container = styled.div<ContainerProps>`
  background-color: #2372d0;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  width: 300px;
  transform: ${props => (props.sidebar ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.4s ease-in-out;
  z-index: 9999;

  @media (max-width: 1024px) {
    width: 250px;
  }

  @media (max-width: 768px) {
    width: 200px;
  }

  > svg {
    position: absolute;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
    z-index: 10000;
  }
`;

export const Content = styled.div`
  margin-top: 100px;
`;
