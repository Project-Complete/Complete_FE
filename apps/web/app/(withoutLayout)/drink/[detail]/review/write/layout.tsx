import DrinkWriteHeader from './(components)/Header';

const DrinkWriteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DrinkWriteHeader />
      {children}
    </>
  );
};

export default DrinkWriteLayout;
