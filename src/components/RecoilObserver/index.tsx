import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

type P = {
  node: any;
  onChange: (value: any) => void;
};

const RecoilObserver: React.FC<P> = ({ node, onChange }) => {
  const value = useRecoilValue(node);

  useEffect(() => onChange(value), [onChange, value]);

  return null;
};

export default RecoilObserver;
