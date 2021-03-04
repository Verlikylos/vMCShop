import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPlus, faUser, faEdit, faTrash, faKey } from '@fortawesome/free-solid-svg-icons';

import {
  PageHeader,
  Button,
  Descriptions,
  Space,
  notification,
  Row,
  Col,
  Card,
  Avatar,
  Layout as BaseLayout,
  Tag,
  Tooltip,
  Pagination,
  Empty,
  Grid,
  Spin,
} from 'antd';

import { Layout } from '@admin/components/Layout';
import { UserDrawer } from '@admin/components/Drawers';

import { colors, media } from '@utils';

import {
  usersState,
  userCountState,
  userDrawerState,
  selectedUserIdState,
  getUsers,
} from '@store/modules/users';
import { authDataState } from '@store/modules/auth';

const StyledContainer = styled(BaseLayout)`
  margin: 1rem 0;
`;

const StyledDescriptions = styled(Descriptions)`
  margin-top: 1rem;
`;

const StyledPaginationWrapper = styled(Card)`
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &::before,
    &::after {
      display: none;
    }

    ${media.md`
      justify-content: space-between;
    `}
  }
`;

const StyledEmpty = styled(Empty)`
  min-height: 502px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UsersPage = () => {
  const usersPerPage = 8;
  const currentBreakpoint = Grid.useBreakpoint();
  const [reload, setReload] = useState(new Date());
  const authData = useRecoilValue(authDataState);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useRecoilState(usersState);
  const [userCount, setUserCount] = useRecoilState(userCountState);
  const [userDrawer, setUserDrawer] = useRecoilState(userDrawerState);
  const [selectedUserId, setSelectedUserId] = useRecoilState(selectedUserIdState);

  const reloadCurrentPage = () => {
    setReload(new Date());
  };

  const paginationHandler = (page) => {
    setCurrentPage(page);
  };

  const editHandler = (id) => {
    setSelectedUserId(id);
    setUserDrawer(true);
  };

  useEffect(() => {
    setLoading(true);
    getUsers(currentPage)
      .then((response) => {
        if (response.status !== 200) {
          notification.error({
            message: 'Wystąpił błąd podczas pobierania użytkowników!',
            placement: 'topRight',
          });
          return;
        }

        setUsers(response.data['hydra:member']);
        setUserCount(response.data['hydra:totalItems']);
        setLoading(false);
      })
      .catch(() => {
        notification.error({
          message: 'Wystąpił błąd podczas pobierania użytkowników!',
          placement: 'topRight',
        });
      });
  }, [setUsers, currentPage, reload]);

  return (
    <Layout auth>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title={
            <Space>
              <FontAwesomeIcon icon={faUsers} className="" />
              Użytkownicy
            </Space>
          }
          extra={[
            <Button type="primary" key="newUserButton" onClick={() => setUserDrawer(true)}>
              <Space>
                <FontAwesomeIcon icon={faPlus} fixedWidth />
                Dodaj użytkownika
              </Space>
            </Button>,
          ]}
        />
        <StyledContainer>
          {userCount === 0 ? (
            <Card>
              <StyledEmpty description="Brak użytkowników do wyświetlenia." />
            </Card>
          ) : (
            <Spin spinning={loading}>
              <Row gutter={[16, 16]}>
                {users.map((item) => (
                  <Col xs={24} sm={12} md={24} lg={12} xl={8} xxl={6} key={item.uuid}>
                    <Card
                      actions={
                        authData.uuid != item.uuid
                          ? [
                              <Tooltip title="Edytuj użytkownika">
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  color={colors.info}
                                  fixedWidth
                                  onClick={() => editHandler(item.uuid)}
                                />
                              </Tooltip>,
                              <Tooltip title="Usuń użytkownika">
                                <FontAwesomeIcon icon={faTrash} color={colors.danger} fixedWidth />
                              </Tooltip>,
                              <Tooltip title="Zresetuj hasło">
                                <FontAwesomeIcon icon={faKey} color={colors.primary} fixedWidth />
                              </Tooltip>,
                            ]
                          : [
                              <Tooltip title="Edytuj użytkownika">
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  color={colors.info}
                                  fixedWidth
                                  onClick={() => editHandler(item.uuid)}
                                />
                              </Tooltip>,
                            ]
                      }
                    >
                      <Card.Meta
                        avatar={
                          item.avatar == null ? (
                            <Avatar size={50}>
                              <FontAwesomeIcon icon={faUser} fixedWidth />
                            </Avatar>
                          ) : (
                            <Avatar size={50} src={item.avatar} />
                          )
                        }
                        title={item.name}
                        description={item.email}
                      />
                      <StyledDescriptions column={currentBreakpoint.md ? 2 : 1} layout="vertical">
                        <Descriptions.Item label="Uprawnienia">
                          {item.roles.map((role) => (
                            <Tag color={colors.primary} key={`${item.uuid}-${role}`}>
                              {role}
                            </Tag>
                          ))}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ostatnie logowanie">
                          <div>
                            <div>{moment(item.lastLoginDate.date).format('H:mm, D/MM/YYYY')}</div>
                            <div>({item.lastLoginDate.humanReadable})</div>
                          </div>
                        </Descriptions.Item>
                      </StyledDescriptions>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Spin>
          )}
        </StyledContainer>
        <StyledPaginationWrapper>
          {currentBreakpoint.md ? (
            <div>
              Wyświetlono {(currentPage - 1) * usersPerPage + 1}-
              {currentPage * usersPerPage > userCount ? userCount : currentPage * usersPerPage} z{' '}
              {userCount} użytkowników
            </div>
          ) : (
            ''
          )}
          <Pagination
            current={currentPage}
            total={userCount}
            onChange={paginationHandler}
            defaultPageSize={usersPerPage}
            responsive
          />
        </StyledPaginationWrapper>
      </div>
      <UserDrawer reloadUsers={reloadCurrentPage} />
    </Layout>
  );
};

export default UsersPage;
