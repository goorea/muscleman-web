import { render, screen } from '@testing-library/react';
import React from 'react';

import TrainingFormFields from '@src/components/TrainingFormFields/index';

describe('TrainingFormFields 컴포넌트', () => {
  beforeEach(() => {
    render(<TrainingFormFields register={jest.fn()} errors={{}} />);
  });

  it('렌더링이 올바르게 된다', () => {
    expect(screen.queryByLabelText('이름')).not.toBeNull();
    expect(screen.queryByText('카테고리')).not.toBeNull();
    expect(screen.queryByText('타입')).not.toBeNull();
    expect(screen.queryByLabelText('선호도')).not.toBeNull();
    expect(screen.queryByLabelText('썸네일 경로')).not.toBeNull();
    expect(screen.queryByLabelText('비디오 경로')).not.toBeNull();
  });
});
