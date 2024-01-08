import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoSend } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { io } from "socket.io-client";
const Chatroom = () => {
  
  const location = useLocation();
  const [allmsg, setAllmsg] = useState([]);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({});
 const [socket,setSocket]=useState()

  useEffect(() => {
    
    const socket = io("http://localhost:8000/");
    setSocket(socket)

    socket.on("connect", () => {
console.log(socket.id);
socket.emit('joinRoom',location.state.room)
// x8WIv7-mJelg7on_ALbx
})


;
}, [])

  useEffect(() => {
    setData(location.state);
  }, [location]);
  
useEffect(()=>{
  if(socket){
    socket.on("getLatestMessage",newMessage=>{
      // setAllmsg(newMessage)
      setAllmsg([...allmsg, newMessage]);
    })
  }

},[socket,allmsg])
  

  const handleChange = (event) => {
    setMsg(event.target.value);
  }

  const handleClick = () => {
    if (msg){
      const newMessage = { time: new Date(), msg: msg, name: data.name };
      socket.emit("newMessage",{newMessage,room:data.room})

    }
    
    // setAllmsg([...allmsg, newMessage]);
    setMsg("");
  }
const handlekeydown=(event)=>{
  console.log(event)
  event.key==='Enter'? handleClick():null
}


  return (
    <Maincont className="maincontainer">
      <SecCont>
        <div className="header">
          <h1>{`${data.room} Chat Room`} </h1>
        </div>
        <div className="chats">
          {allmsg.map((message, index) => (
            <div className={message.name === data.name ? "chat1" : "chat2"} key={index}>
              <div className="wrapper">
                <div className="name">
                  <div className="inchat">
                    <strong>{message.name}</strong>
                    <p>{message.time}</p>
                  </div>
                  <div className="msg">
                    <p>{message.msg}</p>
                  </div>
                </div>
              </div>

            </div>

          ))}
        </div>
        <Inputfield className="input">
          <div className="field">
            <input
              type="text"
              onChange={handleChange}
              name='message'
              value={msg} onKeyDown={handlekeydown}
            />
            <div className="btn">
              <IoSend size={29} style={{ marginLeft: '20px', cursor: 'pointer' }} onClick={handleClick}
               />
            </div>
          </div>
        </Inputfield>
      </SecCont>
    </Maincont>
  )
}

export default Chatroom;

const Maincont = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SecCont = styled.div`
  .chats {
    height: 500px;
    width: 600px;
    background-color: #d4dedf;
    overflow: scroll;
  }

  .wrapper {
    display: inline-block;
  }

  .chat1 {
    display: flex;
    height: 80px;
    width: 100%;
    margin-top: 30px;
    justify-content: flex-end;
    margin-right: 20px;
    /* background-color: #10f7dc; */
    .name {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 10px;
      background-color: #10f7dc;
      padding-right: 10px;
      float: right;
      width: auto;
      align-items: end;
      margin-right: 15px;
    }
    .inchat {
      display: flex;
      gap: 8px;
    }
  }

  .chat2 {
    display: flex;
    height: 80px;
    width: 100%;
    margin-top: 30px;
    margin-left: 20px;
   
    .name {
      display: flex;
      width: auto;
      padding-left: 10px;
      padding-right: 10px;
      flex-direction: column;
      background-color: white;
      justify-content: center;
      float: left;
      align-items: start;
      margin-right: 15px;
    }
    .inchat {
      display: flex;
      gap: 8px;
    }
  }
`;

const Inputfield = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  gap: 20px;
  input {
    width: 90%;
    height: 40px;
  }
  .field {
    width: 100%;
    display: flex;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
