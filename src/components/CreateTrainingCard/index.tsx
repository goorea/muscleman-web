import { Close as CloseIcon } from '@mui/icons-material';
import { Card, CardContent, Fab, Tooltip } from '@mui/material';
import React, { useImperativeHandle } from 'react';
import { useForm, SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

import TrainingFormFields from '@src/components/TrainingFormFields';
import {
  CreateTrainingInput,
  TrainingCategory,
  TrainingType,
} from '@src/types/graphql';

export type CreateTrainingCardElement = {
  id: string;
  onSubmit: (
    onValid: SubmitHandler<CreateTrainingInput>,
    onInvalid: SubmitErrorHandler<CreateTrainingInput>,
  ) => void;
};

type P = {
  id: string;
  removeInput: (id: string) => void;
};

const CreateTrainingCard: React.ForwardRefRenderFunction<
  CreateTrainingCardElement,
  P
> = ({ id, removeInput }, ref) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateTrainingInput>({
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

  useImperativeHandle(ref, () => ({
    id,
    onSubmit: (onValid, onInvalid) => handleSubmit(onValid, onInvalid)(),
  }));

  return (
    <Card raised={true} sx={{ position: 'relative', overflow: 'visible' }}>
      <Tooltip
        data-testid="deleteButton"
        title="삭제"
        sx={{ position: 'absolute', right: -20, top: -20 }}
      >
        <Fab
          color="primary"
          size="small"
          aria-label="remove"
          onClick={() => removeInput(id)}
        >
          <CloseIcon />
        </Fab>
      </Tooltip>

      <CardContent>
        <TrainingFormFields<CreateTrainingInput>
          register={register}
          errors={errors}
          control={control}
          setValue={setValue}
          watch={watch}
        />
      </CardContent>
    </Card>
  );
};

export default React.forwardRef(CreateTrainingCard);
