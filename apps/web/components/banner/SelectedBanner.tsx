'use client';

import { Flex, useStyles } from '@mantine/core';
import Image from 'next/image';
import classes from './SelectedBanner.module.css';
import { motion } from 'framer-motion';
import React from 'react';

type PourAnimationPropsType = { children: React.ReactNode };

const PourAnimation = ({ children }: PourAnimationPropsType) => {
  return (
    <Flex
      className={classes['banner-image-inner-section']}
      style={{ position: 'relative' }}
      w={400}
      h={400}
    >
      <motion.div
        initial={{ rotate: 0, y: 0 }}
        animate={{
          rotate: -45,
          y: 50,
          x: 250,
          scale: 1.6,
        }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{
          originX: 0.5,
          originY: 1,
        }}
      >
        <motion.div
          animate={{
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            // type: 'spring',
            // stiffness: 1000,
            // mass: 0.5,
            // damping: 300,
            delay: 1.5,
            duration: 0.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </Flex>
  );
};

const SelectedBanner = () => {
  return (
    <Flex w={1224} h={'100%'} bg={'lime'}>
      <Flex
        className={classes['banner-image-section']}
        // bg={'teal'}
        w={520}
        h={520}
        justify={'flex-end'}
        align={'flex-end'}
      >
        <PourAnimation>
          <Image src={'/beer.svg'} alt={'beer'} width={400} height={400} />
        </PourAnimation>
      </Flex>
      <Flex>Banner Section</Flex>
    </Flex>
  );
};
export default SelectedBanner;
