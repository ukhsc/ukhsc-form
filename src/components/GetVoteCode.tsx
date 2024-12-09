import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { School, PartnerPlan } from '../types';
import { SchoolContext } from '../Index';

export function GetVoteCode() {
  const [message, setMessage] = useState('');
  const [boxStates, setBoxStates] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const navigate = useNavigate();
  const { schoolId, schoolName, setSchoolName, setSchoolId } = useContext(SchoolContext);

  useEffect(() => {
    document.title = '高校特約聯盟會員購買';
    if (!schoolId) {
      navigate('/get-code');
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
      } catch (error) {
        setMessage('無法載入合作學校列表，請再試一次。');
        setBoxStates(true);
      }
    };
    loadSchools();

    const all_btn = document.querySelectorAll('.option-btn')
    all_btn.forEach((btn) => {
      btn.classList.remove('active');
    })
    if (schoolId){
      const btn = document.getElementById(schoolId);
      btn.classList.add('active');
    }
  }, [schoolId]);

  const closebox = () => {
    setMessage('');
    setBoxStates(false);
    navigate('/get-code');
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
    const selectedSchool = schools.find(
      (school) => school.id === parseInt(schoolId)
    );
    setSchoolName(selectedSchool.short_name);
    setSchoolId(schoolId);
    console.log(schoolId);
    navigate('/entrance');
  };

  return (
    <>
      {boxStates && <Messagebox />}
        <div className="contentbox">
          <h1 className='que-title'>首先，先選擇你就讀的學校</h1>
          <form onSubmit={handleSubmit} className="form-box">
            <div className='select-box'>
              {schools.map((school) => (
                  <button key={school.id} id={school.id} onClick={(e) => setSchoolId(school.id)} type='button'
                          className='option-btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                      <path
                          d="M226.53,56.41l-96-32a8,8,0,0,0-5.06,0l-96,32A8,8,0,0,0,24,64v80a8,8,0,0,0,16,0V75.1L73.59,86.29a64,64,0,0,0,20.65,88.05c-18,7.06-33.56,19.83-44.94,37.29a8,8,0,1,0,13.4,8.74C77.77,197.25,101.57,184,128,184s50.23,13.25,65.3,36.37a8,8,0,0,0,13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64,64,0,0,0,20.65-88l44.12-14.7a8,8,0,0,0,0-15.18ZM176,120A48,48,0,1,1,89.35,91.55l36.12,12a8,8,0,0,0,5.06,0l36.12-12A47.89,47.89,0,0,1,176,120ZM128,87.57,57.3,64,128,40.43,198.7,64Z"></path>
                    </svg>
                    {school.short_name}
                  </button>
              ))}
            </div>
            <div className='next-btn-box'>
              <div>
                <button type="submit" className='next-step-btn'>下一步</button>
              </div>
            </div>
          </form>
        </div>
    </>
  );
}

export default GetVoteCode;
