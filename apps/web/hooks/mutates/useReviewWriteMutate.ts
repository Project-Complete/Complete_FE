import { FormValues } from '@/app/(withoutLayout)/drink/[detail]/review/write/(components)/form-context';
import { api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';

export const useReviewWriteMutate = ({ detailId }: { detailId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ review }: { review: FormValues }) => {
      const response = await api
        .post(`reviews`, {
          json: {
            ...review,
          },
        })
        .json();

      return response;
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['reviewList', detailId] });
    },
  });
};

export const useReviewPictureUpload = () => {
  return useMutation({
    mutationFn: async ({
      storageUrl,
      file,
    }: {
      storageUrl: string;
      file: File | null;
    }) => {
      try {
        const response = await ky.put(storageUrl, {
          body: file,
        });

        console.log('pose image response', response);

        return response;
      } catch (error) {
        console.error('image post error', error);
        alert('리뷰 이미지 등록 실패');
        throw new Error('리뷰 이미지 등록실패');
      }
    },
  });
};
