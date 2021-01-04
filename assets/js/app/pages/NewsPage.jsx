import * as React from 'react';

import { Button } from '@material-ui/core';
import { Layout } from '@app/components/Layout';
import {NewsFeedSection} from "@app/components/Sections";

const NewsPage = () => (
  <Layout pageTitle="vMCShop - Strona główna">
    <NewsFeedSection />
    {/* <Button color="success" variant="contained"> */}
    {/*  success */}
    {/* </Button> */}
    {/* <Button color="danger" variant="contained"> */}
    {/*  danger */}
    {/* </Button> */}
    {/* <Button color="warning" variant="contained"> */}
    {/*  warning */}
    {/* </Button> */}
    {/* <Button color="info" variant="contained"> */}
    {/*  info */}
    {/* </Button> */}
  </Layout>
);

export default NewsPage;
