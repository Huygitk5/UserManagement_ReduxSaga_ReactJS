import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  usersError,
} from '../actions/users';
import AppView from '../components/AppView';

const App = () => {
  const { users } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  const handleSubmit = ({ firstName, lastName }) => {
    dispatch(
      createUserRequest({
        firstName,
        lastName,
      })
    );
  };

  const handleDeleteUserClick = (userId) => {
    dispatch(deleteUserRequest(userId));
  };

  const handleCloseAlert = () => {
    dispatch(
      usersError({
        error: '',
      })
    );
  };

  return (
    <AppView
      usersList={users.items}
      isLoading={users.isLoading}
      error={users.error}
      onCreateUser={handleSubmit}
      onDeleteUser={handleDeleteUserClick}
      onCloseError={handleCloseAlert}
    />
  );
};

export default App;
