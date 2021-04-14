import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar('');

export const logUserIn = async (token) => {
  try {
    await AsyncStorage.multiSet([
      ['token', token],
      ['loggedIn', 'yes'],
    ]);
    isLoggedInVar(true);
    tokenVar(token);
  } catch (error) {
    console.log(error);
  }
};

export const logUserOut = async () => {
  await AsyncStorage.multiRemove(['token', 'loggedIn']);
  isLoggedInVar(false);
  tokenVar('');
};

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default client;
