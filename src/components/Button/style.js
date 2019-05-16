import styled from 'styled-components';

export const BTN = styled.button`
  margin: 5px 0;
  height: 30px;
  border: 0;
  border-radius: 3px;
  background: ${props => props.color};

  strong {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }

  &:hover {
    opacity: 0.3;
  }
`;
