import {
  TableRow,
  TableCell,
  Checkbox,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  Button,
} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import Loader from '@src/components/Loader';
import TableHeader from '@src/components/TableHeader';
import TableToolbar from '@src/components/TableToolbar';
import TrainingEditModal from '@src/components/TrainingEditModal';
import {
  getTrainingCategoryForKorean,
  getTrainingTypeForKorean,
} from '@src/functions';
import useTable from '@src/hooks/useTable';
import { Training } from '@src/types/graphql';

import useEvents from './hooks/useEvents';
import useFetch from './hooks/useFetch';
import useTrainingTable from './hooks/useTable';

const TrainingsScreen: React.FC = () => {
  const { cells } = useTrainingTable();
  const { loading, trainings } = useFetch();
  const {
    selected,
    setSelected,
    isSelected,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    rows,
    getItemAriaLabel,
    order,
    orderBy,
    emptyRows,
    page,
    rowsPerPage,
  } = useTable<Training>(trainings);
  const { handleEdit, handleDelete } = useEvents(selected, setSelected);

  if (loading) {
    return <Loader />;
  }

  return (
    <div data-testid="trainingsScreen">
      <TableToolbar selected={selected} onDelete={handleDelete} />

      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHeader<Training>
            cells={cells}
            selectedCount={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={trainings.length}
          />
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row._id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.name}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      onClick={event => handleClick(event, row._id)}
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    {getTrainingCategoryForKorean(row.category)}
                  </TableCell>
                  <TableCell align="center">
                    {getTrainingTypeForKorean(row.type)}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="center">{row.preference}</TableCell>
                  <TableCell>{row.thumbnailPath}</TableCell>
                  <TableCell>{row.videoPath}</TableCell>
                  <TableCell align="center">
                    {dayjs(row.createdAt).format('YYYY-MM-DD')}
                  </TableCell>
                  <TableCell align="center">
                    {dayjs(row.updatedAt).format('YYYY-MM-DD')}
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" onClick={() => handleEdit(row)}>
                      수정
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        count={trainings.length}
        onPageChange={handleChangePage}
        page={page}
        rowsPerPage={rowsPerPage}
        getItemAriaLabel={getItemAriaLabel}
        labelRowsPerPage="페이지당 행 수:"
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        showFirstButton={true}
        showLastButton={true}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <TrainingEditModal />
    </div>
  );
};

export default TrainingsScreen;
