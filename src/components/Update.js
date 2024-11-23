import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Update({    
  mode,
  selectedData, 
  setSelectedDate,
  server}
){

  const navigate = useNavigate();
  const ref = useRef(0);

    // 각 필드에 대한 참조 추가
    const nameRef = useRef(null); // 수정
    const ageRef = useRef(null); // 수정
    const jobRef = useRef(null); // 수정
    const phoneNumberRef = useRef(null); 

  function resetInput(){
    setSelectedDate({
      id: "",
      name: "",
      age: "",
      job: "",
      phoneNumber: ""
    });
  }

  const validateInputs = () => { 
    if (!nameRef.current.value.trim()) { 
      alert("이름을 입력하세요."); 
      nameRef.current.focus(); 
      return false; 
    }
    if (!ageRef.current.value.trim()) { 
      alert("유효한 나이를 입력하세요."); 
      ageRef.current.focus(); 
      return false; 
    }
    if (!jobRef.current.value.trim()) { 
      alert("직업을 입력하세요."); 
      jobRef.current.focus();
      return false; 
    }
    if (!phoneNumberRef.current.value.trim()) { 
      alert("유효한 전화번호를 입력하세요. (숫자만 입력, 10~11자리)"); 
      phoneNumberRef.current.focus(); 
      return false; 
    }
    return true; 
  };

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
      // resetInput();
    }
    catch(error){
      console.error(error);
    }
  }

  const handleModalInput = (e) => {
    setSelectedDate({
      ...selectedData,
      [e.target.name]: e.target.value
    });
    console.log("id", selectedData.id)
    if(selectedData.id){
      updateData(selectedData.id)
      ref.current = ref.current+1;
    }

  }

  // 데이터를 서버에 추가하는 함수
  const postData = async()=> {
    if (!validateInputs()) return;

    const data = selectedData;

    try{
      const response = await axios.post(`${server}`, data);
      console.log(response.data);
      navigate('/list');
    }
    catch(error){
      console.error(error);
    }
  }

  const backList = () =>{
    resetInput()
    navigate('/list')
  }

  return (
    <div>
      <div className="container">
        <h2>Membership Management {mode === "add" ? "등록" : "수정"}</h2>
        {mode === "edit" ? <p>수정된 횟수: {ref.current}</p> : null}

        {/* 이름 입력 필드 */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="name-input-group">이름</span>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            ref={nameRef} // 수정
            onChange={handleModalInput}
            value={selectedData.name || ""}
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
            ref={ageRef} // 수정
            onChange={handleModalInput}
            value={selectedData.age || ""}
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
            ref={jobRef} // 수정
            onChange={handleModalInput}
            value={selectedData.job || ""}
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
            ref={phoneNumberRef} // 수정
            onChange={handleModalInput}
            value={selectedData.phoneNumber || ""}
            aria-label="전화번호"
            aria-describedby="phoneNumber-input-group"
          />
        </div>

        {/* 확인 버튼 */}
        {mode === "add" ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={postData}
            style={{ marginRight: "10px" }}
          >
            회원 등록
          </button>
        ) : null}

        {/* 취소 버튼 */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={backList}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default Update;