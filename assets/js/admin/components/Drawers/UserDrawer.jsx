import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, FormItem, Input, SubmitButton, Checkbox } from 'formik-antd';
import { Formik } from 'formik';
import { useRecoilState } from 'recoil';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faSpinner, faUpload } from '@fortawesome/free-solid-svg-icons';

import ImgCrop from 'antd-img-crop';
import {
  Drawer,
  Button,
  Row,
  Col,
  Space,
  List,
  Typography,
  Spin,
  Upload,
  Grid,
  notification,
} from 'antd';

import {
  getUser,
  createUser,
  updateUser,
  userDrawerState,
  selectedUserIdState,
} from '@store/modules/users';
import UserFormSchema from '@admin/schemas/UserFormSchema';
import { API_URL } from '@admin/config';

const StyledFooter = styled.div`
  text-align: right;
`;

const StyledListItem = styled(List.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledFormItem = styled(FormItem)`
  margin: 0;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: calc(100vh - 103px);
`;

const StyledImage = styled.img`
  width: 100%;
`;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const validateAvatar = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    notification.error('Dozwolone formaty pliku to PNG/JPG!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    notification.error('Maksymalny rozmiar obrazu to 2MB!');
  }

  return isJpgOrPng && isLt2M;
};

const { useBreakpoint } = Grid;

