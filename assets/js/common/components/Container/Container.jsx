import styled from 'styled-components';

import { media } from '@utils';

const Container = styled.div`
  width: 100%;

  padding: 0 15px;
  margin: 0 auto;

  ${media.sm`
    max-width: 720px;
  `}

  ${media.md`
    max-width: 960px;
  `}

  ${media.lg`
    max-width: 1170px;
  `}
`;

export default Container;
