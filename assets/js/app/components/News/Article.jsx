import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledArticleWrapper = styled.article``;

const StyledArticle = styled.a`
  display: grid;
  grid-template-columns: 60% auto;
  grid-column-gap: 40px;

  text-decoration: none;

  ${({ vertical }) =>
    vertical &&
    css`
      grid-template-columns: 100%;
      grid-template-rows: auto auto;
    `}
`;

const StyledArticleImage = styled.img`
  ${({ theme }) => css`
    width: 100%;

    grid-column: 1/2;

    border-radius: ${theme.shape.borderRadius}px;
  `}
`;

const StyledArticleContent = styled.div`
  grid-column: 2/3;

  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ vertical }) =>
    vertical &&
    css`
      grid-column: 1/2;
    `}
`;

const StyledArticleHeader = styled.h3`
  ${({ theme }) => css`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    color: ${theme.palette.primary.main};
    font-size: 1.75rem;
    font-weight: ${theme.typography.fontWeightBold};

    text-decoration: none !important;
  `}
`;

const StyledArticlePreface = styled.p`
  ${({ theme }) => css`
    color: ${theme.palette.text.primary};
    font-size: 1rem;
  `}
`;

const StyledArticleFooter = styled.div`
  display: flex;

  margin-top: 1rem;
`;

const StyledArticleAuthorAvatar = styled.img`
  width: 34px;
  height: 34px;

  border-radius: 50%;
`;

const StyledArticleInfo = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 0.5rem;
`;

const StyledArticleAuthorName = styled.span`
  ${({ theme }) => css`
    color: ${theme.palette.text.hint};
    font-size: 12px;
    font-weight: ${theme.typography.fontWeightMedium};
    text-transform: uppercase;
    letter-spacing: 0.03rem;
  `}
`;

const StyledArticleDateCreated = styled.span`
  ${({ theme }) => css`
    color: ${theme.palette.text.secondary};
    font-size: 12px;
    font-weight: ${theme.typography.fontWeightMedium};
    text-transform: uppercase;
    letter-spacing: 0.03rem;
  `}
`;

const Article = ({ link, image, title, preface, avatar, author, date, vertical }) => (
  <StyledArticleWrapper>
    <StyledArticle vertical={vertical ? 1 : 0} href={link}>
      <StyledArticleImage src={image} alt="s" />
      <StyledArticleContent vertical={vertical ? 1 : 0}>
        <StyledArticleHeader>{title}</StyledArticleHeader>
        <StyledArticlePreface>{preface}</StyledArticlePreface>
        <StyledArticleFooter>
          <StyledArticleAuthorAvatar src={avatar} alt={author} />
          <StyledArticleInfo>
            <StyledArticleAuthorName>{author}</StyledArticleAuthorName>
            <StyledArticleDateCreated>{date}</StyledArticleDateCreated>
          </StyledArticleInfo>
        </StyledArticleFooter>
      </StyledArticleContent>
    </StyledArticle>
  </StyledArticleWrapper>
);

Article.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  preface: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

Article.defaultProps = {};

export default Article;
