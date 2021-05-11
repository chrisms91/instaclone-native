import React, { useEffect } from 'react';
import { FlatList, KeyboardAvoidingView, Text, View } from 'react-native';
import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import ScreenLayout from '../components/ScreenLayout';
import styled from 'styled-components/native';
import { useForm } from 'react-hook-form';
import useMe from '../hooks/useMe';
import Message from '../components/rooms/Message';

const ROOM_UPDATES = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id
      payload
      user {
        id
        userName
        avatar
      }
      read
    }
  }
`;

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      messages {
        id
        payload
        user {
          id
          userName
          avatar
        }
        read
        createdAt
        updatedAt
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

const TextInput = styled.TextInput`
  color: white;
  padding: 10px 20px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 93%;
  margin-right: 10px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 95%;
  margin-bottom: 50px;
  margin-top: 25px;
`;

const SendButton = styled.TouchableOpacity``;

const Room = ({ route, navigation }) => {
  const { data: meData } = useMe();
  const { register, setValue, handleSubmit, getValues, watch } = useForm();
  const updateSendMessage = (cache, result) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    if (ok && meData) {
      const { message } = getValues();
      setValue('message', '');

      // fake msg obj
      const messageObj = {
        id,
        payload: message,
        user: {
          userName: meData.me.userName,
          avatar: meData.me.avatar,
        },
        read: true,
        __typename: 'Message',
      };

      const messageFragment = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              userName
              avatar
            }
            read
          }
        `,
        data: messageObj,
      });
      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            return [...prev, messageFragment];
          },
        },
      });
    }
  };

  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );

  const { data, loading, subscribeToMore, refetch } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });

  const client = useApolloClient();
  const updateQuery = (prevQuery, options) => {
    const {
      subscriptionData: {
        data: { roomUpdates: incomingMessage },
      },
    } = options;
    if (incomingMessage.id) {
      const inComingMessageFragment = client.cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              userName
              avatar
            }
            read
          }
        `,
        data: incomingMessage,
      });
      client.cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            const existingMessage = prev.find(
              (msg) => msg.__ref === inComingMessageFragment.__ref
            );
            // prevent updating multiple duplicate messages.
            if (existingMessage) {
              return prev;
            }
            return [...prev, inComingMessageFragment];
          },
        },
      });
    }
  };

  useEffect(() => {
    if (data?.seeRoom) {
      subscribeToMore({
        document: ROOM_UPDATES,
        variables: {
          id: route?.params?.id,
        },
        updateQuery,
      });
    }
  }, [data]);

  const onValid = ({ message }) => {
    // TODO: send message to the use who is not in the room -> need to create a new room and send message with userId
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload: message,
          roomId: route?.params?.id,
        },
      });
    }
  };

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
      <Message
        message={message}
        talkingTo={route?.params?.talkingTo}
        roomId={route?.params?.id}
      />
    );
  };

  const messages = [...(data?.seeRoom?.messages ?? [])];
  messages.sort((a, b) => a.createdAt - b.createdAt).reverse();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'black' }}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          showsVerticalScrollIndicator={false}
          style={{ width: '100%', marginVertical: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
          data={messages}
          keyExtractor={(message) => '' + message?.id}
          renderItem={renderItem}
        />
        <InputContainer>
          <TextInput
            autoCorrect={false}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            placeholder="Write a message..."
            returnKeyLabel="Send Message"
            returnKeyType="send"
            onChangeText={(text) => setValue('message', text)}
            onSubmitEditing={handleSubmit(onValid)}
            value={watch('message')}
          />
          <SendButton
            onPress={handleSubmit(onValid)}
            disabled={!Boolean(watch('message'))}
          >
            <Ionicons
              name="send"
              color={
                !Boolean(watch('message'))
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'white'
              }
              size={22}
            />
          </SendButton>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
};
export default Room;
