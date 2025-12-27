import { useState } from 'react';
import { 
    Button, 
    Form, 
    Input, 
    Modal, 
} from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

// class NewUserForm extends Component {
const NewUserForm = (props) => {
    // state = {
    //     firstName: '',
    //     lastName: '',
    //     isOpen: false,
    // };
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // handleFirstNameChange = (e) => {
    //     this.setState({
    //         firstName: e.target.value,
    //     });
    // };

    // handleLastNameChange =(e) => {
    //     this.setState({
    //         lastName: e.target.value,
    //     });
    // };

    const handleShowForm = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!firstName || !lastName) {
            Modal.error({
                title: 'Lỗi nhập liệu',
                content: 'Vui lòng nhập đầy đủ First Name và Last Name!',
                centered: true,
            });
            return; 
        }

        props.onSubmit({
            firstName,
            lastName,
        });

        setFirstName('');
        setLastName('');
        setIsOpen(false);
    };

    return (
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='primary' onClick={handleShowForm} icon={<UserAddOutlined />}>
                + Add User
            </Button>
            <Modal
                title="Create User"
                open={isOpen}
                onOk={handleSubmit}
                onCancel={handleShowForm}
                okText="Create"
                cancelText="Cancel"
                centered
            >
                <Form layout="vertical">
                    <Form.Item label="First Name" required>
                        <Input 
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="Last Name" required>
                        <Input 
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default NewUserForm;
