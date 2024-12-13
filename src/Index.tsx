import React, { useEffect, createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { IntoVote } from './components/IntoVote';
import { GetVoteCode } from './components/GetVoteCode';
import { GoogleOAuthCallback } from './components/GoogleOauthCallback';
import { Last_Step } from './components/Last_Step';
import { SuccessPage } from './components/SuccessPage';
import { useNavigate } from 'react-router-dom';

import hamburger from './assets/hamburger.svg';
import { School } from './types';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('orderer_token');
    if (loggedIn) {
      navigate('/success');
    } else {
      navigate('/get-code');
    }
  }, [navigate]);

  return null;
}

function Footer() {
  const setBodyHeight = () => {
    const rootDiv = document.getElementById('root');
    if (rootDiv) rootDiv.style.height = `${window.innerHeight}px`;
  };

  useEffect(() => {
    window.addEventListener('resize', setBodyHeight);
    setBodyHeight();
  }, []);

  return (
    <div className="footer-box">
      <p>Copyright © 2024 UKHSC 高校特約聯盟 保留一切權利。</p>
      <a className="ig-link-btn" href="https://instagram.com/ukhsc_2024">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
        </svg>
      </a>
    </div>
  );
}

function Header() {
  return (
    <header className="page-header">
      <h3 className="header-title">高校特約聯盟個人會員購買</h3>
    </header>
  );
}

interface SchoolContextType {
  selectedSchool: School | null;
  setSelectedSchool: (school: School | null) => void;
}
const SchoolContext = createContext<SchoolContextType | null>(null);
export const useSchoolContext = () => {
  const context = React.useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchoolContext must be used within a SchoolProvider');
  }
  return context;
};

function Index() {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  return (
    <SchoolContext.Provider value={{ selectedSchool, setSelectedSchool }}>
      <Header />
      <section>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/entrance" element={<IntoVote />}></Route>
            <Route path="/get-code" element={<GetVoteCode />}></Route>
            <Route
              path="/oauth/google/callback"
              element={<GoogleOAuthCallback />}
            ></Route>
            <Route path="/last-step" element={<Last_Step />}></Route>
            <Route path="/success" element={<SuccessPage />}></Route>
          </Routes>
        </Router>
        <img src={hamburger} alt="hamburger" className="hamburger"></img>
      </section>
      <Footer />
    </SchoolContext.Provider>
  );
}
export default Index;
