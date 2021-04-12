import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../../colors';

const Button = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 15px 7px;
  /* margin-top: 20px; */
  border-radius: 4px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

export default function AuthButton({ onPress, disabled, text }) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}
