import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import jwtDecode from 'jwt-decode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faDesktop,
  faUsers,
  faServer,
  faCubes,
  faSignOutAlt,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import {
  Layout as BaseLayout,
  Menu,
  Breadcrumb,
  Space,
  Button,
  Avatar,
  Typography,
  Dropdown,
  Grid,
} from 'antd';

import { colors, media, PATH_PREFIX } from '@utils';
import history from '@admin/history';
import { siderState } from '@store/modules/global';
import { authDataState, isLoggedIn, checkToken, getToken } from '@store/modules/auth';

import logo from '@images/logo.png';

const { Header, Sider, Content, Footer } = BaseLayout;

const StyledBaseLayout = styled(BaseLayout)`
  height: 100vh;
`;

const StyledImage = styled.img`
  height: 50px;
`;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 0 1rem;

  background-color: ${colors.primary};

  box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.15), 0 9px 28px 0 rgba(0, 0, 0, 0.1),
    0 12px 48px 16px rgba(0, 0, 0, 0.05);
`;

const StyledLogoWrapper = styled.div`
  min-width: 200px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledWelcomeTitle = styled.span`
  margin-right: 1rem;
`;

const StyledHeaderMenu = styled.div`
  height: 64px;

  background-color: ${colors.primary};

  ${StyledWelcomeTitle} {
    display: none;
  }

  ${media.md`
    ${StyledWelcomeTitle} {
      display: inline-block;
    }
  `}
`;

const HamburgerButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
`;

const StyledSider = styled(Sider)`
  position: fixed;
  z-index: 1;
  top: 64px;

  height: calc(100vh - 64px);

  box-shadow: 6px 0 16px -8px rgba(0, 0, 0, 0.15), 9px 0 28px 0 rgba(0, 0, 0, 0.1),
    12px 0 48px 16px rgba(0, 0, 0, 0.05);

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  ${media.md`
    position: static;
  `};
`;

const StyledSiderMenu = styled(Menu)`
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ContentLayout = styled(BaseLayout)`
  min-height: 50vh;

  margin: 0;
  padding: 1.5rem 2rem;
`;

const StyledContent = styled(Content)`
  padding: 1.5rem;
`;

const StyledContentWrapper = styled.div`
  height: calc(100vh - 64px);
  overflow-y: auto;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

const menu = [
  {
    path: `${PATH_PREFIX}/`,
    icon: faDesktop,
    name: 'Pulpit',
  },
  {
    path: `${PATH_PREFIX}/users`,
    icon: faUsers,
    name: 'Użytkownicy',
  },
  {
    path: `${PATH_PREFIX}/servers`,
    icon: faServer,
    name: 'Serwery',
  },
  {
    path: `${PATH_PREFIX}/services`,
    icon: faCubes,
    name: 'Usługi',
  },
];

const profileMenu = (
  <Menu>
    <Menu.Item>
      <StyledLink to={`${PATH_PREFIX}/`}>
        <Space>
          <FontAwesomeIcon icon={faUser} />
          Profil
        </Space>
      </StyledLink>
    </Menu.Item>
    <Menu.Item>
      <StyledLink to={`${PATH_PREFIX}/logout`}>
        <Space>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Wyloguj się
        </Space>
      </StyledLink>
    </Menu.Item>
  </Menu>
);

const Layout = ({ children, auth = false }) => {
  const currentBreakpoints = Grid.useBreakpoint();
  const [authData, setAuthData] = useRecoilState(authDataState);
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  const [sider, setSider] = useRecoilState(siderState);

  let currentPageName = String(menu.find((item) => item.path === history.location.pathname));

  if (currentPageName != 'undefined') {
    currentPageName = currentPageName.name;
  } else {
    currentPageName = '';
  }

  useEffect(() => {
    if (checkToken()) {
      setLoggedIn(true);

      const jwt = getToken();
      const { uuid, name } = jwtDecode(jwt);

      setAuthData({ uuid, name });
    } else {
      history.push(`${PATH_PREFIX}/login`);
    }
  }, [auth, setLoggedIn, loggedIn, setAuthData]);

  const toggleSidebar = () => {
    setSider(!sider);
  };

  return (
    <StyledBaseLayout>
      <StyledHeader>
        {!currentBreakpoints.md ? (
          <>
            <HamburgerButton type="primary" onClick={toggleSidebar}>
              {sider ? (
                <FontAwesomeIcon icon={faChevronLeft} fixedWidth />
              ) : (
                <FontAwesomeIcon icon={faChevronRight} fixedWidth />
              )}
            </HamburgerButton>
          </>
        ) : (
          ''
        )}
        <StyledLogoWrapper>
          <StyledImage src={logo} alt="" />
        </StyledLogoWrapper>
        <StyledHeaderMenu>
          <StyledWelcomeTitle>Witaj, {authData !== [] ? authData.name : ''}!</StyledWelcomeTitle>
          <Dropdown overlay={profileMenu} placement="bottomCenter" arrow>
            <Avatar size={36} icon={<FontAwesomeIcon icon={faUser} />} />
          </Dropdown>
        </StyledHeaderMenu>
      </StyledHeader>
      <BaseLayout className="site-layout">
        <StyledSider
          breakpoint="md"
          collapsedWidth={80}
          trigger={null}
          collapsed={!sider}
          collapsible
        >
          <StyledSiderMenu mode="inline" selectedKeys={[history.location.pathname]}>
            {menu.map((item) => (
              <Menu.Item key={item.path} icon={<FontAwesomeIcon icon={item.icon} />}>
                <StyledLink to={item.path}>{item.name}</StyledLink>
              </Menu.Item>
            ))}
          </StyledSiderMenu>
          {currentBreakpoints.md ? (
            <HamburgerButton type="primary" onClick={toggleSidebar}>
              {sider ? (
                <FontAwesomeIcon icon={faChevronLeft} fixedWidth />
              ) : (
                <FontAwesomeIcon icon={faChevronRight} fixedWidth />
              )}
            </HamburgerButton>
          ) : (
            ''
          )}
        </StyledSider>
        <StyledContentWrapper>
          <ContentLayout>
            <Breadcrumb>
              <Breadcrumb.Item>vMCShop.pro</Breadcrumb.Item>
              <Breadcrumb.Item>Panel Administratora</Breadcrumb.Item>
              <Breadcrumb.Item>{currentPageName}</Breadcrumb.Item>
            </Breadcrumb>
            <StyledContent className="site-layout-background">{children}</StyledContent>
          </ContentLayout>
          <StyledFooter>
            Proudly powered by{' '}
            <Typography.Link href="https://vmcshop.pro/">vMCShop</Typography.Link> v5.0.0
          </StyledFooter>
        </StyledContentWrapper>
      </BaseLayout>
    </StyledBaseLayout>
  );
};

export default Layout;
