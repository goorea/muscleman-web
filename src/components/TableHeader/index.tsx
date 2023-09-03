import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React from 'react';

import { Cell, Order } from '@src/types/table';

type P<T> = {
  cells: readonly Cell<T>[];
  selectedCount: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
};

function TableHeader<T>({
  cells,
  onSelectAllClick,
  order,
  orderBy,
  selectedCount,
  rowCount,
  onRequestSort,
}: P<T>) {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={selectedCount > 0 && selectedCount < rowCount}
            checked={rowCount > 0 && selectedCount === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all',
            }}
          />
        </TableCell>

        {cells.map(cell => (
          <TableCell
            key={cell.id}
            align={cell.align}
            padding={cell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === cell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : 'desc'}
              onClick={createSortHandler(cell.id)}
            >
              {cell.label}
              {orderBy === cell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}

        <TableCell align="center" padding="normal">
          <TableSortLabel hideSortIcon={true}>수정</TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
