import { useState } from 'react';
import './Counter.css';
import ReactLogo from './assets/react.svg';
import cat from './assets/cat.jpg';
import ViteLogo from './assets/vite.svg';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <ViteLogo />
        </a>
        <a href='https://react.dev' target='_blank'>
          {/* <img src={cat.src} alt={'????'} /> */}
        </a>
        <a href='https://react.dev' target='_blank'>
          {/* <img src={cat} className='logo react' alt='React logo' /> */}
          <ReactLogo />
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
