import {
  Save as SaveIcon,
  Add as AddIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Grid, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import React from 'react';

import CreateTrainingCard from '@src/components/CreateTrainingCard';

import useEvents from './hooks/useEvents';
import useSubmit from './hooks/useSubmit';

const CreateTrainingsScreen: React.FC = () => {
  const { cardRefs, cardIds, handleRef, addInput, removeInput } = useEvents();
  const { loading, handleSubmit } = useSubmit(cardRefs);

  const actions = [
    {
      icon: <AddIcon />,
      name: '추가',
      handleClick: addInput,
    },
    { icon: <SaveIcon />, name: '저장', handleClick: handleSubmit },
  ];

  return (
    <Grid data-testid="createTriningsScreen" container spacing={2}>
      {cardIds.map(id => (
        <Grid key={id} item md={6} lg={4}>
          <CreateTrainingCard
            id={id}
            ref={ref => handleRef(ref, id)}
            removeInput={removeInput}
          />
        </Grid>
      ))}

      <SpeedDial
        hidden={loading}
        ariaLabel="create-trainings-speed-dial"
        sx={{ position: 'absolute', bottom: 32, right: 32 }}
        icon={
          <SpeedDialIcon
            data-testid="speedDialIcon"
            icon={<MenuIcon />}
            openIcon={<CloseIcon />}
          />
        }
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.handleClick}
          />
        ))}
      </SpeedDial>
    </Grid>
  );
};

export default CreateTrainingsScreen;
