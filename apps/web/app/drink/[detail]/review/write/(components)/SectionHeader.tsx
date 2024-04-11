import Image from 'next/image';
import React from 'react';
import classes from './SectionHeader.module.scss';

interface SectionHeaderProps {
  title: string;
  dot?: boolean;
}

const SectionHeader = ({ title, dot = true }: SectionHeaderProps) => {
  return (
    <div className={classes['header-wrapper']}>
      {dot && <Image src={'/dot.svg'} alt='dot' width={16} height={16} />}
      <h3>{title}</h3>
    </div>
  );
};

export default SectionHeader;
