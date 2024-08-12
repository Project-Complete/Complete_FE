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

const patchEditCombination = async ({ combinationBorderId, variables }: { combinationBorderId: number, variables: PostCreateCombinationType }) => {
    const res = api.patch(`combinations/${combinationBorderId}`, {
        json: variables
    }).json();
    return res;
}



const useEditCombinationMutate = ({ combinationBorderId, formReset }: { combinationBorderId?: number, formReset?: () => void }) => {

    return useMutation({
        mutationKey: ['blenderWrite'],
        onMutate: async (variables: PostCreateCombinationType) => {
            console.log('variables', variables);
            if (combinationBorderId === undefined) {
                throw new Error('combinationBorderId is undefined');
            }
            return patchEditCombination({ combinationBorderId, variables })
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
export default useEditCombinationMutate;