import React from 'react';
// import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {
  useScrollTrigger,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';

const StyledAppBar = styled(AppBar)`
  ${({ scrolled, theme }) => css`
    padding: ${scrolled ? '0' : '1rem 0'};

    background-color: ${scrolled ? theme.palette.primary.main : 'transparent'};

    box-shadow: ${scrolled ? theme.shadows[3] : 'none'};
    transition: background-color ease-in-out 0.2s, box-shadow ease-in-out 0.2s,
      padding ease-in-out 0.15s;
  `}
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Navigation = ({ window }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 60,
    target: window ? window() : undefined,
  });

  return (
    <StyledAppBar elevation={3} position="fixed" scrolled={trigger ? 1 : 0}>
      <StyledContainer>
        <Typography variant="h6">vMCShop</Typography>
        <StyledToolbar>
          <Button color="inherit">
            <FontAwesomeIcon className="mr-3" icon={faHome} />
            strona główna
          </Button>
        </StyledToolbar>
      </StyledContainer>
    </StyledAppBar>
  );
};

// Navigation.propTypes = {};
//
// Navigation.defaultProps = {};

export default Navigation;
