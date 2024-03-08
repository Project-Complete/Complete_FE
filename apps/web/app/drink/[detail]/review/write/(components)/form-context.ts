import { createFormContext } from '@mantine/form';

export interface FormValues {
  content: string;
  rating: number;
  situation_dto: {
    alone: boolean;
    friend: boolean;
    partner: boolean;
    business: boolean;
    adult: boolean;
  };
  taste_dto: {
    sweet: number;
    sour: number;
    bitter: number;
    body: number;
    refresh: number;
  };
  flavors: boolean[] | number[];
  foods: boolean[] | number[];
}
export const [ReviewFormProvider, useReviewFormContext, useReviewForm] =
  createFormContext<FormValues>();
