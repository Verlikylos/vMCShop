import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { Layout as BaseLayout, Menu, Breadcrumb } from 'antd';
import { Container } from '@common/components/Container';

import { colors } from '@utils';

import background from '@images/header-background.png';
import logo from '@images/logo.png';

const { Header, Content, Footer } = BaseLayout;

const StyledLogo = styled.img`
  width: 300px;
  margin: 1rem 0;
`;

const StyledHeader = styled(Header)`
  height: 66px;

  padding: 0 1rem;

  background-color: ${colors.primary};
`;

const StyledMenu = styled(Menu)`
  background-color: ${colors.primary};
  border-bottom: 1px ${colors.primary} solid;
`;

const Layout = ({ children }) => (
  <>
    <Helmet
      style={[
        {
          cssText: `
            body {
                background-image: url('${background}');
            }
        `,
        },
      ]}
    />

    <Container>
      <BaseLayout style={{ background: 'transparent' }}>
        <StyledLogo src={logo} alt="logo" />
        <StyledHeader>
          <StyledMenu mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Strona Główna</Menu.Item>
          </StyledMenu>
        </StyledHeader>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          {children}
        </Content>
        <Footer>
          Proudly powered by <a href="#">vMCShop</a> v5.0.0
        </Footer>
      </BaseLayout>
    </Container>
  </>
);

export default Layout;
