import { Delete as DeleteIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { toastsState } from '@src/recoils';

type P = {
  selected: string[];
  onDelete: () => Promise<void>;
};

const TableToolbar: React.FC<P> = ({ selected, onDelete }) => {
  const setToasts = useSetRecoilState(toastsState);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => setOpen(true);

  const handleConfirm = async () => {
    setLoading(true);
    await onDelete();
    setToasts(prevState =>
      prevState.concat({
        message: '삭제되었습니다.',
        severity: 'success',
      }),
    );
    setOpen(false);
    setLoading(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selected.length > 0 && {
            bgcolor: theme =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity,
              ),
          }),
        }}
      >
        {selected.length > 0 && (
          <>
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {selected.length}개 선택
            </Typography>
            <Tooltip title="삭제">
              <IconButton onClick={handleClick}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Toolbar>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-trainings-dialog-title"
        aria-describedby="deleete-trainings-dialog-description"
      >
        <DialogTitle id="delete-trainings-dialog-title">
          정말 삭제하시겠습니까?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="deleete-trainings-dialog-description">
            정말 삭제하시겠습니까?
            <br />
            삭제하신 내용은 복구 할 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <LoadingButton onClick={handleConfirm} autoFocus loading={loading}>
            확인
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TableToolbar;
