import { useState, useEffect } from 'react';

import apiService from '../services/api';

import { useNavigate } from 'react-router-dom';
import Img from '../assets/order_photo.png';

export function SuccessPage() {
  const [name, setName] = useState<string>();
  const [class_name, setClass] = useState<string>();
  const [number, setNumber] = useState<string>();
  const [schoolName, setSchoolName] = useState<string>();
  const [needSticker, setNeedSticker] = useState<boolean>();
  const [schoolId, setSchoolId] = useState<number>();
  const [createdTime, setCreatedTime] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '訂購成功！';
    apiService
      .getOrderInfo()
      .then((data) => {
        setName(data.real_name);
        setClass(data.class);
        setNumber(data.number);
        setSchoolId(data.school_id);
        setNeedSticker(data.need_sticker);
        console.log(data.created_at);
        const time = new Date(Date.parse(data.created_at));
        setCreatedTime(time.toLocaleString('zh-TW'));
      })
      .catch((error) => {
        if (
          error instanceof Error &&
          (error.message === 'Unauthorized (Invalid token)' ||
            error.message === 'Order not found')
        ) {
          localStorage.removeItem('orderer_token');
          navigate('/');
        }
      });

    apiService.getPartnerSchools().then((data) => {
      const selectedSchool = data.find((school) => school.id === schoolId);
      if (selectedSchool) setSchoolName(selectedSchool.short_name);
    });
  });

  return (
    <main className="success-page-main">
      <div className="successBox">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="done_title">恭喜！你的訂單已完成訂購。</h1>
        <p>下單時間：{createdTime}</p>
      </div>
      <div className="order_InfBox">
        <div className="box1">
          <div className="description_Box">
            <div className="description_Box_title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#34495d"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path>
              </svg>
              <p>溫馨提醒</p>
            </div>
            <p id="description">
              感謝您的使用，有關費用繳交資訊，請關注學生會及高校特約聯盟帳號，屆時也會以電子郵件自動寄發通知。
            </p>
          </div>
          <div className="main_box">
            <h1 className="main_title">訂單資料</h1>
            <ul>
              <li className="list_item">
                <div className="list_title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"></path>
                      <path
                        fill="currentColor"
                        d="M11.063 2.469a1.5 1.5 0 0 1 1.753-.087l.121.087l4.312 3.45a2 2 0 0 1 .743 1.38L18 7.48V10h2a2 2 0 0 1 1.995 1.85L22 12v7.9a1.1 1.1 0 0 1-.98 1.094L20.9 21H3.1a1.1 1.1 0 0 1-1.094-.98L2 19.9V12a2 2 0 0 1 1.85-1.995L4 10h2V7.48a2 2 0 0 1 .614-1.442l.137-.12l4.312-3.45ZM12 4.28l-4 3.2V19h8V7.48l-4-3.2ZM20 12h-2v7h2v-7ZM6 12H4v7h2v-7Zm6-4a3 3 0 1 1 0 6a3 3 0 0 1 0-6Zm0 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2Z"
                      ></path>
                    </g>
                  </svg>
                  <p>學校</p>
                </div>
                <p className="value_text">{schoolName}</p>
              </li>
              <li className="list_item">
                <div className="list_title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                  >
                    <path d="M240,192h-8V56a16,16,0,0,0-16-16H40A16,16,0,0,0,24,56V192H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM40,56H216V192H200V168a8,8,0,0,0-8-8H120a8,8,0,0,0-8,8v24H72V88H184v48a8,8,0,0,0,16,0V80a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8V192H40ZM184,192H128V176h56Z"></path>
                  </svg>
                  <p>班級</p>
                </div>
                <p className="value_text">{class_name}</p>
              </li>
              <li className="list_item">
                <div className="list_title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,88H175.4l8.47-46.57a8,8,0,0,0-15.74-2.86l-9,49.43H111.4l8.47-46.57a8,8,0,0,0-15.74-2.86L95.14,88H48a8,8,0,0,0,0,16H92.23L83.5,152H32a8,8,0,0,0,0,16H80.6l-8.47,46.57a8,8,0,0,0,6.44,9.3A7.79,7.79,0,0,0,80,224a8,8,0,0,0,7.86-6.57l9-49.43H144.6l-8.47,46.57a8,8,0,0,0,6.44,9.3A7.79,7.79,0,0,0,144,224a8,8,0,0,0,7.86-6.57l9-49.43H208a8,8,0,0,0,0-16H163.77l8.73-48H224a8,8,0,0,0,0-16Zm-76.5,64H99.77l8.73-48h47.73Z"></path>
                  </svg>
                  <p>座號</p>
                </div>
                <p className="value_text">{number}</p>
              </li>
              <li className="list_item">
                <div className="list_title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                  >
                    <path d="M200,112a8,8,0,0,1-8,8H152a8,8,0,0,1,0-16h40A8,8,0,0,1,200,112Zm-8,24H152a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm40-80V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Zm-80.26-34a8,8,0,1,1-15.5,4c-2.63-10.26-13.06-18-24.25-18s-21.61,7.74-24.25,18a8,8,0,1,1-15.5-4,39.84,39.84,0,0,1,17.19-23.34,32,32,0,1,1,45.12,0A39.76,39.76,0,0,1,135.75,166ZM96,136a16,16,0,1,0-16-16A16,16,0,0,0,96,136Z"></path>
                  </svg>
                  <p>姓名</p>
                </div>
                <p className="value_text">{name}</p>
              </li>
              <li className="list_item">
                <div className="list_title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                  >
                    <path
                      d="M136,216H88a48,48,0,0,1-48-48V88A48,48,0,0,1,88,40h80a48,48,0,0,1,48,48v48C208,160,160,208,136,216Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                    <path
                      d="M136,216V184a48,48,0,0,1,48-48h32"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                  </svg>
                  <p>是否需要貼紙</p>
                </div>
                <p className="value_text">{needSticker ? '需要' : '不需要'}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="box2">
          <div className="box2-inBox">
            <div className="product_Inf">
              <img src={Img} className="product_photo"></img>
              <div className="product_text">
                <h3>高校特約會員</h3>
                <p>
                  有效期間：
                  <br />
                  2025/1/1 ~ 12/31
                </p>
              </div>
              <div className="product-money">NT$10</div>
            </div>
            <div className="money-box">
              <h3 className="money-title">總計</h3>
              <h3 className="m-value-text">NT$10</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SuccessPage;
