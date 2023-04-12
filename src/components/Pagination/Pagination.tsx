import React from 'react';
import PaginationItem from './PaginationItem';
import styled from '@emotion/styled';

const range = (current = 1, range: number = 4) =>
  Array.from(Array(range - current).keys()).map((el: number) => el + current);

interface Props {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

type CutPagesParams = {
  pagesCount: number;
  pagesCutCount: number;
  currentPage: number;
};
type CutPagesReturn = {
  start: number;
  end: number;
};
type CutPages = (params: CutPagesParams) => CutPagesReturn;

const getPagesCut: CutPages = ({ pagesCount, pagesCutCount, currentPage }) => {
  const ceiling = Math.ceil(pagesCutCount / 2);
  const floor = Math.floor(pagesCutCount / 2);
  if (pagesCount < pagesCutCount) {
    return { start: 1, end: pagesCount + 1 };
  } else if (currentPage >= 1 && currentPage <= ceiling) {
    return { start: 1, end: pagesCutCount + 1 };
  } else if (currentPage + floor >= pagesCount) {
    return { start: pagesCount - pagesCutCount + 1, end: pagesCount + 1 };
  } else {
    return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
  }
};

const StyledList = styled.ul`
  display: inline-block;
  padding-left: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
`;

const Pagination: React.FC<Props> = ({
  currentPage,
  total,
  limit,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / limit);
  const isFirstPage = currentPage === 1;
  const pagesCut = getPagesCut({ pagesCount, pagesCutCount: 5, currentPage });
  const pages = range(pagesCut.start, pagesCut.end);
  const isLastPage = currentPage === pagesCount;
  return (
    <div>
      <StyledList>
        <PaginationItem
          page="First"
          currentPage={currentPage}
          onPageChange={() => onPageChange(1)}
        />
        <PaginationItem
          page="Prev"
          currentPage={currentPage}
          onPageChange={(prev: number) => onPageChange(currentPage - prev)}
          isDisabled={isFirstPage}
        />
        {pages.map((page) => (
          <PaginationItem
            page={page}
            key={page}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        ))}
        <PaginationItem
          page="Next"
          currentPage={currentPage}
          onPageChange={(next: number) => onPageChange(currentPage + next)}
          isDisabled={isLastPage}
        />
        <PaginationItem
          page="Last"
          currentPage={currentPage}
          onPageChange={() => onPageChange(pagesCount)}
        />
      </StyledList>
    </div>
  );
};

export default Pagination;
