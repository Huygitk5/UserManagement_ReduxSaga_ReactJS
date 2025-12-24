import React, {Component} from 'react';
// import {Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Button, Form, Input, Modal } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

class NewUserForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        isOpen: false
    };

    handleFirstNameChange = e => {
        this.setState({
            firstName: e.target.value
        })
    };

    handleLastNameChange = e => {
        this.setState({
            lastName: e.target.value
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit({
            firstName: this.state.firstName,
            lastName: this.state.lastName
        });

        this.setState({
            firstName: '',
            lastName: '',
            isOpen: false
        });
    };

    handleShowForm = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div style={{marginBottom: '20px', display: 'flex', justifyContent: 'flex-end'}}>
                {/* <Button outline color='primary' onClick={this.handleShowForm}>
                        + Add User 
                </Button>
                <Modal isOpen={this.state.isOpen} toggle={this.handleShowForm} centered backdrop="static">
                    <ModalHeader toggle={this.handleShowForm}>
                        Create User
                    </ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input required placeholder='First Name' onChange={this.handleFirstNameChange} value={this.state.firstName} autoFocus/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input required placeholder='Last Name' onChange={this.handleLastNameChange} value={this.state.lastName}/>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button outline type='sumbit' color='primary'>
                                Create
                            </Button>
                            <Button outline color='secondary' onClick={this.handleShowForm}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal> */}
                <Button type='primary' onClick={this.handleShowForm} icon={<UserAddOutlined />}>
                    + Add User
                </Button>
                <Modal
                    title="Create User"
                    open={this.state.isOpen}
                    onOk={this.handleSubmit}
                    onCancel={this.handleShowForm}
                    okText="Create"
                    cancelText="Cancel"
                    centered
                    destroyOnHidden
                >
                    <Form layout='vertical'>
                        <Form.Item label="First Name" required>
                            <Input 
                                placeholder='First Name'
                                value={this.state.firstName}
                                onChange={this.handleFirstNameChange}
                                autoFocus
                            />
                        </Form.Item>

                        <Form.Item label="Last Name" required>
                            <Input 
                                placeholder='Last Name'
                                value={this.state.lastName}
                                onChange={this.handleLastNameChange}
                            />
                        </Form.Item>

                    </Form>

                </Modal>
            </div>
        );
    }
}

export default NewUserForm;