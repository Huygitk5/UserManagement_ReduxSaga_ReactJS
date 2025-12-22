import React from "react";
import { Button, Table } from "reactstrap";

const UsersList = ({users, onDeleteUser}) => {
    const hanldeDelete = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            onDeleteUser(userId);
        }
    }
    return (
        <Table bordered hover>
            <thead>
                <tr style={{ textAlign: 'center', width: '150px' }}>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.sort((a,b) => {
                    if (a.firstName > b.firstName) {
                        return 1;
                    } else if (a.firstName < b.firstName) {
                        return -1;
                    } else if (a.lastName > b.lastName) {
                        return 1;
                    } else if (a.lastName < b.lastName) {
                        return -1;
                    } else {
                        return 0;
                    }
                }).map((user, index) => {
                    return (
                        <tr key={user.id}>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                {index + 1}
                            </td>
                            <td style={{ verticalAlign: 'middle' }}>
                                {user.firstName}
                            </td>
                            <td style={{ verticalAlign: 'middle' }}>
                                {user.lastName}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <Button outline color="danger" size="sm" onClick={() => hanldeDelete(user.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default UsersList;