const UserDrawer = ({ reloadUsers }) => {
  const currentBreakpoints = useBreakpoint();
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [userDrawer, setUserDrawer] = useRecoilState(userDrawerState);
  const [selectedUserId, setSelectedUserId] = useRecoilState(selectedUserIdState);

  const closeDrawer = () => {
    if (editedUser !== null) {
      setEditedUser(null);
      setSelectedUserId(null);
    }

    setUserDrawer(false);
  };

  const handleAvatarUpload = (info) => {
    if (info.file.status === 'uploading') {
      setAvatarLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setAvatarUrl(imageUrl);
        setAvatarLoading(false);
      });
    }
  };

  const handleUserCreate = (values, actions) => {
    createUser(values)
      .then((response) => {
        if (response.status !== 200) {
          notification.error({
            message: 'Wystąpił błąd podczas tworzenia użytkownika!',
            placement: 'topRight',
          });
          actions.resetForm();
          setLoading(false);
          return;
        }

        notification.success({
          message: 'Użytkownik został pomyślnie utworzony!',
          placement: 'topRight',
        });
        actions.resetForm();
        setLoading(false);
        reloadUsers();
        closeDrawer();
      })
      .catch(() => {
        notification.error({
          message: 'Wystąpił błąd podczas aktualizacji użytkownika!',
          placement: 'topRight',
        });
        actions.resetForm();
        setLoading(false);
      });
  };

  const handleUserUpdate = (values, actions) => {
    updateUser(editedUser.uuid, values)
      .then((response) => {
        if (response.status !== 200) {
          notification.error({
            message: 'Wystąpił błąd podczas aktualizacji użytkownika!',
            placement: 'topRight',
          });
          actions.resetForm();
          setLoading(false);
          return;
        }

        notification.success({
          message: 'Użytkownik został pomyślnie zaktualizowany!',
          placement: 'topRight',
        });
        actions.resetForm();
        setLoading(false);
        reloadUsers();
        closeDrawer();
      })
      .catch(() => {
        notification.error({
          message: 'Wystąpił błąd podczas aktualizacji użytkownika!',
          placement: 'topRight',
        });
        actions.resetForm();
        setLoading(false);
      });
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    console.log(avatarUrl);
    return;
    setLoading(true);

    values.roles = [];

    if (values.role_acp_users) {
      values.roles.push('ROLE_ACP_USERS');
      delete values.role_acp_users;
    }

    if (values.role_acp_servers) {
      values.roles.push('ROLE_ACP_SERVERS');
      delete values.role_acp_servers;
    }

    if (values.role_acp_services) {
      values.roles.push('ROLE_ACP_SERVICES');
      delete values.role_acp_services;
    }

    if (editedUser != null) {
      handleUserUpdate(values, actions);
    }

    handleUserCreate(values, actions);
  };

  useEffect(() => {
    if (selectedUserId !== null) {
      getUser(selectedUserId)
        .then((response) => {
          if (response.status !== 200) {
            notification.error({
              message: 'Wystąpił błąd podczas ładowania danych użytkownika!',
              placement: 'topRight',
            });
            closeDrawer();
            return;
          }

          setEditedUser(response.data);
          // const { name, email } = response.data;
        })
        .catch(() => {
          notification.error({
            message: 'Wystąpił błąd podczas ładowania danych użytkownika!',
            placement: 'topRight',
          });
          closeDrawer();
        });
    }
  }, [selectedUserId]);

  return (
    <Drawer
      title={
        <Space>
          {editedUser == null ? (
            <>
              <FontAwesomeIcon icon={faPlus} />
              Dodaj nowego użytkownika
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faEdit} />
              Edycja użytkownika
              <Typography.Text strong>{editedUser.name}</Typography.Text>
            </>
          )}
        </Space>
      }
      width={currentBreakpoints.md ? 720 : '100%'}
      onClose={closeDrawer}
      visible={userDrawer}
    >
      <Spin spinning={loading}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            name: '',
            email: '',
          }}
          validationSchema={UserFormSchema}
        >
          <StyledForm layout="vertical">
            <div>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <FormItem name="name" label="Nazwa">
                    <Input name="name" />
                  </FormItem>
                </Col>
                <Col xs={24} sm={12}>
                  <FormItem name="email" label="Adres e-mail">
                    <Input type="email" name="email" />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24}>
                  <FormItem name="password" label="Hasło">
                    <Input name="password" />
                  </FormItem>
                </Col>
                {/* <Col span={12}> */}
                {/*  <FormItem name="avatar" label="Avatar"> */}
                {/*    <ImgCrop modalTitle="Edytuj obraz" modalOk="Zatwierdź" modalCancel="Anuluj"> */}
                {/*      <Upload */}
                {/*        name="avatar" */}
                {/*        action={`${API_URL}/media_objects`} */}
                {/*        accept="image/png,image/jpeg" */}
                {/*        listType="picture-card" */}
                {/*        className="avatar-uploader" */}
                {/*        showUploadList={false} */}
                {/*        beforeUpload={validateAvatar} */}
                {/*        onChange={handleAvatarUpload} */}
                {/*      > */}
                {/*        {avatarUrl ? ( */}
                {/*          <StyledImage src={avatarUrl} alt="avatar" /> */}
                {/*        ) : ( */}
                {/*          <> */}
                {/*            {avatarLoading ? ( */}
                {/*              <FontAwesomeIcon icon={faSpinner} fixedWidth spin /> */}
                {/*            ) : ( */}
                {/*              <FontAwesomeIcon icon={faUpload} fixedWidth /> */}
                {/*            )} */}
                {/*          </> */}
                {/*        )} */}
                {/*      </Upload> */}
                {/*    </ImgCrop> */}
                {/*  </FormItem> */}
                {/* </Col> */}
              </Row>
              <Row gutter={16}>
                <Col xs={24}>
                  <List size="small" header={<div>Uprawnienia</div>} bordered>
                    <StyledListItem>
                      <div>
                        <Space>
                          Dostęp do zakładki <Typography.Text strong>Użytkownicy</Typography.Text>
                        </Space>
                      </div>
                      <StyledFormItem name="role_acp_users">
                        <Checkbox name="role_acp_users" />
                      </StyledFormItem>
                    </StyledListItem>
                    <StyledListItem>
                      <div>
                        <Space>
                          Dostęp do zakładki <Typography.Text strong>Serwery</Typography.Text>
                        </Space>
                      </div>
                      <StyledFormItem name="role_acp_servers">
                        <Checkbox name="role_acp_servers" />
                      </StyledFormItem>
                    </StyledListItem>
                    <StyledListItem>
                      <div>
                        <Space>
                          Dostęp do zakładki <Typography.Text strong>Usługi</Typography.Text>
                        </Space>
                      </div>
                      <StyledFormItem name="role_acp_services">
                        <Checkbox name="role_acp_services" />
                      </StyledFormItem>
                    </StyledListItem>
                  </List>
                </Col>
              </Row>
            </div>
            <StyledFooter>
              <Space>
                <Button onClick={closeDrawer} disabled={loading}>
                  Anuluj
                </Button>
                {editedUser == null ? (
                  <SubmitButton type="primary" htmlType="submit" loading={loading}>
                    Dodaj użytkownika
                  </SubmitButton>
                ) : (
                  <SubmitButton type="primary" htmlType="submit" loading={loading}>
                    Zapisz zmiany
                  </SubmitButton>
                )}
              </Space>
            </StyledFooter>
          </StyledForm>
        </Formik>
      </Spin>
    </Drawer>
  );
};

export default UserDrawer;
