import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import NavBar from './components/NavBar';
import './index.css'
import reportWebVitals from './reportWebVitals';
import HomeCard from './components/HomeCard';
import Commits from './components/CommitControl';
import CommitResult from './components/CommitResult';

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function Homepage(): JSX.Element {
  return(
    <>
      <HomeCard/>
    </>
  );
}

function CommitPage(): JSX.Element {

  const [state, setState]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(0);
  const [responseRef, setResponseRef]: [JSON, React.Dispatch<React.SetStateAction<JSON>>] = useState(JSON);

  return(
    <>
      <Commits setFunc={setState} setResponseRef={setResponseRef} state={state}/>
      <CommitResult state={state} responseRef={responseRef}/>
    </>
  );
}

root.render(
  <React.StrictMode>
    <div style={{backgroundColor: '#0E0B16', minHeight: '100vh', minWidth: '100vw'}}>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="about"/>
          <Route path="commits" element={<CommitPage/>}/>
          <Route path="rcos"/>
        </Routes>
      </BrowserRouter>
    </div>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
