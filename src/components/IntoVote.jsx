import { useState, useEffect } from 'react';

import apiService from '../services/api';

export function IntoVote() {
  const [loading, setLoading] = useState(false);
  const [schoolName, setSchoolName] = useState('');

  //儲存購買人基本資訊
  const [name, setName] = useState('');
  const [Class, setClass] = useState('');
  const [number, setNumber] = useState('');
  const [sticker, setSticker] = useState('0002');
  const [message, setMessage] = useState('');
  const [boxStates, setBoxStates] = useState(false);
  const currentUrl = window.location.href;
  const urlParams = new URL(currentUrl);
  const VoteID = urlParams.searchParams.get('school');
  const schoolNameFromUrl = urlParams.searchParams.get('name');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        school_id: parseInt(VoteID),
        class: Class,
        number: number,
        real_name: name,
        need_sticker: sticker === '0001',
      };

      const token = await apiService.createPersonalOrder(orderData);
      localStorage.setItem('orderToken', token);
      window.location.href = '/last-step';
    } catch (error) {
      setMessage(error.message);
      setBoxStates(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = '高校特約聯盟會員購買';
    if (schoolNameFromUrl) {
      setSchoolName(decodeURIComponent(schoolNameFromUrl));
    }
  }, [schoolNameFromUrl]);

  const closebox = () => {
    setMessage('');
    setBoxStates(false);
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
          <h1>開始進行購買</h1>
          <p className="voteCode_Text">您選擇的學校：{schoolName}</p>
          <form onSubmit={handleSubmit} className="loginform">
            <label htmlFor="name">姓名</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="請在此輸入您的姓名"
              required
            />
            <label htmlFor="class">班級</label>
            <input
              id="class"
              type="text"
              value={Class}
              onChange={(e) => setClass(e.target.value)}
              placeholder="請在此輸入您的班級"
              required
            />
            <label>座號</label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="請在此輸入您的座號"
              required
              maxLength="6"
            />
            <label>是否需要貼紙</label>
            <select
              className="select-input"
              value={sticker}
              onChange={(e) => {
                setSticker(e.target.value);
              }}
            >
              <option value="0002">不需要</option>
              <option value="0001">需要</option>
            </select>
            <button type="submit" disabled={loading}>
              {loading ? <div className="loader"></div> : '繼續'}
            </button>
            <a className="fpbtn" href="/get-code">
              返回
            </a>
          </form>
          <p className="copyright">
            Copyright © 2024 UKHSC 高校特約聯盟 保留一切權利。
          </p>
        </div>
      </section>
    </>
  );
}
