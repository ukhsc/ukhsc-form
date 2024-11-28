import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function IntoVote() {
  const [ loading, setLoading ] = useState(false);

  //儲存購買人基本資訊
  const [ name, setName ] = useState('');
  const [ Class, setClass ] = useState('');
  const [ number, setNumber ] = useState('');
  const [ sticker, setSticker ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ boxStates, setBoxStates ] = useState(false)
  const currentUrl = window.location.href;
  const urlParams = new URL(currentUrl);
  const VoteID = urlParams.searchParams.get('school');

  const School = {
    '0001' : '林園高中',
    '0002' : '仁武高中'
  }
  // 使用 useEffect 確認 URL 參數
  useEffect(() => {
    document.title = '高校特約聯盟會員購買';
    {/**
    const colsebtn = document.getElementById('closebtn');
    colsebtn.style.display = 'none';
     **/}
  }, [VoteID]); // 只在組件第一次渲染時執行


  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const closebox = () => {
    setMessage('');
    setBoxStates(false);
  };

  const Messagebox = () => (
    <div className='box-background'>
      <div className='m-contentbox'>
        <h3 className='m-title'>系統通知</h3>
        <p className='m-message'>{message}</p>
        <button onClick={closebox} id='closebtn'>關閉</button>
      </div>
    </div>
  );

  return (
    <>
      {boxStates && <Messagebox />}
      <section>
        <div className='contentbox'>
          <h1>開始進行購買</h1>
          <p className='voteCode_Text' >您選擇的學校：{School[VoteID]}</p>
          <form onSubmit={handleSubmit} className='loginform'>
            <label htmlFor='name'>姓名</label>
            <input
                id='name'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="請在此輸入您的姓名"
                required // 必填欄位
            />
            <label htmlFor='class'>班級</label>
            <input
                id='class'
                type="text"
                value={Class}
                onChange={(e) => setClass(e.target.value)}
                placeholder="請在此輸入您的班級"
                required // 必填欄位
            />
            <label>座號</label>
            <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="請在此輸入您的座號"
                required // 必填欄位
                maxLength='6'
            />
            <label>是否需要貼紙</label>
            <select className='select-input' value={sticker} onChange={(e) => {setSticker(e.target.value)}}>
              <option value='0002'>不需要</option>
              <option value='0001'>需要</option>
            </select>
            <button type='submit' disabled={loading}>{loading ? <div className='loader'></div> : '繼續'}</button>
            <a className='fpbtn' href='/get-code'>返回</a>
          </form>
          <p className='copyright'>Copyright © 2024 UKHSC 高校特約聯盟 保留一切權利。</p>
        </div>
      </section>
    </>
  );
}

function GetVoteCode() {
  const [loading, setLoading] = useState(false);
  const [schoolId, setSchoolId] = useState('');
  const [message, setMessage] = useState('');
  const [boxStates, setBoxStates] = useState(false)

  const currentUrl = window.location.href;
  const urlParams = new URL(currentUrl);
  const voteError = urlParams.searchParams.get('voteError');
  const error_message = urlParams.searchParams.get('message');

  // 使用 useEffect 確認 URL 參數
  useEffect(() => {
    document.title = '高校特約聯盟會員購買';

    if (voteError === 'true'){
      setMessage(error_message);
      setBoxStates(true)
    }
  }, []); // 只在組件第一次渲染時執行

  const closebox = () => {
    setMessage('');
    setBoxStates(false);
    window.location.href = '/get-code'
  };

  const Messagebox = () => (
      <div className='box-background'>
        <div className='m-contentbox'>
          <h3 className='m-title'>系統通知</h3>
          <p className='m-message'>{message}</p>
          <button onClick={closebox} id='closebtn'>關閉</button>
        </div>
      </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = `/entrance?school=${schoolId}`;
    }, 1000)
  };

  return (
      <>
        {boxStates && <Messagebox />}
        <section>
          <div className='contentbox'>
            <h1>高校特約聯盟會員購買</h1>
            <form onSubmit={handleSubmit} className='loginform'>
              <label htmlFor='code'>選擇學校</label>
              <select value={schoolId} onChange={(e) => setSchoolId(e.target.value)} className='select-input'>
                <option value='0000' disabled >點擊這裡選擇學校</option>
                <option value='0001'>林園高中</option>
                <option value='0002'>仁武高中</option>
              </select>
              <button type='submit' disabled={loading}>{loading ? <div className='loader'></div> : '下一步'}</button>
            </form>
            <p className='copyright'>Copyright © 2024 UKHSC 高校特約聯盟 保留一切權利。</p>
          </div>
        </section>
      </>
  );
}

function Home() {
  useEffect(() => {
    window.location.href = '/get-code'
  })
}

function Index() {
  return (
    <Router>
      <Routes baseName='/'>
        <Route path='/' element={<Home />}></Route>
        <Route path='/entrance' element={<IntoVote />}></Route>
        <Route path='/get-code' element={<GetVoteCode />}></Route>
      </Routes>
    </Router>
  )
}
export default Index
