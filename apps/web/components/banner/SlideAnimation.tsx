import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import { Flex } from "@mantine/core";

import './SliderAnimation.scss';

const sliderVariants = {
    incoming: (direction: number) => ({
        x: direction > 0 ? "200%" : "-1000%",
        scale: direction > 0 ? 1.2 : 3,
        opacity: 0,
        y: 0,
    }),
    active: { x: 0, scale: 0.8, opacity: 1, y: 0, },
    exit: (direction: number) => ({
        x: direction > 0 ? "-1000%" : "200%",
        scale: 1,
        opacity: direction > 0 ? 0.2 : 0.5,
        y: 0,
    }),
};

const sliderTransition = {
    duration: 1,
    ease: [0.56, 0.03, 0.12, 1.04],
};

const SlideAnimation = ({ drinks }: { drinks: DrinkOfBanner[] }) => {
    const [[imageCount, direction], setImageCount] = useState([0, 0]);

    const activeImageIndex: number = wrap(0, drinks.length, imageCount);

    const swipeToImage = (swipeDirection: number) => {
        setImageCount([imageCount + swipeDirection, swipeDirection]);
    };

    const dragEndHandler = (dragInfo: PanInfo) => {
        const draggedDistance = dragInfo.offset.x;
        const swipeThreshold = 50;
        if (draggedDistance > swipeThreshold) {
            swipeToImage(-1);
        } else if (draggedDistance < -swipeThreshold) {
            swipeToImage(1);
        }
    };
    return (
        <div className="slider-container">
            <div className="slider">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={imageCount}
                        style={{
                            backgroundImage: `url(${drinks?.[activeImageIndex]?.image_url ?? "/beer.png"})`,
                        }}
                        custom={direction}
                        variants={sliderVariants}
                        initial="incoming"
                        animate="active"
                        exit="exit"
                        transition={sliderTransition}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
                        className="image"
                    />
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SlideAnimation;
