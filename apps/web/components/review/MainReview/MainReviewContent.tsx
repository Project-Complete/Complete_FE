'use client'
import { Flex, Grid } from "@mantine/core";
import Image from "next/image";
import bookmark from "@/assets/bookmark.svg";
import heart from "@/assets/heart.svg";
import emptyStar from "@/assets/emptyStar.svg";
import StarScore from "@/components/animation/StarScore";

const MainReviewContent = () => {
    return <Flex w={'100%'}>
        <Grid w={"100%"} >
            {new Array(10).fill(null).map((v, index) => {
                return <Grid.Col key={index} span={{ base: 6, md: 4, lg: 3 }} style={{ display: "flex", justifyContent: "center" }}>
                    <Flex direction={'column'} w={{ base: '100%', sm: 288 }} justify={'center'} align={'center'} style={{ border: "1px solid black" }}>
                        <Flex w={{ base: '100%', sm: 288 }} h={{ base: '100%', sm: 288 }} style={{ border: "1px solid black" }}>{`image ${index + 1}`}</Flex>
                        <Flex w={'100%'} direction={'column'}>
                            <Flex w={'100%'} justify={'space-between'} >
                                <Flex>제조사</Flex>
                                <Flex gap={16}>
                                    <Image src={bookmark} width={32} height={32} alt={"bookmark"} />
                                    <Image src={heart} width={32} height={32} alt={'heart'} />
                                </Flex>
                            </Flex>
                            <Flex>주종명</Flex>
                            <StarScore score={4.5} />
                        </Flex>
                    </Flex>
                </Grid.Col>
            })}

        </Grid>
    </Flex>
}
export default MainReviewContent;