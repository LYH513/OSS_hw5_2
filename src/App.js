import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom"
import List from './components/List';
import Detail from './components/Detail';
import Update from './components/Update';
import { useState } from 'react';

function App() {
  const [mockData, setMockData] =useState([]);
  const [mode, setMode] =useState('add');

  const [modalInput, setModalInput] = useState({
    name: "",
    age: "",
    job: "",
    phoneNumber: ""
  })

  const [selectedData, setSelectedDate] = useState({
    id: "",
    name: "",
    age: "",
    job: "",
    phoneNumber: ""
  })

  const [selectId, setSelectID] = useState("");

  return (
    <Routes>
      <Route path="/" element={<List 
      mockData ={mockData}
      setMockData={setMockData}
      mode={mode}
      setMode={setMode}
      modalInput={modalInput}
      setModalInput={setModalInput}
      selectId={selectId}
      setSelectID={setSelectID}
      setSelectedDate={setSelectedDate}
      selectedData={selectedData}
      />}></Route>
      <Route path="/list" element={<List
        mockData ={mockData}
        setMockData={setMockData}
        mode={mode}
        setMode={setMode}
        modalInput={modalInput}
        setModalInput={setModalInput}
        selectId={selectId}
        setSelectID={setSelectID}
        setSelectedDate={setSelectedDate}
        selectedData={selectedData}
      />}></Route>
      <Route path="/detail" 
      element={<Detail 
        setSelectedDate={setSelectedDate}
        selectedData={selectedData}
        />}></Route>
      <Route path="/update" element={<Update/>}></Route>
    </Routes>
  );
}

export default App;
