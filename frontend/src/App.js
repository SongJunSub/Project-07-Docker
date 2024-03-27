import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

    useEffect(() => {
        axios.get('/api/selectValues')
            .then(response => {
                console.log('response', response)
                setLists(response.data)
            })
    }, [])

    const [lists, setLists] = useState([])
    const [value, setValue] = useState("")

    const changeHandler = (event) => {
        setValue(event.currentTarget.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        axios.post('/api/insertValue', {value: value})
            .then(response => {
              if(response.data.success){
                  console.log('response', response)
                  setLists([...lists, response.data])
                  setValue("");
              }
              else{
                  alert('Inserting Failed')
              }
            })
    }

    return (
        <div className="App">
            <header className="App-header">
                <h3>Multi Container Application</h3>
                <img src={logo} className="App-logo" alt="logo"/>
                <div className="container">
                    {lists && lists.map((list, index) => (
                        <li key={index}>{list.VALUE}</li>
                    ))}

                    <br/>

                    <form className="example" onSubmit={submitHandler}>
                        <input type="text" placeholder="입력 시 데이터 저장 후 상단에 리스트로 표기됩니다." value={value} onChange={changeHandler}/>
                        <button type="submit">등록</button>
                    </form>
                </div>
            </header>
        </div>
    );

}

export default App;