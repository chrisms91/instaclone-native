import React, { useEffect } from 'react';
import { FlatList, KeyboardAvoidingView, Text, View } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import ScreenLayout from '../components/ScreenLayout';
import styled from 'styled-components/native';
import { useForm } from 'react-hook-form';

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        user {
          userName
          avatar
        }
        read
      }
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
      error
    }
  }
`;

const MessageContainer = styled.View`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outGoing ? 'row-reverse' : 'row')}
  align-items: flex-end;
  margin-bottom: 10px;
`;

const Author = styled.View``;

const Avatar = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 25px;
`;

const Message = styled.Text`
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

const TextInput = styled.TextInput`
  color: white;
  margin-bottom: 50px;
  margin-top: 15px;
  width: 95%;
  padding: 10px 20px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

const Room = ({ route, navigation }) => {
  const { register, setValue, handleSubmit } = useForm();
  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });

  useEffect(() => {
    register('message', { required: true });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.userName}`,
    });
  }, []);

  const renderItem = ({ item: message }) => {
    return (
      <MessageContainer
        outGoing={message.user.userName !== route?.params?.talkingTo?.userName}
      >
        <Author>
          <Avatar source={{ uri: message.user.avatar }} />
          {/* <Username>{message.user.userName}</Username> */}
        </Author>
        <Message>{message.payload}</Message>
      </MessageContainer>
    );
    color: white;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'black' }}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: '100%' }}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => '' + message.id}
          renderItem={renderItem}
        />
        <TextInput
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          placeholder="Write a message..."
          returnKeyLabel="Send Message"
          returnKeyType="send"
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
};
export default Room;
