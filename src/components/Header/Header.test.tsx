import { render } from '@testing-library/react';
import React from 'react';

import Header from './index';

describe('Header 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { queryByText } = render(<Header />);
    expect(queryByText('근육맨')).not.toBeNull();
  });
});
