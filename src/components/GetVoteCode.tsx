import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { School, PartnerPlan } from '../types';
import { useSchoolContext } from '../Index';

export function GetVoteCode() {
  const [message, setMessage] = useState('');
  const [boxStates, setBoxStates] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const navigate = useNavigate();
  const { selectedSchool, setSelectedSchool } = useSchoolContext();

  useEffect(() => {
    document.title = '高校特約聯盟會員購買';
    if (!selectedSchool) {
      navigate('/');
    }

    const loadSchools = async () => {
      try {
        let schoolsData = await apiService.getPartnerSchools();
        schoolsData = schoolsData.filter(
          (school) =>
            school.plan === PartnerPlan.Personal ||
            school.plan === PartnerPlan.Combined
        );
        setSchools(schoolsData);
      } catch (_) {
        setMessage('無法載入合作學校列表，請再試一次。');
        setBoxStates(true);
      }
    };
    loadSchools();

    const all_btn = document.querySelectorAll('.option-btn');
    all_btn.forEach((btn) => {
      btn.classList.remove('active');
    });
    if (selectedSchool) {
      const btn = document.getElementById(selectedSchool.id.toString());
      btn!.classList.add('active');
    }
  }, [selectedSchool, navigate]);

  const closeBox = () => {
    setMessage('');
    setBoxStates(false);
    navigate('/');
  };

  const Messagebox = () => (
    <div className="box-background">
      <div className="m-contentbox">
        <h3 className="m-title">系統通知</h3>
        <p className="m-message">{message}</p>
        <button onClick={closeBox} id="closebtn">
          關閉
        </button>
      </div>
    </div>
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    navigate('/entrance');
  };

  return (
    <>
      {boxStates && <Messagebox />}
      <div className="contentbox">
        <h1 className="que-title">首先，請選擇您就讀的學校</h1>
        {selectedSchool?.plan === PartnerPlan.Combined && (
          <p className="que-description">
            <strong>已繳納</strong>
            {selectedSchool.short_name}
            學生會會費者 ，可免費獲得高校特約會員資格，
            <strong>不需填寫本表單購買</strong>。
            {selectedSchool.short_name === '仁武高中' && (
              <>
                <br />
                但倘若您為<strong>高二高三有繳納會費者</strong>
                ，請
                <strong>
                  <a href="https://tally.so/r/wAW4by">點我提供證明</a>
                </strong>
                以兌換會員資格
              </>
            )}
          </p>
        )}
        <form onSubmit={handleSubmit} className="form-box">
          <div className="select-box">
            {schools.map((school) => (
              <button
                key={school.id}
                id={school.id.toString()}
                onClick={(_) => setSelectedSchool(school)}
                type="button"
                className="option-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M226.53,56.41l-96-32a8,8,0,0,0-5.06,0l-96,32A8,8,0,0,0,24,64v80a8,8,0,0,0,16,0V75.1L73.59,86.29a64,64,0,0,0,20.65,88.05c-18,7.06-33.56,19.83-44.94,37.29a8,8,0,1,0,13.4,8.74C77.77,197.25,101.57,184,128,184s50.23,13.25,65.3,36.37a8,8,0,0,0,13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64,64,0,0,0,20.65-88l44.12-14.7a8,8,0,0,0,0-15.18ZM176,120A48,48,0,1,1,89.35,91.55l36.12,12a8,8,0,0,0,5.06,0l36.12-12A47.89,47.89,0,0,1,176,120ZM128,87.57,57.3,64,128,40.43,198.7,64Z"></path>
                </svg>
                {school.short_name}
              </button>
            ))}
          </div>
          <div className="next-btn-box">
            <div>
              <button type="submit" className="next-step-btn">
                下一步
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default GetVoteCode;
