import React from 'react';
// import PropTypes from 'prop-types';

import styled from 'styled-components';
import headerBackground from '@images/header-background.png';
import logo from '@images/logo.png';

const StyledHeader = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40vh;

  background: url('${headerBackground}') center center no-repeat;
`;

const StyledLogo = styled.img`
  height: 50%;
`;

const Header = () => (
  <StyledHeader>
    <StyledLogo src={logo} alt="Page logo" />
  </StyledHeader>
);

// Header.propTypes = {};
//
// Header.defaultProps = {};

export default Header;
