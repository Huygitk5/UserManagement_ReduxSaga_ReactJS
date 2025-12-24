import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import React from "react";
// import { Table, Button } from "reactstrap";
import { Table, Button } from "antd";

const UsersList = ({users, onDeleteUser}) => {
    // const hanldeDelete = (userId) => {
    //     if (window.confirm("Are you sure you want to delete this user?")) {
    //         onDeleteUser(userId);
    //     }
    // }
    // return (
    //     <Table bordered hover>
    //         <thead>
    //             <tr style={{ textAlign: 'center', width: '150px' }}>
    //                 <th>#</th>
    //                 <th>First Name</th>
    //                 <th>Last Name</th>
    //                 <th>Action</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {users.sort((a,b) => {
    //                 if (a.firstName > b.firstName) {
    //                     return 1;
    //                 } else if (a.firstName < b.firstName) {
    //                     return -1;
    //                 } else if (a.lastName > b.lastName) {
    //                     return 1;
    //                 } else if (a.lastName < b.lastName) {
    //                     return -1;
    //                 } else {
    //                     return 0;
    //                 }
    //             }).map((user, index) => {
    //                 return (
    //                     <tr key={user.id}>
    //                         <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
    //                             {index + 1}
    //                         </td>
    //                         <td style={{ verticalAlign: 'middle' }}>
    //                             {user.firstName}
    //                         </td>
    //                         <td style={{ verticalAlign: 'middle' }}>
    //                             {user.lastName}
    //                         </td>
    //                         <td style={{ textAlign: 'center' }}>
    //                             <Button outline color="danger" size="sm" onClick={() => hanldeDelete(user.id)}>
    //                                 Delete
    //                             </Button>
    //                         </td>
    //                     </tr>
    //                 );
    //             })}
    //         </tbody>
    //     </Table>
    // );
    const columns = [
        {
            title: '#',
            // dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 80,
            // (text: data của dataIndex, record(user): object chứa toàn bộ dữ liệu, index)
            render: (text,_, index) => index + 1
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            sorter: (a,b) => {
                const result = a.firstName.localeCompare(b.firstName); //-> 1 0 -1
                if (result !== 0) {
                    return result;
                }
                return a.lastName.localeCompare(b.lastName);
            }
        },
        {
            title: "Last Name",
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: "Action",
            key: 'action',
            align: 'center',
            width: 200,
            render: (_, user) => (
                <Popconfirm 
                    title="Delete User"
                    description="Are you sure?"
                    onConfirm={() => onDeleteUser(user.id)}
                    // okText="Yes"
                    // cancelText="No"
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

    return (
        <Table 
            columns={columns}
            dataSource={users}
            rowKey='id'
            bordered
            pagination={{pageSize: 10}}
        />
    )
};

export default UsersList;