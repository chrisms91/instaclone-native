import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { isLoggedInVar, logUserOut } from '../apollo';

const ME_QUERY = gql`
  query me {
    me {
      id
      userName
      avatar
    }
  }
`;

const useMe = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken, // skip this query if the user doesn't have token
  });
  useEffect(() => {
    // if there is a token on the local storage but token is not valid, log out the user.
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
};

export default useMe;
