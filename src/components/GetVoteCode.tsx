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
        <h1 className="que-title">你好！</h1>
        <p className="que-description">
          聯盟已更改政策，只要您是以下合作學校的在學學生，
          <strong>
            皆可免費獲得
          </strong>高雄高校特約聯盟的會員資格。
        </p>
        <div className="line"></div>
        <p className="que-description">本屆合作學校（持續更新中）：</p>
        <ul className="que-description">
          {schools.map((school) => (
            <li key={school.id}>{school.full_name}</li>
          ))}
        </ul>
        <p className="que-description">
          若您為以上學校的在學學生，請關注貴校學生會及聯盟的最新公告，以便取得特約商店相關訊息。
          <br />
          如果您曾透過個人購買管道購買會員，屆時使用 App
          時可沿用先前用於訂購的帳號，亦可另外綁定新帳號。
        </p>
        <h1 className="que-title">感謝你對本聯盟的支持！</h1>
      </div>
    </>
  );
}

export default GetVoteCode;
