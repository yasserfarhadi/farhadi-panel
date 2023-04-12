import React from 'react';
import classnames from 'classnames';
import styled from '@emotion/styled';

const StyledPageLink = styled.span`
  position: relative;
  float: left;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  color: #5cb85c;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
  &:focus,
  &:hover {
    color: #3d8b3d;
    background-color: #eceeef;
    border-color: #ddd;
  }
`;
const StyledPageItem = styled.li`
  display: inline;
  & :first-child span {
    margin-left: 0;
    border-bottom-left-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
  }
  & :last-child span {
    border-bottom-right-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }

  &.active > span,
  &.active > span:hover,
  &.active > span:focus {
    z-index: 2;
    color: #fff;
    cursor: default;
    background-color: #5cb85c;
    border-color: #5cb85c;
  }
  &.disabled > span,
  &.disabled > span:hover,
  &.disabled > span:focus {
    color: #818a91;
    pointer-events: none;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
  }
`;

interface Props {
  page: number | string;
  currentPage: number;
  onPageChange: (page: number) => void;
  isDisabled?: boolean;
}
const PaginationItem: React.FC<Props> = ({
  page,
  currentPage,
  onPageChange,
  isDisabled = false,
}) => {
  const liClasses = classnames({
    'page-item': true,
    active: page === currentPage,
    disabled: isDisabled,
  });
  if (typeof page === 'number') {
    return (
      <StyledPageItem onClick={() => onPageChange(page)} className={liClasses}>
        <StyledPageLink>{page}</StyledPageLink>
      </StyledPageItem>
    );
  }

  return (
    <StyledPageItem onClick={() => onPageChange(1)} className={liClasses}>
      <StyledPageLink>{page}</StyledPageLink>
    </StyledPageItem>
  );
};

export default PaginationItem;
