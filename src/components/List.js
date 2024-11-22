import React, { useEffect, useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';

function List({      
  mockData,
  setMockData,
  mode,
  setMode,
  modalInput,
  setModalInput,
  selectId,
  setSelectID,
  setSelectedDate,
  selectedData}){

  const navigate = useNavigate();

  // 학생 정보를 서버에서 가져오는 함수
  function getStudents() {
    console.log("눌림");
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://672818e6270bd0b975545367.mockapi.io/api/v1/user");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response); 
        console.log('데이터 확인', res);
        setMockData(res);  
      } else {
        console.log(xhr.status, xhr.statusText); 
      }
    }
  }


  function editChange(item) {
    console.log("수정 데이터 확인", item);
    
    setMode('edit');
    const {id, name, age, job, phoneNumber} = item;
    setSelectID(id);

    setModalInput({
      ...modalInput,
      name: name,
      age:age,
      job: job,
      phoneNumber: phoneNumber
    })
  }

  useEffect(()=>{
    getStudents();
  }
  ,[])

  const clickDetail = (item) => {
    console.log("조속히 확인바람", item)
    setSelectedDate({
      id: item.id,
      name: item.name,
      age: item.age,
      job: item.job,
      phoneNumber: item.phoneNumber
    });
    navigate('/detail');
  };
  

  const clickUpdate = (e, item) =>{
    e.stopPropagation();
    editChange(item);
    navigate('/update');
  }

  return(
    <div>
    <h2>Membership Management</h2>
  {/* <button id="btnStu" className="btn btn-warning" onClick={getStudents}>회원 정보 가져오기</button> */}
  <button type="button" className="btn btn-primary"
  style={{marginBottom:"10px", marginLeft:"30px"}}
  onClick={() => setMode('add')}>
  회원 CREATE
  </button>

  <div id="contents">
    <ul>
    {
      mockData.map((item)=>{
        return(
          <div key={item.id}>
            <li className='member' onClick={()=>clickDetail(item)}> 
            이름: {item.name}/ 나이: {item.age}/ 직업: {item.job}/ 번호: {item.phoneNumber}
            <span>
              <button className="btn btn-warning"  onClick={(e)=>clickUpdate(e, item)}>
                회원 UPDATE</button>
              {/* <button onClick={()=>deleteData(item.id)}className="btn2">삭제</button> */}
            </span>
            </li>
          </div>
        );
      })
    }
    </ul>
  </div>  
    </div>
  );
}

export default List;