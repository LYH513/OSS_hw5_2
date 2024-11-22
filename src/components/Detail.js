import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Detail({selectedData, setSelectedDate}){

  const navigate = useNavigate();

  useEffect(()=>{
    console.log("받아옴??",selectedData);
  },[selectedData])

  function resetInput(){

    setSelectedDate({
      id: "",
      name: "",
      age: "",
      job: "",
      phoneNumber: ""
    });
  }

  function deleteData(id){
    const xhr = new XMLHttpRequest();

    console.log("id 확인", id);
    
    xhr.open("DELETE", "https://672818e6270bd0b975545367.mockapi.io/api/v1/user/"+id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response); 
        console.log(xhr.status, res);  
        resetInput()
        navigate('/list');

      } else {
        console.log("삭제 실패", xhr.status, xhr.statusText);
      }
    }
    xhr.onerror = () => {
      console.log("DELETE 요청 실패 - 네트워크 오류 발생");
    };

  }

  return(
    <div>
      <h2>Membership Management</h2>
      <button type="button" className="btn btn-primary" style={{marginRight:"10px", marginLeft:"30px"}}
      onClick={()=>navigate('/list')} >
      회원 LIST
      </button>
      <button onClick={()=>deleteData(selectedData.id)}className="btn btn-danger">회원 DELETE</button>
      <div style={{marginTop:"20px"}}> 
        <div style={{display:"flex", flexDirection:"column" , border:"1px solid black", width:"50%",marginLeft:"30px", padding:"5px"}}>
          <span>name: {selectedData.name}</span>
          <span>job: {selectedData.job}</span>
          <span>age:{selectedData.age}</span>
          <span>phoneNumber: {selectedData.phoneNumber}</span>
        </div>
      </div>

    </div>
  )
}

export default Detail;