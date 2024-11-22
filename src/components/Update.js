import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Update({    
  mode,
  modalInput,
  setModalInput,
  selectId,
  server}
){

  const navigate = useNavigate();

  function resetInput(){
    setModalInput({
      name: "",
      age: "",
      job: "",
      phoneNumber: ""
    });
    navigate('/list')
  }

  const handleModalInput = (e) => {
    setModalInput({
      ...modalInput,
      [e.target.name]: e.target.value
    });
  }

  // 데이터를 서버에 추가하는 함수
  const postData = async()=> {

    try{
      const response = await axios.post(`${server}`);
      console.log(response.data);
      navigate('/list');
    }
    catch(error){
      console.error(error);
    }
  }

  // 데이터 수정하는 함수
  const updateData = async(id)=> {

    let name = document.getElementById("name");
    let age = document.getElementById("age");
    let job = document.getElementById("job");
    let phoneNumber = document.getElementById("phoneNumber");

    const data = { 
      name: name.value, 
      age: age.value, 
      job: job.value, 
      phoneNumber: phoneNumber.value 
    };

    try{
      const response = await axios.put(`${server}/${id}`, data);
      console.log(response.data);
      resetInput();
    }
    catch(error){
      console.error(error);
    }
  }

  return (
    <div>
      <div className="container">
        <h2>Membership Management {mode === "add" ? "등록" : "수정"}</h2>

        {/* 이름 입력 필드 */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="name-input-group">이름</span>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleModalInput}
            value={modalInput.name? modalInput.name: ""}
            aria-label="이름"
            aria-describedby="name-input-group"
          />
        </div>

        {/* 나이 입력 필드 */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="age-input-group">나이</span>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            onChange={handleModalInput}
            value={modalInput.age? modalInput.age: ""}
            aria-label="나이"
            aria-describedby="age-input-group"
          />
        </div>

        {/* 직업 입력 필드 */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="job-input-group">직업</span>
          <input
            type="text"
            className="form-control"
            id="job"
            name="job"
            onChange={handleModalInput}
            value={modalInput.job? modalInput.job : ""}
            aria-label="직업"
            aria-describedby="job-input-group"
          />
        </div>

        {/* 전화번호 입력 필드 */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="phoneNumber-input-group">번호</span>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            onChange={handleModalInput}
            value={modalInput.phoneNumber? modalInput.phoneNumber :""}
            aria-label="전화번호"
            aria-describedby="phoneNumber-input-group"
          />
        </div>

        {/* 확인 버튼 */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => (mode === "add" ? postData() : updateData(selectId))}
        >
          {mode === "add" ? "회원 등록" : "회원 수정"}
        </button>

        {/* 취소 버튼 */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={resetInput}
          style={{marginLeft:"10px"}}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default Update;
