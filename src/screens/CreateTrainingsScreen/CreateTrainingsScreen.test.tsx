import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import CreateTrainingsScreen from '@src/screens/CreateTrainingsScreen/index';
import { wrapper } from '@tests/functions';

describe('CreateTrainingsScreen 컴포넌트', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/trainings/create']}>
        <CreateTrainingsScreen />
      </MemoryRouter>,
      { wrapper },
    );
  });

  it('렌더링이 올바르게 된다', () => {
    expect(screen.queryByTestId('createTriningsScreen')).not.toBeNull();
    expect(screen.queryByTestId('speedDialIcon')).not.toBeNull();
  });
});
