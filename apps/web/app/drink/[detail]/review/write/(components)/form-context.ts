import { createFormContext } from '@mantine/form';

interface FormValues {
  content: string;
  rating: number;
  situation: {
    alone: boolean;
    friend: boolean;
    partner: boolean;
    business: boolean;
    adult: boolean;
  };
  taste: {
    sweet: number;
    sour: number;
    bitter: number;
    body: number;
    refresh: number;
  };
  flavors: boolean[];
  foods: boolean[];
}
export const [ReviewFormProvider, useReviewFormContext, useReviewForm] =
  createFormContext<FormValues>();
