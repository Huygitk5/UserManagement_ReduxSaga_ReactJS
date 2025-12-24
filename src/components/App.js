import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getUsersRequest, createUserRequest, deleteUserRequest, usersError } from '../actions/users';
import UsersList from './UsersList';
import NewUserForm from './NewUserForm';
// import { Alert, Spinner } from 'reactstrap';
import { Alert, Spin } from 'antd';


class App extends Component {
  constructor(props) {
    super(props);

    this.props.getUsersRequest();
  }

  hanleSubmit = ({firstName, lastName}) => {
    this.props.createUserRequest({
      firstName,
      lastName
    });
  };

  handleDeleteUserClick = (userId) => {
    this.props.deleteUserRequest(userId)
  }

  handleCloseAlert = () => {
    this.props.usersError({
      error:""
    })
  }

  render() {
    const users = this.props.users;
    return (
      <div style={{margin: '0 auto', padding: '20px'}}>
        <h1 style={{textAlign: 'center'}}>User Management</h1>
        {users.isLoading && (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw', 
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
              {/* <Spinner color="Light" style={{ width: '3rem', height: '3rem'}} /> */}
              <Spin tip="Loading" size="large"/>
              <span style={{ color: '#ffff' }}>Loading...</span>
              
            </div>
        )}
        {/* <Alert color="danger" isOpen={!!this.props.users.error} toggle={this.handleCloseAlert}>
          {this.props.users.error}
        </Alert> */}
        {!!users.error &&
          <Alert 
            title="Error"
            description={users.error}
            type='error'
            showIcon
            closable={{onClose: this.handleCloseAlert}}
          />
        }
        <NewUserForm onSubmit={this.hanleSubmit}/>
        <UsersList onDeleteUser={this.handleDeleteUserClick} users={users.items}/>
      </div>
    );
  }
}

export default connect(({users}) => ({users}), {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  usersError
})(App);
