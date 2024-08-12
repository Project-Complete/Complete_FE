'use client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { usePrefetchDrinkDetail } from '@/hooks/queries/useDrinkDetailQuery';
import { getQueryClient } from '@/utils/getQueryClient';
import { cookies } from 'next/headers';
import BlenderWrite from '../../(components)/BlenderWrite';
import { use, useEffect, useMemo, useState } from 'react';
import { blenderWriteFormInitialValuesTypes } from '../../(components)/blenderWriteFormContext';
import { useBlenderDetailQuery } from '@/hooks/queries/blenders/useBlenderDetailQuery';
import { randomId } from '@mantine/hooks';
import { convertURLtoFile } from '@/lib/convertUrlToFile';


export default function Page({ params }: { params: { combination_board_id: string } }) {
    const queryClient = getQueryClient();

    const { data } = useBlenderDetailQuery({
        detailId: parseInt(params.combination_board_id),
    });



    const [initialValues, setInitialValues] = useState<blenderWriteFormInitialValuesTypes | null>(null)


    useEffect(() => {
        if (data === undefined) return;
        (async () => {
            const newInitialValues: blenderWriteFormInitialValuesTypes = {
                file: null,
                title: '',
                description: '',
                content: '',
                combinations: [],
            }
            newInitialValues.file = await convertURLtoFile(data.combination_image_url);
            newInitialValues.title = data.title;
            newInitialValues.description = data.description;
            newInitialValues.content = data.content;
            newInitialValues.combinations = data.combinations.map((combination) => {
                return {
                    id: randomId(),
                    drink_id: combination.drink_id,
                    name: combination.name,
                    volume: combination.volume,
                    xcoordinate: combination.xcoordinate,
                    ycoordinate: combination.ycoordinate,
                }
            })
            setInitialValues(newInitialValues);
        })();
    }, [data])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {data && initialValues && <BlenderWrite
                initialValues={initialValues}
                combinationBoardId={params.combination_board_id}
                defaultImage={data?.combination_image_url}

            />}
        </HydrationBoundary>
    );
}
