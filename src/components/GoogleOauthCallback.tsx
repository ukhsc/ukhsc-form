import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import apiService from '../services/api';

export function GoogleOAuthCallback() {
  const [status, setStatus] = useState(true);
  const [message, setMessage] = useState('');
  const [boxStates, setBoxStates] = useState(false);

  const hasExecutedRef = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      if (hasExecutedRef.current) return;
      hasExecutedRef.current = true;

      const authCode = new URLSearchParams(window.location.search).get('code');
      console.log('authCode:', authCode);

      if (!authCode) {
        setMessage('未收到授權碼');
        setBoxStates(true);
        return;
      }

      try {
        await apiService.linkGoogleAccount(
          authCode,
          window.location.origin + '/oauth/google/callback'
        );
        setStatus(false);
        // setTimeout(() => {
        //   window.location.href = '/get-code';
        // }, 2000);
      } catch (error) {
        // TODO: 需要更親近使用者的用語
        setMessage(`綁定失敗：${error.message}`);
        console.error(error);
        setBoxStates(true);
      }
    };

    handleCallback();
  }, []);

  const navigate = useNavigate();
  const closebox = () => {
    setMessage('');
    setBoxStates(false);
    navigate('/oauth/google/callback');
  };

  const Messagebox = () => (
    <div className="box-background">
      <div className="m-contentbox">
        <h3 className="m-title">系統通知</h3>
        <p className="m-message">{message}</p>
        <button onClick={closebox} id="closebtn">
          關閉
        </button>
      </div>
    </div>
  );

  return (
    <>
      {boxStates && <Messagebox />}
      <section>
        <div className="contentbox">
          <h1>Google 帳號綁定</h1>
          <div className="loginform">
            <p>{status ? <div className="loader"></div> : '綁定成功！'}</p>
          </div>
          <p className="copyright">
            Copyright © 2024 UKHSC 高雄高校特約聯盟 保留一切權利。
          </p>
        </div>
      </section>
    </>
  );
}
