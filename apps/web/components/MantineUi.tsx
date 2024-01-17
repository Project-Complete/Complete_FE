'use client';
import { Counter } from '@team-complete/complete-ui';
import IOCComponent from './IOCComponent';
import SubExportTest from './SubExportTest';
const MantineUi = () => {
  return (
    <>
      <Counter></Counter>
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
