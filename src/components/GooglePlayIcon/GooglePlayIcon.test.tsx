import { render } from '@testing-library/react';
import React from 'react';

import GooglePlayIcon from './index';

describe('GooglePlayIcon 컴포넌트', () => {
  it('렌더링이 올바르게 된다', () => {
    const { queryByTestId } = render(<GooglePlayIcon />);

    expect(queryByTestId('googlePlayIcon')).not.toBeNull();
  });
});
