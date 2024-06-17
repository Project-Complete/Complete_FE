import { createFormContext, useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const schema = z.object({
    file: z.any()
        .nullable()
        .refine((file) => file !== null, "칠러님의 한 잔에 대한 사진은 필수입니다."),
    title: z.string().min(1, '한 잔의 이름은 필수 입니다.'),
    description: z.string().min(1, '한 잔 소개는 필수 입니다.'),
    content: z.string().min(1, '어떻게 만드는 지 알려주세요.'),
    combinations: z.array(z.object({
        id: z.string(),
        drink_id: z.number().nullable(),
        name: z.string(),
        volume: z.string(),
        xcoordinate: z.number(),
        ycoordinate: z.number(),
    }))
})

export type blenderWriteFormInitialValuesTypes = {
    file: File | null,
    title: string,
    description: string,
    content: string,
    combinations: { id: string, drink_id: number | null, name: string, volume: string, xcoordinate: number, ycoordinate: number }[]
}

export const blenderWriteFormInitialValues = {
    file: null,
    title: '',
    description: '',
    content: '',
    combinations: [],
}

export const [BlenderWriteFormProvider, useBlenderWriteFormContext, useBlenderWriteForm] = createFormContext<blenderWriteFormInitialValuesTypes>();


export const useCreateBlenderWriteForm = (name?: string) => {
    const blenderWriteForm = useForm<blenderWriteFormInitialValuesTypes>({
        mode: 'uncontrolled',
        name,
        initialValues: blenderWriteFormInitialValues,
        validateInputOnBlur: true,
        validate: zodResolver(schema),
    });
    return blenderWriteForm;
}