import Image from 'next/image';
import Link from 'next/link';
const MainLogo = () => {
  return (
    <Link href={`/`}>
      {/* <Image
        src={'./logo/logo.svg'}
        width={164}
        height={52}
        alt={'logo'}
      ></Image> */}
    </Link>
  );
};
export default MainLogo;
