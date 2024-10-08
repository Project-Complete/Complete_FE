import { blenderWriteFormInitialValuesTypes } from "@/app/(withoutLayout)/drink/blender/(components)/blenderWriteFormContext";
import { api } from "@/utils/api";
import { MutateOptions, useMutation } from "@tanstack/react-query";

type PostCreateCombinationType = {
    image_url: string;
    title: string;
    description: string;
    content: string;
    combinations: {
        drink_id: number | null;
        name: string;
        volume: string;
        xcoordinate: number,
        ycoordinate: number,
    }[]
}


const postCreateCombination = async (variables: PostCreateCombinationType) => {
    const res = api.post(`combinations`, {
        json: variables
    }).json();
    return res;
}



const useCreateCombinationMutate = ({ formReset }: { formReset?: () => void }) => {
    return useMutation({
        mutationKey: ['blenderWrite'],
        mutationFn: async (variables: PostCreateCombinationType) => {
            console.log('variables', variables);
            return postCreateCombination(variables)
        },
        onError: (error, variables, context) => {
            console.log('error', error)
        },
        onSuccess: (data, variables, context) => {
            console.log('data', data)
            history.back();
            formReset && formReset();
        }
    });
}
export default useCreateCombinationMutate;