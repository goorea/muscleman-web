import { fireEvent, render, screen } from '@testing-library/react';
import { uniqueId } from 'lodash';
import React from 'react';

import CreateTrainingCard from '@src/components/CreateTrainingCard/index';

describe('CreateTrainingCard 컴포넌트', () => {
  const id = uniqueId();
  const removeInput = jest.fn();

  beforeEach(() => {
    render(<CreateTrainingCard id={id} removeInput={removeInput} />);
  });

  it('렌더링이 올바르게 된다', () => {
    expect(screen.queryByTestId('deleteButton')).not.toBeNull();
  });

  it('삭제 버튼을 누르면 삭제된다', () => {
    fireEvent.click(screen.getByTestId('deleteButton'));

    expect(removeInput).toBeCalledWith(id);
  });
});
