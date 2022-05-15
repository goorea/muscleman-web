import { uniqueId } from 'lodash';
import { useRef, useState } from 'react';

import { CreateTrainingCardElement } from '@src/components/CreateTrainingCard';

const useEvents = () => {
  const cardRefs = useRef<CreateTrainingCardElement[]>([]);
  const [cardIds, setCardIds] = useState<string[]>([uniqueId()]);

  const handleRef = (ref: CreateTrainingCardElement | null, id: string) => {
    if (ref && !cardRefs.current.some(cardRef => cardRef.id === id)) {
      cardRefs.current = cardRefs.current.concat(ref);
    }
  };

  const addInput = () => setCardIds(prevState => prevState.concat(uniqueId()));

  const removeInput = (id: string) => {
    if (cardIds.length > 1) {
      setCardIds(prevState => prevState.filter(prevId => prevId !== id));
      cardRefs.current = cardRefs.current.filter(cardRef => cardRef.id !== id);
    }
  };

  return {
    cardRefs,
    cardIds,
    handleRef,
    addInput,
    removeInput,
  };
};

export default useEvents;
