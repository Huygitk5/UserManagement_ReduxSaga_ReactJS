import React, { useState } from 'react';
import { 
  Layout, Menu, Breadcrumb, Button, Input, 
  theme, Row, Col, Space, Avatar , Spin, Alert
} from 'antd';
import { 
  LoadingOutlined,
  UserOutlined, 
  AppstoreOutlined, 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  CloudOutlined,
  SearchOutlined,
  DeleteOutlined,
  SyncOutlined,
  DownOutlined,
} from '@ant-design/icons';

import UsersList from './UsersList';
import NewUserForm from './NewUserForm';

const { Header, Content, Sider } = Layout;

// 2. Hàm helper tạo menu item
function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children,
  };
}

// 3. Định nghĩa Menu Items (Chuẩn giao diện SSO)
const items = [
  getItem('Quản lý tài khoản', 'sub1', <UserOutlined />, [
    getItem('Quản lí tài khoản', '1'),
  ]),
  getItem('Quản lí ứng dụng', 'sub2', <AppstoreOutlined />, [
    getItem('Quản lí ứng dụng', '1'),
  ]),
];

const AppView = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  
  // Lấy màu nền chuẩn từ theme Ant Design
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        width='250px'
        style={{ background: '#001529' }}
      >
        {/* Logo */}
        <div style={{
            height: 64, margin: 16,
            background: 'linear-gradient(180deg, #ff8e53 0%, #ff6b6b 100%)',
            borderRadius: 6, display: 'flex', justifyContent: 'center', alignItems: 'center',
            color: 'white', fontSize: '24px', overflow: 'hidden'
        }}>
            <CloudOutlined />
            {!collapsed && <span style={{ fontSize: '14px', fontWeight: 'bold', marginLeft: 8 }}>SSO System</span>}
        </div>

        {/* Menu */}
        <Menu 
            theme="dark" 
            defaultSelectedKeys={['3']} 
            defaultOpenKeys={['sub1']} 
            mode="inline" 
            items={items} 
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '24px' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />

          {/* Avatar */}
          <Space style={{ cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
            <span style={{ fontWeight: 500 }}>Super Admin SSO</span>
            <DownOutlined style={{ fontSize: '12px' }}/>
          </Space>
        </Header>

        {/* Content */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Trang chủ' }, { title: 'Ứng dụng' }]} />
          
          {/* Container trắng chứa nội dung chính */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              position: 'relative' // Để spinner có thể hiển thị đè lên
            }}
          >

            {props.isLoading && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    zIndex: 999,
                    display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
                    borderRadius: borderRadiusLG
                }}>
                    <Spin indicator={<LoadingOutlined spin />} size='large' />
                    <span style={{ color: '#1890ff', marginTop: 10 }}>Loading...</span>
                </div>
            )}

            {!!props.error && (
                <Alert 
                  title='Error'
                  description={props.error}
                  type='error'
                  showIcon
                  closable={{onClose: props.onCloseError}}
                />
            )}

            <Row justify="space-between" style={{ marginBottom: 20 }}>
                <Col>
                    <Space>
                        <Input placeholder="Tìm kiếm..." prefix={<SearchOutlined />} />
                        <Button icon={<DeleteOutlined />}>Xóa</Button>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        <Button icon={<SyncOutlined />}>Đồng bộ</Button>
                        {/* Nút thêm mới gọi Modal */}
                        <NewUserForm onSubmit={props.onCreateUser} />
                    </Space>
                </Col>
            </Row>

            {/* 4. Bảng danh sách User */}
            <UsersList onDeleteUser={props.onDeleteUser} users={props.usersList} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppView;