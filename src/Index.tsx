import React, { useEffect, createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import { IntoVote } from './components/IntoVote';
import { GetVoteCode } from './components/GetVoteCode';
import { GoogleOAuthCallback } from './components/GoogleOauthCallback';
import { Last_Step } from './components/Last_Step';

function Home() {
  useEffect(() => {
    window.location.href = '/get-code';
  });
}

export const SchoolContext = createContext();
function Index() {
  const [schoolId, setSchoolId] = useState('');
  const [schoolName, setSchoolName] = useState('');
  return (
    <SchoolContext.Provider
      value={{ schoolId, setSchoolId, schoolName, setSchoolName }}
    >
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
        </Routes>
      </Router>
    </SchoolContext.Provider>
  );
}
export default Index;
