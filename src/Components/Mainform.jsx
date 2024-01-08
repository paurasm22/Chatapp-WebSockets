import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Mainform = () => {
  const navigate=useNavigate()
  const [error,setError]=useState("")
  const [data,setData]=useState({
    name:"",
    room:""
  })
  const handleinput=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
  }
  const validation = ()=>{
    if(!data.name){
      setError("Please Enter your name")
      return false
    }
    if(!data.room){
      setError("Please select Room")
      return false
    }
    setError("")
    return true
  }

const handleSubmit=()=>{
  console.log(data)
  const isvalid=validation()
  if(isvalid){
    navigate(`/chat/${data.room}`,{state : data})

  }
}


  return (
    <Container className="container">
        <Formcontainer className="formcontainer">

          <h1>Welcome to Chatclub</h1>
          <input type="text" placeholder='Enter Name ' name='name' onChange={handleinput}  />
          <select name="room" id="" onChange={handleinput} >
            <option value="">Select Room</option>
            <option value="Gaming">Gaming</option>
            <option value="Coding">Coding</option>
            <option value="Social media">Social Media</option>
          </select>
          
          <button onClick={handleSubmit}>SUBMIT</button>
          <p>{`${error}`}</p>
        </Formcontainer>

    </Container>
  )
}

export default Mainform

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Formcontainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
border: 1px black solid;
border-radius: 10px;
gap: 20px;
padding: 40px;
box-shadow: 2px 2px 20px 5px;
h1{
  color: #eac10c;
}
input{
  width: 300px;

}
select{
  width: 300px;

}
button{
  background-color: yellow;
  color: black;
  border: none;
  width: 300px;
  border-radius: 20px;
  &:hover{
    background-color: orange;
  }
  

}
p{
  color: red;
  font-weight: 600;
  font-size: large;
  margin-bottom: 0px;
}
`