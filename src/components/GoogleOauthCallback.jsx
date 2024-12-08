import { useState, useEffect } from 'react';

import apiService from '../services/api';

export function GoogleOAuthCallback() {
  const [status, setStatus] = useState('處理中...');
  const authCode = new URLSearchParams(window.location.search).get('code');
  const [message, setMessage] = useState('');
  const [boxStates, setBoxStates] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
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
        setStatus('Google 帳號綁定成功！');
        setTimeout(() => {
          window.location.href = '/get-code';
        }, 2000);
      } catch (error) {
        setMessage(`綁定失敗：${error.message}`);
        setBoxStates(true);
      }
    };

    handleCallback();
  }, [authCode]);

  const closebox = () => {
    setMessage('');
    setBoxStates(false);
    window.location.href = '/get-code';
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
            <p>{status}</p>
          </div>
          <p className="copyright">
            Copyright © 2024 UKHSC 高校特約聯盟 保留一切權利。
          </p>
        </div>
      </section>
    </>
  );
}
