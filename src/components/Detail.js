import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Detail({selectedData, setSelectedDate, server}){

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

  const deleteData = async(id)=>{

    try{
      const response = await axios.delete(`${server}/${id}`);
      console.log(response.data)
      resetInput()
      navigate('/list');
    }
    catch(error){
      console.error(error);
    }
  }

  const backList = () =>{
    resetInput();
    navigate('/list')
  }

  return(
    <div>
      <h2>Membership Management</h2>
      <button type="button" className="btn btn-primary" style={{marginRight:"10px", marginLeft:"30px"}}
      onClick={backList} >
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