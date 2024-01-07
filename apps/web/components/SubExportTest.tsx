import React from 'react';

const SubExportTest = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>SubExportTest</div>
      {children}
    </div>
  );
};

SubExportTest.test = () => {
  return <p>This is Test component</p>;
};

export const tester = () => {
  return <p>This is Tester component</p>;
};

export default SubExportTest;
