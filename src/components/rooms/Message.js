import React, { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components/native';
import useMe from '../../hooks/useMe';

const READ_MESSAGE_MUTATION = gql`
  mutation readMessage($id: Int!) {
    readMessage(id: $id) {
      ok
      error
    }
  }
`;

const MessageContainer = styled.View`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outGoing ? 'row-reverse' : 'row')}
  align-items: flex-end;
`;

const Author = styled.View``;

const Avatar = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 25px;
`;

const MessagePayload = styled.Text`
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  border-radius: 10px;
  overflow: hidden;
  font-size: 16px;
  margin: 0px 10px;
`;

const Username = styled.Text`
  color: white;
`;

const Message = ({ message, talkingTo, roomId }) => {
  const { data: meData } = useMe();
  const updateReadMessage = (cache, result) => {
    const {
      data: {
        readMessage: { ok, id },
      },
    } = result;
    if (ok) {
      cache.modify({
        id: `Room:${roomId}`,
        fields: {
          unreadTotal(prev) {
            return 0;
          },
        },
      });
    }
  };
  const [readMessageMutation] = useMutation(READ_MESSAGE_MUTATION, {
    update: updateReadMessage,
  });

  useEffect(() => {
    if (message.user.id !== meData.me.id && !message.read) {
      readMessageMutation({
        variables: {
          id: message.id,
        },
      });
    }
  }, []);
  return (
    <MessageContainer outGoing={message.user.userName !== talkingTo?.userName}>
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
        {/* <Username>{message.user.userName}</Username> */}
      </Author>
      <MessagePayload>{message.payload}</MessagePayload>
    </MessageContainer>
  );
};

export default Message;
