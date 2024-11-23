import React, { useEffect, useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function List({      
  mockData,
  setMockData,
  setMode,
  selectedData,
  setSelectedDate,
  server}){

  const navigate = useNavigate();

  // 학생 정보를 서버에서 가져오는 함수
  const getStudents =async()=> {

    try{
      const response = await axios.get(`${server}`);
      console.log(response.data)
      setMockData(response.data); 
    }
    catch(error){
      console.error(error);
    }
  }


  function editChange(item) {
    console.log("수정 데이터 확인", item);
    
    setMode('edit');
    const {id, name, age, job, phoneNumber} = item;
    // setSelectID(id);

    setSelectedDate({
      id: id,
      name: name,
      age:age,
      job: job,
      phoneNumber: phoneNumber
    })

    navigate('/update');
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
  }

  const clickCreate = () =>{
    setMode('add');
    navigate('/update');
  }

  return(
    <div>
    <h2>Membership Management</h2>
  {/* <button id="btnStu" className="btn btn-warning" onClick={getStudents}>회원 정보 가져오기</button> */}
  <button type="button" className="btn btn-primary"
  style={{marginBottom:"10px", marginLeft:"30px"}}
  onClick={clickCreate}>
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