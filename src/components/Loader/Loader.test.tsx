import { render } from '@testing-library/react';
import React from 'react';

import Loader from '@src/components/Loader/index';

describe('Loader 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { queryByTestId } = render(<Loader />);

    expect(queryByTestId('loader')).not.toBeNull();
  });
});
