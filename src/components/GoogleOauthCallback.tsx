import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import apiService from '../services/api';

export function GoogleOAuthCallback() {
  const [status, _] = useState(true);
  const [message, setMessage] = useState('');
  const [boxStates, setBoxStates] = useState(false);
  const hasExecutedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      if (hasExecutedRef.current) return;
      hasExecutedRef.current = true;

      const authCode = new URLSearchParams(window.location.search).get('code');
      console.log('authCode:', authCode);

      if (!authCode) {
        setMessage('綁定失敗：無法取得 Google 帳號資訊，請再試一次。');
        setBoxStates(true);
        return;
      }

      try {
        await apiService.linkGoogleAccount(
          authCode,
          window.location.origin + '/oauth/google/callback'
        );
        localStorage.setItem('linked_federated_account', 'true');

        setTimeout(() => {
          navigate('/success');
        }, 2000);
      } catch (error) {
        // TODO: 需要更親近使用者的用法
        if (error instanceof Error) {
          setMessage(`綁定失敗：\n${error.message}`);
          console.error(error);
          setBoxStates(true);
        }
      }
    };

    handleCallback();
  }, [navigate]);

  const closebox = () => {
    setMessage('');
    setBoxStates(false);
    navigate('/last-step');
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
        </div>
      </section>
    </>
  );
}
