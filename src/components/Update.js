import React from "react";
import { useNavigate } from "react-router-dom";

function Update({    
  mockData,
  setMockData,
  mode,
  setMode,
  modalInput,
  setModalInput,
  selectId,
  setSelectID}
){

  const navigate = useNavigate();

  function resetInput(){

    setModalInput({
      name: "",
      age: "",
      job: "",
      phoneNumber: ""
    })
  }

  const handleModalInput = (e) =>{
    setModalInput({
      ...modalInput,
      [e.target.name] :e.target.value
    })
  }

  // 데이터를 서버에 추가하는 함수
  function postData() {

    const xhr = new XMLHttpRequest();
    xhr.open("POST","https://672818e6270bd0b975545367.mockapi.io/api/v1/user");
    xhr.setRequestHeader("content-type","application/json;charset=UTF-8")

    const data = modalInput;

    xhr.send(JSON.stringify(data));
    xhr.onload = () => {
      if (xhr.status === 201) {
        const res = JSON.parse(xhr.response);
        // getStudents() ;
      } else {
        console.log(xhr.status, xhr.statusText);
      }
    }
    }

    //데이터 수정하는 함수
    function updateData(id) {
      // alert(id)
      const xhr = new XMLHttpRequest();
  
      let name = document.getElementById("name");
      let age = document.getElementById("age");
      let job = document.getElementById("job");
      let phoneNumber = document.getElementById("phoneNumber");
  
      xhr.open("PUT", "https://672818e6270bd0b975545367.mockapi.io/api/v1/user/" +id);
      xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
      const data = { name: name.value, age: age.value, job: job.value, phoneNumber:phoneNumber.value };
  
      xhr.send(JSON.stringify(data));
  
      xhr.onload = () => {
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.response);
          console.log(res);
          // getStudents();
          resetInput();
        } 
        else {
          console.log(xhr.status, xhr.statusText);
        }
      }
      }

  return(
    <div>
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetInput}></button>
          </div>
            <div className="modal-body">
              <div style={{marginTop: "10px"}}>
                <label htmlFor="name">이름:</label>
                <input type="text" id="name" name="name" onChange={handleModalInput} value={modalInput.name}/>
              <label htmlFor="age">나이:</label>
              <input  type="number" id="age" name="age" onChange={handleModalInput} value={modalInput.age}/>
          
              <label htmlFor="job">직업:</label>
              <input  type="text" id="job" name="job" onChange={handleModalInput} value={modalInput.job}/>
              
              <label htmlFor="phoneNumber">번호:</label>
              <input  type="text" id="phoneNumber" name="phoneNumber" onChange={handleModalInput} value={modalInput.phoneNumber}/>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetInput}>취소</button>
            <button type="button" id="btnAdd" className="btn btn-primary" data-bs-dismiss="modal" onClick= {()=>(mode==='add'? postData() : updateData(selectId))}>확인</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Update;