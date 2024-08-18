import dayjs from "dayjs"
import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../../../context/AuthContext"
import './Consulting.css'

const Consulting = () => {
    const [consulting, setConsulting] = useState({})
    const { token, user } = useContext(AuthContext)
    const [sending, setSending] = useState(false)
    const { id } = useParams()
    const msgRef = useRef()
    const messagesRef = useRef()
    
    const markAsViewed = async () => {
        await fetch(`http://localhost:3000/api/v1/message/${id}/viewed`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      };
    
      const getConsulting = async () => {
        const consulting = await fetch(`http://localhost:3000/api/v1/consulting/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await consulting.json();
        if (json.success) {
          setConsulting(json.data);
          await markAsViewed(); 
        }
      };

    const sendMessage = async () => {
        if (msgRef.current.value.length == 0) {
            alert('Enter a message please')
            return
        }
        setSending(true)
        const message = await fetch('http://localhost:3000/api/v1/message/' + id, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: msgRef.current.value
            })
        })
        const sent = await message.json()
        if (sent.success) {
            msgRef.current.value = ''
            setConsulting((prevCons) => {
                console.log([
                    ...prevCons.Messages,
                    sent.data
                ])
                return {
                    ...prevCons,
                    Messages: [
                        ...prevCons.Messages,
                        sent.data
                    ]
                }
            })
        }
        setSending(false)
    }

    useEffect(() => {
        if (consulting?.Messages?.length > 0) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [])

    useEffect(() => {
        getConsulting()
        const updateCons = setInterval(() => {
           getConsulting()
            
        }, 3000)
        return () => {
            clearInterval(updateCons)
        }
    }, [])

   
    
    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h1 className="m-0">Consulting ID: #{consulting?.id}</h1>
                <div className="d-flex align-items-center">
                    <div className="me-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M17 3v-2c0-.552.447-1 1-1s1 .448 1 1v2c0 .552-.447 1-1 1s-1-.448-1-1zm-12 1c.553 0 1-.448 1-1v-2c0-.552-.447-1-1-1-.553 0-1 .448-1 1v2c0 .552.447 1 1 1zm13 13v-3h-1v4h3v-1h-2zm-5 .5c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5-4.5 2.019-4.5 4.5zm11 0c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5zm-14.237 3.5h-7.763v-13h19v1.763c.727.33 1.399.757 2 1.268v-9.031h-3v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-9v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-3v21h11.031c-.511-.601-.938-1.273-1.268-2z" /></svg></div>
                    <strong>Date: {dayjs(consulting?.createdAt).format('YYYY-MM-DD')}</strong>
                </div>
            </div>
            
            <div className="messages-container">
                <div className="p-3 border-bottom">
                  
                </div>
                <div className="messages p-3 border-bottom" ref={messagesRef}>
                    {
                        consulting?.Messages?.map((msg, i) => {
                            console.log(msg, user)
                            return (
                                <div key={i} className={`mt-2 mb-2 p-2 message ${msg.userId == user?.user?.id ? 'mine' : ''}`}>
                                    {msg.content}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="d-flex">
                    <textarea ref={msgRef} className="msg-box w-100 m-3" placeholder="Type your message..."></textarea>
                    <button type="submit" disabled={sending} className="btn btn-primary m-3" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </>
    )
}

export default Consulting