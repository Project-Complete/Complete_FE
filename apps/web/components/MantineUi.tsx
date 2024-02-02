'use client';

import IOCComponent from './IOCComponent';
import SubExportTest from './SubExportTest';
const MantineUi = () => {
  return (
    <>
      <IOCComponent>
        <div>aaa</div>
        <div>bbb</div>
        <div>ccc</div>
        <div>ddd</div>
      </IOCComponent>
      <SubExportTest>
        <SubExportTest.test></SubExportTest.test>
      </SubExportTest>
    </>
  );
};

export default MantineUi;
