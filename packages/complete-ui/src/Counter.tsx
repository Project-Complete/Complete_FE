import { useState } from 'react';
import './Counter.css';
import ReactLogo from './assets/react.svg';
import ImageWrapper from './ImageWrapper';
// import Cat from './assets/cat.jpg';
// import ViteLogo from './assets/vite.svg';

function Counter() {
  const [count, setCount] = useState(0);
  // console.log('ReactLogo', ReactLogo);
  // console.log('ReactLogo', ReactLogo);
  // console.log('Cat', Cat);
  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          {/* <ViteLogo /> */}
        </a>
        <a href='https://react.dev' target='_blank'>
          {/* <img src={Cat} alt={'????'} /> */}
          {/* <Cat /> */}
        </a>
        <a href='https://react.dev' target='_blank'>
          {/* <img src={cat} className='logo react' alt='React logo' /> */}
          {/* <ReactLogo /> */}
          {/* {<img src={ReactLogo.src}></img>} */}
          {/* {typeof ReactLogo === 'string' ? (
            <img src={ReactLogo}></img>
          ) : (
            <ReactLogo></ReactLogo>
          )} */}
          <ImageWrapper image={ReactLogo} />
          {/* <ReactLogo /> */}
          {/* <ReactLogo /> */}
          asdfasdfasdfasdf
          <div>asdfasdfasdfasd524541561651635as</div>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Counter;
