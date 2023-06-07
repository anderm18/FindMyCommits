import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import NavBar from './components/NavBar';
import './index.css'
import reportWebVitals from './reportWebVitals';
import HomeCard from './components/HomeCard';
import Commits from './components/CommitControl';
import CommitResult from './components/CommitResult';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function Homepage() {
  return(
    <>
      <HomeCard/>
    </>
  );
}

function CommitPage() {

  const [state, setState] = useState(0);
  return(
    <>
      <Commits setFunc={setState}/>
      <CommitResult state={state}/>
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
