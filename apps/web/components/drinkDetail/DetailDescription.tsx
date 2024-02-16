'use client';
import { DetailDescriptionDrink } from '@/types/drinks';
import { Flex, Table, Text, Title } from '@mantine/core';
import Image from 'next/image';
import React, { useMemo } from 'react';

const DetailDescription = ({
  detailDescription,
}: {
  detailDescription: DetailDescriptionDrink;
}) => {
  console.log(detailDescription);

  return (
    <Flex w={'100%'} direction={'column'} py={'72px'}>
      <Title size={40} fw={800} lh={'50px'} mb={'25px'}>
        {detailDescription.title}
      </Title>
      <Text mb={'48px'}>
        {detailDescription.description.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </Text>
    </Flex>
  );
};

export default DetailDescription;
