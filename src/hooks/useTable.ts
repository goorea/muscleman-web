import dayjs from 'dayjs';
import React, { useState } from 'react';

import { Model } from '@src/types/graphql';
import { Order } from '@src/types/table';

// eslint-disable-next-line
const descendingComparator = <T extends Record<string, any>>(
  a: T,
  b: T,
  orderBy: string,
) => {
  if (dayjs(a[orderBy]).isValid()) {
    return dayjs(a[orderBy]).isAfter(dayjs(b[orderBy]), 'days') ? 1 : -1;
  }

  if (typeof a[orderBy] === 'string') {
    return a[orderBy].localeCompare(b[orderBy]);
  }

  if (typeof a[orderBy] === 'number') {
    return a[orderBy] - b[orderBy];
  }

  return 0;
};

const getComparator = <T extends Model>(
  order: Order,
  orderBy: string,
): ((a: T, b: T) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator<T>(a, b, orderBy)
    : (a, b) => -descendingComparator<T>(a, b, orderBy);
};

const useTable = <T extends Model>(data: T[]) => {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<string>('createdAt');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rows = data
    .slice()
    .sort(getComparator<T>(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      return setSelected(data.map(({ _id }) => _id));
    }

    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    _id: string,
  ) => {
    setSelected(prevSelected =>
      prevSelected.includes(_id)
        ? prevSelected.filter(prevID => prevID !== _id)
        : prevSelected.concat(_id),
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const getItemAriaLabel = (type: 'first' | 'last' | 'next' | 'previous') => {
    switch (type) {
      case 'first':
        return '첫 번째 페이지로 이동';
      case 'last':
        return '마지막 페이지로 이동';
      case 'next':
        return '다음 페이지로 이동';
      case 'previous':
        return '이전 페이지로 이동';
      default:
        return '';
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const isSelected = (_id: string) => selected.includes(_id);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (data.length || 0)) : 0;

  return {
    rows,
    selected,
    setSelected,
    order,
    orderBy,
    page,
    rowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    getItemAriaLabel,
    handleChangeRowsPerPage,
    isSelected,
    emptyRows,
  };
};

export default useTable;
