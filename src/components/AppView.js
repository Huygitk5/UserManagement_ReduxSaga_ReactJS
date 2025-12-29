import { useState } from 'react';
import {
  Alert,
  Layout,
  Menu,
  Spin,
  theme,
  Button,
  Space,
  Avatar,
  Breadcrumb,
  Dropdown,
} from 'antd';
import {
  LoadingOutlined,
  UserOutlined,
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import UsersList from './UsersList';
import NewUserForm from './NewUserForm';

const { Header, Content, Sider } = Layout;

const getItem = (label, key, icon, children) => ({
  key,
  label,
  icon,
  children,
});

const items = [
  getItem('Quản lý User', 'sub1', <UserOutlined />, [
    getItem('Quản lý User', '1'),
  ]),
  getItem('Tìm User', '2', <SearchOutlined />),
];

const userMenu = [
  getItem('Thông tin tài khoản', '3', <UserOutlined />),
  getItem('Đăng xuất', '4', <LogoutOutlined />),
];

const AppView = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={'300px'}
      >
        {!collapsed && (
          <img
            src="/sidebar_logo.png"
            alt="Logo"
            style={{
              display: 'block',
              margin: ' 20px auto',
              width: '90%',
              maxWidth: '300px',
              objectFit: 'contain',
              borderRadius: '16px',
            }}
          />
        )}

        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: '24px',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: '64px',
              height: '64px',
            }}
          />

          <Dropdown menu={{ items: userMenu }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span>Super Admin SSO</span>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>

        <Content>
          <Breadcrumb
            style={{ margin: '16px 16px' }}
            items={[{ title: 'Trang chủ' }, { title: 'User' }]}
          />
          <div>
            {props.isLoading && (
              <div
                style={{
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
                  flexDirection: 'column',
                }}
              >
                <Spin indicator={<LoadingOutlined spin />} size="large" />
                <span style={{ color: '#ffff' }}>Loading...</span>
              </div>
            )}

            {!!props.error && (
              <Alert
                title="Error"
                description={props.error}
                type="error"
                showIcon
                closable={{ onClose: props.onCloseError }}
              />
            )}

            <NewUserForm onSubmit={props.onCreateUser} />
            <UsersList
              onDeleteUser={props.onDeleteUser}
              users={props.usersList}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AppView;
