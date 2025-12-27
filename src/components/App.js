import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getUsersRequest, 
  createUserRequest, 
  deleteUserRequest, 
  usersError, 
} from '../actions/users';
import UsersList from './UsersList';
import NewUserForm from './NewUserForm';
import { Alert, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// class App extends Component {
const App = () => {
  const { users } = useSelector((state) => state);
  // // Chạy khi App render lần đầu, gọi API
  // componentDidMount() {
  //   this.props.getUsersRequest();
  // }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  const handleSubmit = ({ firstName, lastName }) => {
    dispatch(createUserRequest({
      firstName,
      lastName,
    }));
  };

  const handleDeleteUserClick = (userId) => {
    dispatch(deleteUserRequest(userId));
  };

  const handleCloseAlert = () => {
    dispatch(usersError({
      error:"",
    }));
  };

  return (
    <div style={{ margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>User Management</h1>
      {users.isLoading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw', 
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          >
            <Spin indicator={<LoadingOutlined spin />} size='large' />
            <span style={{ color: '#ffff' }}>Loading...</span>
          </div>
      )}

      {!!users.error && (
        <Alert 
          title='Error'
          description={users.error}
          type='error'
          showIcon
          closable={{onClose: handleCloseAlert}}
        />
      )}

      <NewUserForm onSubmit={handleSubmit} />
      <UsersList onDeleteUser={handleDeleteUserClick} users={users.items} />
    </div>
  );
}

export default App;

// export default connect(({ users }) => ({ users }), {
//   getUsersRequest,
//   createUserRequest,
//   deleteUserRequest,
//   usersError
// })(App);
