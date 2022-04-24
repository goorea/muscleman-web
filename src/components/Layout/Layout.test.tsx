import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { wrapper } from '@tests/functions';

import Layout from './index';

describe('Layout 컴포넌트', () => {
  it('렌더링이 올바르게 된다', async () => {
    const { queryAllByText } = render(
      <MemoryRouter initialEntries={['/trainings']}>
        <Layout />
      </MemoryRouter>,
      { wrapper },
    );

    expect(queryAllByText('운동종목')).toHaveLength(2);
  });
});
