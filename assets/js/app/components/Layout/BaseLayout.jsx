import React from 'react';
import Helmet from 'react-helmet';

import CssBaseline from '@material-ui/core/CssBaseline';

const BaseLayout = ({ pageTitle, children }) => (
  <>
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>

    <CssBaseline />

    {children}
  </>
);

export default BaseLayout;
