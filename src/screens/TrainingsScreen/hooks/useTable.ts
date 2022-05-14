import { Training } from '@src/types/graphql';
import { Cell } from '@src/types/table';

const useTable = () => {
  const cells: readonly Cell<Training>[] = [
    {
      id: 'name',
      disablePadding: true,
      label: '이름',
    },
    {
      id: 'category',
      disablePadding: false,
      label: '카테고리',
      align: 'center',
    },
    {
      id: 'type',
      disablePadding: false,
      label: '타입',
      align: 'center',
    },
    {
      id: 'description',
      disablePadding: false,
      label: '설명',
      align: 'center',
    },
    {
      id: 'preference',
      disablePadding: false,
      label: '선호도',
      align: 'center',
    },
    {
      id: 'thumbnailPath',
      disablePadding: false,
      label: '썸네일',
      align: 'center',
    },
    {
      id: 'videoPath',
      disablePadding: false,
      label: '비디오',
      align: 'center',
    },
    {
      id: 'createdAt',
      disablePadding: false,
      label: '생성일',
      align: 'center',
    },
    {
      id: 'updatedAt',
      disablePadding: false,
      label: '변경일',
      align: 'center',
    },
  ];

  return {
    cells,
  };
};

export default useTable;
