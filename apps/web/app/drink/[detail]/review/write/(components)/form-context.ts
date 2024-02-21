import { createFormContext } from '@mantine/form';

interface FormValues {
  content: string;
  situation: {
    alone: boolean;
    friend: boolean;
    partner: boolean;
    business: boolean;
    adult: boolean;
  };
  taste: {
    sweet: number | null;
    sour: number | null;
    bitter: number | null;
    body: number | null;
    refresh: number | null;
  };
  flavors: boolean[];
  foods: boolean[];
}
export const [ReviewFormProvider, useReviewFormContext, useReviewForm] =
  createFormContext<FormValues>();
