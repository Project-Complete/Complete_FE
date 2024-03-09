import {
  ModalContent,
  ModalRoot,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@team-complete/complete-ui';
import classes from './ReviewCard.module.scss';
import Image from 'next/image';

const ReviewImageModal = ({
  modalOpen,
  modalHandler,
  imageUrl,
  isMobile,
}: {
  modalOpen: boolean;
  modalHandler: () => void;
  imageUrl: string;
  isMobile: boolean | undefined;
}) => {
  return (
    <>
      <ModalRoot
        opened={modalOpen}
        size={'50%'}
        onClose={modalHandler}
        fullScreen={isMobile}
        centered
      >
        <ModalOverlay />
        <ModalContent className={classes['review-detail-image-modal']}>
          <ModalHeader className={classes['review-image-header']}>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody className={classes['review-image-body']}>
            <Image
              src={
                imageUrl !== '' && imageUrl !== 'string'
                  ? imageUrl
                  : 'https://picsum.photos/392/288.webp'
              }
              alt='리뷰 이미지'
              fill
              // width={100}
              // height={100}
              sizes='width:100%; height:auto;'
              objectFit='contain'
            />
          </ModalBody>
        </ModalContent>
      </ModalRoot>
    </>
  );
};

export default ReviewImageModal;
