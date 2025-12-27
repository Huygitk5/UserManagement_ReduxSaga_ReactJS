import { DeleteOutlined } from '@ant-design/icons';
import { 
    Table, 
    Button, 
    Popconfirm, 
} from 'antd';
import { Component } from 'react';

class UsersList extends Component {
    columns = [
        {
            title: '#',
            // dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 80,
            // (text: data của dataIndex, record(user): object chứa toàn bộ dữ liệu, index)
            render: (text,_, index) => index + 1,
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            sorter: (a, b) => {
                const result = a.firstName.localeCompare(b.firstName); //-> 1 0 -1
                if (result !== 0) {
                    return result;
                }
                return a.lastName.localeCompare(b.lastName);
            }
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            width: 200,
            render: (_, user) => (
                <Popconfirm 
                    title="Delete User"
                    description="Are you sure?"
                    onConfirm={() => this.props.onDeleteUser(user.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                    >
                        Delete
                    </Button>
                </Popconfirm>
            )
        }
    ];

    render() {
        const { users } = this.props;

        return (
            <Table 
                columns={this.columns}
                dataSource={users}
                rowKey="id"
                bordered
                pagination={{ pageSize: 20 }}
            />
        );
    }
};

export default UsersList;
