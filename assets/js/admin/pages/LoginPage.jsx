import React, { useState } from 'react';
import { Form, FormItem, Input, SubmitButton } from 'formik-antd';
import { Formik } from 'formik';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { useRecoilState } from 'recoil';

import { Card, Spin, notification } from 'antd';

import { PATH_PREFIX } from '@utils';
import LoginFormSchema from '@admin/schemas/LoginFormSchema';
import history from '@admin/history';
import { isLoggedIn, login } from '@store/modules/auth';

import background from '@images/header-background.png';

const StyledLoginBoxWrapper = styled.div`
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLoginBox = styled(Card)`
  width: 350px;
`;

const StyledLoginBoxTitle = styled.h1`
  margin: 0 0 2rem 0;

  text-align: center;
  font-size: 1.25rem;
`;

const LoginPage = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn] = useRecoilState(isLoggedIn);

  React.useEffect(() => {
    if (loggedIn) {
      history.push(`${PATH_PREFIX}/`);
    }

    setLoading(false);
  }, [loggedIn, history]);

  const handleSubmit = async (values, actions) => {
    setLoading(true);

    login(values)
      .then((response) => {
        if (response.status !== 200) {
          actions.setFieldValue('password', '');
          setLoading(false);
          notification.error({
            message: 'Podczas logowania wystąpił błąd!',
            placement: 'topRight',
          });
          return;
        }

        actions.setFieldValue('password', '');
        setLoading(false);
        notification.success({
          message: 'Logowanie przebiegło pomyślnie!',
          placement: 'topRight',
        });
        history.push(`${PATH_PREFIX}/`);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          actions.setFieldValue('password', '');
          setLoading(false);
          notification.error({
            message: 'Podane dane logowania są nieprawidłowe!',
            placement: 'topRight',
          });

          return;
        }

        actions.setFieldValue('password', '');
        setLoading(false);
        notification.error({
          message: 'Podczas logowania wystąpił błąd!',
          placement: 'topRight',
        });
      });
  };

  return (
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

      <StyledLoginBoxWrapper>
        <StyledLoginBox>
          <Spin spinning={loading}>
            <StyledLoginBoxTitle>Logowanie do ACP</StyledLoginBoxTitle>

            <Formik
              onSubmit={handleSubmit}
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={LoginFormSchema}
            >
              <Form>
                <FormItem name="email">
                  <Input type="email" name="email" placeholder="Adres e-mail" />
                </FormItem>
                <FormItem name="password">
                  <Input.Password name="password" placeholder="Hasło" />
                </FormItem>

                <SubmitButton type="primary" htmlType="submit" block>
                  Zaloguj
                </SubmitButton>
              </Form>
            </Formik>
          </Spin>
        </StyledLoginBox>
      </StyledLoginBoxWrapper>
    </>
  );
};

export default LoginPage;
