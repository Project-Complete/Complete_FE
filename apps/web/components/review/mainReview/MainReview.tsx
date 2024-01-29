import { Flex, Button, UnstyledButton } from "@mantine/core";
import MainReviewHeader from "./MainReviewHeader";
import MainReviewContent from "./MainReviewContent";
import MainReviewFooter from "./MainReviewFooter";

const MainReview = () => {
    return <Flex w={"100%"} maw={1224} direction={'column'}>
        <MainReviewHeader />
        <MainReviewContent />
        <MainReviewFooter />
    </ Flex>
}
export default MainReview;