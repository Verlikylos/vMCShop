import React from 'react';
import styled, { css } from 'styled-components';

import { Container } from '@material-ui/core';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: flex-end;

  margin: 1rem 0;
`;

const Copyright = styled.span``;

const CopyrightLink = styled.a`
  ${({ theme }) => css`
    color: ${theme.palette.secondary.main};
  `}
`;

const Footer = () => (
  <Container>
    <StyledFooter>
      <Copyright>
        Proudly powered by{' '}
        <CopyrightLink href="https://vmcshop.pro/">vMCShop Standard</CopyrightLink> v4.0.0
      </Copyright>
    </StyledFooter>
  </Container>
);

export default Footer;
