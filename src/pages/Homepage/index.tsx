import { useEffect, useRef, useState } from 'react';

import background from '../../assets/titleScreen/background.png';
import CanvasContext from '../../hooks/canvas';

const Homepage: React.FC = ({ children }) => {
 // let language: string;
 // const browserLanguage = navigator.language;
 // if (browserLanguage.indexOf('-') > 0) {
 //  language = browserLanguage.split('-')[1];
 // } else {
 //  language = browserLanguage;
 // }

 const canvasRef = useRef(null);
 const [ctx, setCtx] = useState<HTMLCanvasElement | null>(null);

 useEffect(() => {
  // @ts-ignore
  setCtx(canvasRef.current.getContext('2d'));
  ctx.drawImage(background, 0, 0);
 }, [ctx, setCtx]);

 return (
  <CanvasContext.Provider value={ctx}>
   <canvas ref={canvasRef} width={1000} height={800} />
   <h1>adasds</h1>
  </CanvasContext.Provider>
 );
};

export default Homepage;
