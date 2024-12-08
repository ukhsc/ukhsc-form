import { useState, useEffect } from 'react';
import apiService from '../services/api';

export function GetVoteCode() {
  const [loading, setLoading] = useState(false);
  const [schoolId, setSchoolId] = useState('');
  const [message, setMessage] = useState('');
  const [boxStates, setBoxStates] = useState(false);
  const [schools, setSchools] = useState([]);

  const urlParams = new URL(window.location.href);
  const voteError = urlParams.searchParams.get('voteError');
  const error_message = urlParams.searchParams.get('message');

  useEffect(() => {
    document.title = '高校特約聯盟會員購買';

    if (voteError === 'true') {
      setMessage(error_message);
      setBoxStates(true);
    }

    const loadSchools = async () => {
      try {
        const schoolsData = await apiService.getPartnerSchools();
        setSchools(schoolsData);
      } catch (error) {
        setMessage('載入學校列表失敗');
        setBoxStates(true);
      }
    };

    loadSchools();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // 找到選中的學校資訊
    const selectedSchool = schools.find(
      (school) => school.id === parseInt(schoolId)
    );

    setTimeout(() => {
      // 將完整的學校資訊傳遞過去
      window.location.href = `/entrance?school=${schoolId}&name=${encodeURIComponent(selectedSchool.short_name)}`;
    }, 1000);
  };

  return (
    <>
      {boxStates && <Messagebox />}
      <section>
        <div className="contentbox">
          <h1>高校特約聯盟會員購買</h1>
          <form onSubmit={handleSubmit} className="loginform">
            <label htmlFor="code">選擇學校</label>
            <select
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              className="select-input"
            >
              <option value="" disabled>
                點擊這裡選擇學校
              </option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.short_name}
                </option>
              ))}
            </select>
            <button type="submit" disabled={loading}>
              {loading ? <div className="loader"></div> : '下一步'}
            </button>
          </form>
          <p className="copyright">
            Copyright © 2024 UKHSC 高校特約聯盟 保留一切權利。
          </p>
        </div>
      </section>
    </>
  );
}

export default GetVoteCode;
