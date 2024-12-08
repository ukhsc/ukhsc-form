import { useEffect, useState } from 'react';

export function Last_Step() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [boxStates, setBoxStates] = useState(false);
  const orderToken = localStorage.getItem('orderToken');

  const handleGoogleLogin = () => {
    setLoading(true);
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
    const redirectUri = `${window.location.origin}/oauth/google/callback`;

    const params = {
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent',
    };

    const queryString = new URLSearchParams(params).toString();
    window.location.href = `${googleAuthUrl}?${queryString}`;
  };

  const Messagebox = () => (
    <div className="box-background">
      <div className="m-contentbox">
        <h3 className="m-title">系統通知</h3>
        <p className="m-message">{message}</p>
        <button onClick={() => setBoxStates(false)} id="closebtn">
          關閉
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!orderToken) {
      setMessage('請先完成購買程序');
      setBoxStates(true);
      setTimeout(() => {
        window.location.href = '/get-code';
      }, 2000);
    }
  }, []);

  return (
    <section>
      <div className="ls_firstBox">
        <h1>還差最後一步！</h1>
        <button className="connect_btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20px"
            height="20px"
            viewBox="0 0 30 30"
          >
            <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
          </svg>
          <p className="google_button_text">進行Google帳號綁定</p>
        </button>
      </div>
      <div></div>
    </section>
  );
}
