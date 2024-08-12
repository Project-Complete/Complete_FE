import { blenderWriteFormInitialValuesTypes } from "@/app/(withoutLayout)/drink/blender/(components)/blenderWriteFormContext";
import { api } from "@/utils/api";
import { MutateOptions, useMutation, useQueryClient } from "@tanstack/react-query";

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
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['blenderWrite'],
        mutationFn: async (variables: PostCreateCombinationType) => {
            if (combinationBorderId === undefined) {
                throw new Error('combinationBorderId is undefined');
            }

            console.log('variables', variables);
            return await patchEditCombination({ combinationBorderId, variables })
        },
        onError: (error, variables, context) => {
            console.log('error', error)
            alert(error);

        },
        onSuccess: (data, variables, context) => {
            console.log('data', data)
            formReset && formReset();
            queryClient.invalidateQueries({ queryKey: ['blender', combinationBorderId] });
            history.back();
        }
    });
}
export default useEditCombinationMutate;