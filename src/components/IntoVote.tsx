import { useState, useEffect, FormEvent } from 'react';
import apiService from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useSchoolContext } from '../Index';

export function IntoVote() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { selectedSchool, setSelectedSchool } = useSchoolContext();

  //儲存購買人基本資訊
  const [name, setName] = useState('');
  const [Class, setClass] = useState('');
  const [number, setNumber] = useState('');
  const [sticker, setSticker] = useState('0002');
  const [message, setMessage] = useState('');
  const [boxStates, setBoxStates] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedSchool) {
      throw new Error('selectedSchool must be defined');
    }

    try {
      const orderData = {
        school_id: selectedSchool.id,
        class: Class,
        number: number,
        real_name: name,
        need_sticker: sticker === '0001',
      };

      const token = await apiService.createPersonalOrder(orderData);
      localStorage.setItem('orderer_token', token);
      navigate('/last-step');
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
        setBoxStates(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = '高校特約聯盟會員購買';
    if (!selectedSchool) {
      navigate('/');
    }
  }, [navigate, selectedSchool]);

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
      <div className="contentbox">
        <h1 className="que-title">開始進行購買</h1>
        <p className="que-description">
          請務必填寫正確的資訊，以利學生會作業。
        </p>
        <form onSubmit={handleSubmit} className="loginform">
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
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="請在此輸入您的座號"
            required
            maxLength={6}
          />
          <label htmlFor="name">姓名</label>
          <input
            id="name"
            type="text"
            value={name}
            inputMode="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="請在此輸入您的姓名"
            required
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
          <div className="next-btn-box">
            <div>
              <a href="/" className="back-lastpage-btn">
                返回
              </a>
              <button
                type="submit"
                disabled={loading}
                className="next-step-btn"
              >
                {loading ? <div className="loader"></div> : '下一步'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
