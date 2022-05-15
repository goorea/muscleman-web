import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { Control, UseFormRegister } from 'react-hook-form/dist/types/form';

import {
  getTrainingCategoryForKorean,
  getTrainingTypeForKorean,
} from '@src/functions';
import {
  CreateTrainingInput,
  TrainingCategory,
  TrainingType,
  UpdateTrainingInput,
} from '@src/types/graphql';

import useRules from './hooks/useRules';

type TrainingInput = CreateTrainingInput | UpdateTrainingInput;

type P<T extends TrainingInput> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  control?: Control<T>;
};

function TrainingFormFields<T extends TrainingInput>({
  register,
  errors,
  control,
}: P<T>) {
  const {
    nameRules,
    categoryRules,
    typeRules,
    descriptionRules,
    preferenceRules,
    thumbnailPathRules,
    videoPathRules,
  } = useRules();

  return (
    <>
      <TextField
        error={!!errors.name}
        margin="normal"
        fullWidth
        id="name"
        label="이름"
        autoFocus
        helperText={errors.name?.message}
        // @ts-ignore: https://github.com/react-hook-form/react-hook-form/discussions/4807
        {...register('name', nameRules)}
      />

      <InputLabel id="category-label" sx={{ mt: 1 }}>
        카테고리
      </InputLabel>
      {control && (
        <Controller
          // @ts-ignore: https://github.com/react-hook-form/react-hook-form/discussions/4807
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
      )}

      <InputLabel id="type-label" sx={{ mt: 1 }}>
        타입
      </InputLabel>
      {control && (
        <Controller
          // @ts-ignore: https://github.com/react-hook-form/react-hook-form/discussions/4807
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
      )}

      <TextField
        error={!!errors.description}
        margin="normal"
        fullWidth
        id="description"
        label="설명"
        helperText={errors.description?.message}
        multiline={true}
        type="number"
        // @ts-ignore: https://github.com/react-hook-form/react-hook-form/discussions/4807
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
        // @ts-ignore: https://github.com/react-hook-form/react-hook-form/discussions/4807
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
        // @ts-ignore: https://github.com/react-hook-form/react-hook-form/discussions/4807
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
        // @ts-ignore: https://github.com/react-hook-form/react-hook-form/discussions/4807
        {...register('videoPath', videoPathRules)}
      />
    </>
  );
}

export default TrainingFormFields;
