import React, {Component} from 'react';
import { 
    Button, 
    Form, 
    Input, 
    Modal, 
} from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

class NewUserForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        isOpen: false,
    };

    handleFirstNameChange = (e) => {
        this.setState({
            firstName: e.target.value,
        });
    };

    handleLastNameChange =(e) => {
        this.setState({
            lastName: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName } = this.state;

        if (!firstName || !lastName) {
            Modal.error({
                title: 'Lỗi nhập liệu',
                content: 'Vui lòng nhập đầy đủ First Name và Last Name!',
                centered: true,
            });
            return; 
        }

        this.props.onSubmit({
            firstName,
            lastName,
        });

        this.setState({
            firstName: '',
            lastName: '',
            isOpen: false
        });
    };

    handleShowForm = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    render() {
        const { firstName, lastName, isOpen } = this.state;

        return (
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button type='primary' onClick={this.handleShowForm} icon={<UserAddOutlined />}>
                    + Add User
                </Button>
                <Modal
                    title="Create User"
                    open={isOpen}
                    onOk={this.handleSubmit}
                    onCancel={this.handleShowForm}
                    okText="Create"
                    cancelText="Cancel"
                    centered
                >
                    <Form layout="vertical">
                        <Form.Item label="First Name" required>
                            <Input 
                                placeholder="First Name"
                                value={firstName}
                                onChange={this.handleFirstNameChange}
                            />
                        </Form.Item>

                        <Form.Item label="Last Name" required>
                            <Input 
                                placeholder="Last Name"
                                value={lastName}
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
