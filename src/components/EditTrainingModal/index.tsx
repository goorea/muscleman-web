import { LoadingButton } from '@mui/lab';
import { Backdrop, Fade, Modal, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import TrainingFormFields from '@src/components/TrainingFormFields';
import { editingTrainingState } from '@src/screens/TrainingsScreen/recoils';
import {
  Training,
  TrainingCategory,
  TrainingType,
  UpdateTrainingInput,
} from '@src/types/graphql';

import useSubmit from './hooks/useSubmit';
import { StyledBox } from './styled';

const EditTraningModal: React.FC = () => {
  const [editingTraining, setEditingTraining] = useRecoilState<Training | null>(
    editingTrainingState,
  );
  const handleClose = () => setEditingTraining(null);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateTrainingInput>({
    defaultValues: {
      name: '',
      category: TrainingCategory.Weight,
      type: TrainingType.Etc,
      description: '',
      preference: 1,
      thumbnailPath: null,
      videoPath: null,
    },
  });
  const { onSubmit, errorMessages } = useSubmit();

  useEffect(() => {
    if (editingTraining) {
      setValue('name', editingTraining.name);
      setValue('category', editingTraining.category);
      setValue('type', editingTraining.type);
      setValue('description', editingTraining.description);
      setValue('preference', editingTraining.preference);
      setValue('thumbnailPath', editingTraining.thumbnailPath);
      setValue('videoPath', editingTraining.videoPath);
    }
  }, [editingTraining, setValue]);

  return (
    <Modal
      open={!!editingTraining}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={!!editingTraining}>
        <StyledBox
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TrainingFormFields<UpdateTrainingInput>
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
          />

          {errorMessages.map(message => (
            <Typography
              key={message}
              color="error"
              variant="body2"
              gutterBottom={false}
            >
              {message}
            </Typography>
          ))}

          <LoadingButton
            type="submit"
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            fullWidth
            loading={isSubmitting}
            sx={{ mt: 1 }}
          >
            저장
          </LoadingButton>
        </StyledBox>
      </Fade>
    </Modal>
  );
};

export default EditTraningModal;
