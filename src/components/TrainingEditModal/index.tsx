import { LoadingButton } from '@mui/lab';
import {
  Backdrop,
  Fade,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import {
  getTrainingCategoryForKorean,
  getTrainingTypeForKorean,
} from '@src/functions';
import { editingTrainingState } from '@src/screens/TrainingsScreen/recoils';
import { Training, TrainingCategory, TrainingType } from '@src/types/graphql';

import useRules from './hooks/useRules';
import useSubmit from './hooks/useSubmit';
import { StyledBox } from './styled';

export type EditTrainingInput = {
  name: string;
  category: TrainingCategory;
  type: TrainingType;
  description?: string | null;
  preference?: number | null;
  thumbnailPath?: string | null;
  videoPath?: string | null;
};

const TrainingEditModal: React.FC = () => {
  const [editingTraining, setEditingTraining] = useRecoilState<Training | null>(
    editingTrainingState,
  );
  const handleClose = () => setEditingTraining(null);
  const {
    nameRules,
    categoryRules,
    typeRules,
    descriptionRules,
    preferenceRules,
    thumbnailPathRules,
    videoPathRules,
  } = useRules();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditTrainingInput>({
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
          <TextField
            error={!!errors.name}
            margin="normal"
            fullWidth
            id="name"
            label="이름"
            autoFocus
            helperText={errors.name?.message}
            {...register('name', nameRules)}
          />

          <InputLabel id="category-label" sx={{ mt: 1 }}>
            카테고리
          </InputLabel>
          <Controller
            name="category"
            control={control}
            rules={categoryRules}
            render={({ field }) => (
              <Select
                fullWidth
                labelId="category-label"
                id="category"
                inputProps={{ 'data-testid': 'category' }}
                {...field}
              >
                {Object.values(TrainingCategory).map(category => (
                  <MenuItem key={category} value={category}>
                    {getTrainingCategoryForKorean(category)}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          <InputLabel id="type-label" sx={{ mt: 1 }}>
            타입
          </InputLabel>
          <Controller
            name="type"
            control={control}
            rules={typeRules}
            render={({ field }) => (
              <Select
                fullWidth
                labelId="type-label"
                id="type"
                inputProps={{ 'data-testid': 'type' }}
                {...field}
              >
                {Object.values(TrainingType).map(type => (
                  <MenuItem key={type} value={type}>
                    {getTrainingTypeForKorean(type)}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          <TextField
            error={!!errors.description}
            margin="normal"
            fullWidth
            id="description"
            label="설명"
            helperText={errors.description?.message}
            multiline={true}
            type="number"
            {...register('description', descriptionRules)}
          />

          <TextField
            error={!!errors.preference}
            margin="normal"
            fullWidth
            id="preference"
            label="선호도"
            helperText={errors.preference?.message}
            type="number"
            {...register('preference', preferenceRules)}
          />

          <TextField
            error={!!errors.thumbnailPath}
            margin="normal"
            fullWidth
            id="thumbnailPath"
            label="썸네일 경로"
            helperText={errors.thumbnailPath?.message}
            multiline={true}
            {...register('thumbnailPath', thumbnailPathRules)}
          />

          <TextField
            error={!!errors.videoPath}
            margin="normal"
            fullWidth
            id="videoPath"
            label="비디오 경로"
            helperText={errors.videoPath?.message}
            multiline={true}
            {...register('videoPath', videoPathRules)}
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

export default TrainingEditModal;
