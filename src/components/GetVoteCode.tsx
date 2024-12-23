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
        <h1>你好！</h1>
        <p>目前暫不開放學生填寫此表單，聯盟已經更改政策，現在您不需要購買也可享有會員資格，且不需要付費。</p>
        <div className='line'></div>
        <p>若要成為會員，你必須是以下學校的學生：</p>
        <ul>
          {schools.map((school) => (
            <li key={school.id}>{school.short_name}</li>
          ))}
        </ul>
        <p>若你為以上學校的學生，現在只需要等待學生會通知您相關特約資訊。</p>
        <h3>感謝你對本聯盟的支持！</h3>
      </div>
    </>
  );
}

export default GetVoteCode;
