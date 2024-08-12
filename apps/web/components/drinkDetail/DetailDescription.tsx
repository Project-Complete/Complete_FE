'use client';
import { Flex, Table, Text, Title, em } from '@mantine/core';
import Image from 'next/image';
import React, { Fragment } from 'react';
import classes from './DetailDescription.module.scss';
import { useMediaQuery } from '@mantine/hooks';

const DetailDescription = ({
  detailDescription,
  descriptionRef,
}: {
  detailDescription: DetailDescriptionDrink;
  descriptionRef: React.RefObject<HTMLHeadingElement> | null;
}) => {
  const isMobile = useMediaQuery(`(max-width:${em(768)})`);

  function chunkArray(arr: Package[], size: number): Package[][] {
    return arr.reduce((acc: Package[][], _, index: number) => {
      if (index % size === 0) {
        acc.push(arr.slice(index, index + size));
      }
      return acc;
    }, []);
  }
  const detailDescriptionArr = chunkArray(
    detailDescription.packages,
    detailDescription.packages.length,
  );
  return (
    <Flex
      w={'100%'}
      direction={'column'}
      py={'72px'}
      px={isMobile ? '1.5rem' : ''}
    >
      <Title
        component={'h1'}
        size={isMobile ? '1.125rem' : 40}
        fw={800}
        lh={'50px'}
        mb={'25px'}
        ref={descriptionRef}
      >
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
      <Table>
        <Table.Tbody w={'100%'}>
          <Table.Tr></Table.Tr>
          {isMobile && (
            <>
              <Table.Tr key={0}>
                <Table.Td
                  className={classes['detail-description-packages-title']}
                  rowSpan={
                    detailDescriptionArr[0] !== undefined
                      ? detailDescriptionArr[0].length
                      : detailDescriptionArr.length
                  }
                >
                  용량 및 패키지
                </Table.Td>
                <Table.Td key={0}>
                  <div className={classes['detail-description-packages']}>
                    <div
                      className={classes['detail-description-packages-type']}
                    >
                      {detailDescriptionArr[0] !== undefined &&
                        detailDescriptionArr[0][0] !== undefined &&
                        detailDescriptionArr[0][0].type}
                    </div>
                    {!isMobile && (
                      <Image
                        src={'/bottle.svg'}
                        alt='package'
                        width={80}
                        height={80}
                        className={classes['detail-description-packages-image']}
                      />
                    )}
                    <div>
                      {detailDescriptionArr[0] !== undefined &&
                        detailDescriptionArr[0][0] !== undefined &&
                        detailDescriptionArr[0][0].volume}
                    </div>
                  </div>
                </Table.Td>
              </Table.Tr>
              {detailDescriptionArr.map((e, i) => {
                return (
                  <Fragment key={i}>
                    {e.map((elements, index) => (
                      <Fragment key={index}>
                        {index !== 0 && (
                          <Table.Tr key={index}>
                            <Table.Td key={index}>
                              <div
                                className={
                                  classes['detail-description-packages']
                                }
                              >
                                <div
                                  className={
                                    classes['detail-description-packages-type']
                                  }
                                >
                                  {elements.type}
                                </div>
                                {!isMobile && (
                                  <Image
                                    src={'/bottle.svg'}
                                    alt='package'
                                    width={80}
                                    height={80}
                                    className={
                                      classes[
                                        'detail-description-packages-image'
                                      ]
                                    }
                                  />
                                )}
                                <div>{elements.volume}</div>
                              </div>
                            </Table.Td>
                          </Table.Tr>
                        )}
                      </Fragment>
                    ))}
                  </Fragment>
                );
              })}
            </>
          )}
          {!isMobile &&
            detailDescriptionArr.map((e, i) => {
              return (
                <Table.Tr key={i}>
                  {i === 0 && (
                    <Table.Td
                      className={classes['detail-description-packages-title']}
                      rowSpan={detailDescriptionArr.length}
                    >
                      용량 및 패키지
                    </Table.Td>
                  )}
                  {e.map((elements, index) => (
                    <Table.Td key={index}>
                      <div className={classes['detail-description-packages']}>
                        <div
                          className={
                            classes['detail-description-packages-type']
                          }
                        >
                          {elements.type}
                        </div>
                        {!isMobile && (
                          <Image
                            src={'/bottle.svg'}
                            alt='package'
                            width={80}
                            height={80}
                            className={
                              classes['detail-description-packages-image']
                            }
                          />
                        )}
                        <div>{elements.volume}</div>
                      </div>
                    </Table.Td>
                  ))}
                </Table.Tr>
              );
            })}
          <Table.Tr>
            <Table.Td className={classes['detail-description-title']}>
              제조사
            </Table.Td>
            <Table.Td colSpan={2}>
              {detailDescription.manufacturer.manufacturer_name}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className={classes['detail-description-title']}>
              도수
            </Table.Td>
            <Table.Td colSpan={2}>{detailDescription.abv}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className={classes['detail-description-title']}>
              유형
            </Table.Td>
            <Table.Td colSpan={2}>{detailDescription.type.type}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td className={classes['detail-description-title']}>
              생산지역
            </Table.Td>
            <Table.Td colSpan={2}>
              {detailDescription.manufacturer.location}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td
              className={classes['detail-description-title']}
            ></Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Flex>
  );
};

export default DetailDescription;
