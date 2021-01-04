import React from 'react';
import styled from 'styled-components';

import { Pagination } from '@material-ui/lab';

import { Article } from '@app/components/News';

const articles = [
  {
    link: '#',
    image: 'https://ocdn.eu/images/pulscms/OTI7MDA_/150597b270dabc10dfe00ed9fb4d7043.jpg',
    title: 'Lorem impsum dolor',
    preface:
      "No, media queries aren't designed to work based on elements in a page. They are designed to work based on devices or media types (hence why they are called media queries). width, height, and other dimension-based media features all refer to the dimensions of either the viewport or the device's screen in screen-based media.",
    avatar: 'https://verlikylos.dev/static/avatar-7ba0d5b7025cbb87ffe7108d01a5a67d.jpg',
    author: 'Verlikylos',
    date: '12 minut temu',
    vertical: false,
  },
  {
    link: '#',
    image: 'https://ocdn.eu/images/pulscms/OTI7MDA_/150597b270dabc10dfe00ed9fb4d7043.jpg',
    title: 'Lorem impsum dolor',
    preface:
      "No, media queries aren't designed to work based on elements in a page. They are designed to work based on devices or media types (hence why they are called media queries). width, height, and other dimension-based media features all refer to the dimensions of either the viewport or the device's screen in screen-based media.",
    avatar: 'https://verlikylos.dev/static/avatar-7ba0d5b7025cbb87ffe7108d01a5a67d.jpg',
    author: 'Verlikylos',
    date: '12 minut temu',
    vertical: true,
  },
  {
    link: '#',
    image: 'https://ocdn.eu/images/pulscms/OTI7MDA_/150597b270dabc10dfe00ed9fb4d7043.jpg',
    title: 'Lorem impsum dolor',
    preface:
      "No, media queries aren't designed to work based on elements in a page. They are designed to work based on devices or media types (hence why they are called media queries). width, height, and other dimension-based media features all refer to the dimensions of either the viewport or the device's screen in screen-based media.",
    avatar: 'https://verlikylos.dev/static/avatar-7ba0d5b7025cbb87ffe7108d01a5a67d.jpg',
    author: 'Verlikylos',
    date: '12 minut temu',
    vertical: true,
  },
  {
    link: '#',
    image: 'https://ocdn.eu/images/pulscms/OTI7MDA_/150597b270dabc10dfe00ed9fb4d7043.jpg',
    title: 'Lorem impsum dolor',
    preface:
      "No, media queries aren't designed to work based on elements in a page. They are designed to work based on devices or media types (hence why they are called media queries). width, height, and other dimension-based media features all refer to the dimensions of either the viewport or the device's screen in screen-based media.",
    avatar: 'https://verlikylos.dev/static/avatar-7ba0d5b7025cbb87ffe7108d01a5a67d.jpg',
    author: 'Verlikylos',
    date: '12 minut temu',
    vertical: true,
  },
  {
    link: '#',
    image: 'https://ocdn.eu/images/pulscms/OTI7MDA_/150597b270dabc10dfe00ed9fb4d7043.jpg',
    title: 'Lorem impsum dolor',
    preface:
      "No, media queries aren't designed to work based on elements in a page. They are designed to work based on devices or media types (hence why they are called media queries). width, height, and other dimension-based media features all refer to the dimensions of either the viewport or the device's screen in screen-based media.",
    avatar: 'https://verlikylos.dev/static/avatar-7ba0d5b7025cbb87ffe7108d01a5a67d.jpg',
    author: 'Verlikylos',
    date: '12 minut temu',
    vertical: true,
  },
  {
    link: '#',
    image: 'https://ocdn.eu/images/pulscms/OTI7MDA_/150597b270dabc10dfe00ed9fb4d7043.jpg',
    title: 'Lorem impsum dolor',
    preface:
      "No, media queries aren't designed to work based on elements in a page. They are designed to work based on devices or media types (hence why they are called media queries). width, height, and other dimension-based media features all refer to the dimensions of either the viewport or the device's screen in screen-based media.",
    avatar: 'https://verlikylos.dev/static/avatar-7ba0d5b7025cbb87ffe7108d01a5a67d.jpg',
    author: 'Verlikylos',
    date: '12 minut temu',
    vertical: true,
  },
];

const StyledGrid = styled.section`
  display: grid;

  grid-template-columns: auto auto auto auto auto auto;
  grid-template-rows: auto;
  grid-template-areas:
    'big big big big big big'
    'mid1 mid1 mid1 mid2 mid2 mid2'
    'small1 small1 small2 small2 small3 small3';
  grid-row-gap: 80px;
  grid-column-gap: 40px;
`;

const StyledBigArticle = styled.div`
  grid-area: big;
`;

const StyledFirstMidArticle = styled.div`
  grid-area: mid1;
`;

const StyledSecondMidArticle = styled.div`
  grid-area: mid2;
`;

const StyledFirstSmallArticle = styled.div`
  grid-area: small1;
`;

const StyledSecondSmallArticle = styled.div`
  grid-area: small2;
`;

const StyledThirdSmallArticle = styled.div`
  grid-area: small3;
`;

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;

  margin-top: 5rem;
`;

const NewsFeedSection = () => (
  <>
    <StyledGrid>
      <StyledBigArticle>
        <Article
          link={articles[0].link}
          image={articles[0].image}
          title={articles[0].title}
          preface={articles[0].preface}
          avatar={articles[0].avatar}
          author={articles[0].author}
          date={articles[0].date}
          vertical={articles[0].vertical}
        />
      </StyledBigArticle>
      <StyledFirstMidArticle>
        <Article
          link={articles[1].link}
          image={articles[1].image}
          title={articles[1].title}
          preface={articles[1].preface}
          avatar={articles[1].avatar}
          author={articles[1].author}
          date={articles[1].date}
          vertical={articles[1].vertical}
        />
      </StyledFirstMidArticle>
      <StyledSecondMidArticle>
        <Article
          link={articles[2].link}
          image={articles[2].image}
          title={articles[2].title}
          preface={articles[2].preface}
          avatar={articles[2].avatar}
          author={articles[2].author}
          date={articles[2].date}
          vertical={articles[2].vertical}
        />
      </StyledSecondMidArticle>
      <StyledFirstSmallArticle>
        <Article
          link={articles[3].link}
          image={articles[3].image}
          title={articles[3].title}
          preface={articles[3].preface}
          avatar={articles[3].avatar}
          author={articles[3].author}
          date={articles[3].date}
          vertical={articles[3].vertical}
        />
      </StyledFirstSmallArticle>
      <StyledSecondSmallArticle>
        <Article
          link={articles[4].link}
          image={articles[4].image}
          title={articles[4].title}
          preface={articles[4].preface}
          avatar={articles[4].avatar}
          author={articles[4].author}
          date={articles[4].date}
          vertical={articles[4].vertical}
        />
      </StyledSecondSmallArticle>
      <StyledThirdSmallArticle>
        <Article
          link={articles[5].link}
          image={articles[5].image}
          title={articles[5].title}
          preface={articles[5].preface}
          avatar={articles[5].avatar}
          author={articles[5].author}
          date={articles[5].date}
          vertical={articles[5].vertical}
        />
      </StyledThirdSmallArticle>
    </StyledGrid>
    <StyledPagination color="primary" count={10} shape="rounded" />
  </>
);

// NewsFeedSection.propTypes = {};
//
// NewsFeedSection.defaultProps = {};

export default NewsFeedSection;
