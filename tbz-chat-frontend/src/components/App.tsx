import React from 'react';
import { login } from '../redux/globalActions';
import useThunkDispatch from '../util/hooks/useThunkDispatch';

const App = () => {

  const dispatch = useThunkDispatch();

  dispatch(login({email: "user1@example.com", password: "12345"}))

  return (
      <div>

      </div>
  )

}

export default App;
