import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { IntoVote } from './components/IntoVote';
import { GetVoteCode } from './components/GetVoteCode';
import { GoogleOAuthCallback } from './components/GoogleOauthCallback';
import { Last_Step } from './components/Last_Step';

function Home() {
  useEffect(() => {
    window.location.href = '/get-code';
  });
}

function Index() {
  return (
    <Router>
      <Routes baseName="/">
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
  );
}
export default Index;
