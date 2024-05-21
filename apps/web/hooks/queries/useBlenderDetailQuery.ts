import { api } from '@/utils/api';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

const blenderDetailFetcher = async (detailId: number) => {
  const response = await api.get(`combinations/${detailId}`).json<Blender>();
  //   console.log(response);
  return response;
};

export const useBlenderDetailQuery = ({
  detailId,
}: {
  detailId: number;
}): UseQueryResult<Blender, Error> => {
  return useQuery({
    queryKey: ['blender', detailId],
    queryFn: () => {
      return blenderDetailFetcher(detailId);
    },
  });
};
