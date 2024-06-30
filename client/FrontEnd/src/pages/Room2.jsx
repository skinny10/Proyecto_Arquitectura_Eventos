import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ButtonHome from '../components/UI/ButtonHome';
import '../Style/Room2.css';

const Room = () => {
  const [doorOpen, setDoorOpen] = useState(false);
  const [eventHistory, setEventHistory] = useState(() => {
    const savedHistory = localStorage.getItem('eventHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem('eventHistory');
    if (savedHistory) {
      const lastEvent = JSON.parse(savedHistory)[JSON.parse(savedHistory).length - 1];
      if (lastEvent.includes('abierta')) {
        setDoorOpen(true);
      } else if (lastEvent.includes('cerrada')) {
        setDoorOpen(false);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('eventHistory', JSON.stringify(eventHistory));
  }, [eventHistory]);

  const sendEventToBackend = async (eventType, details) => {
    try {
      await axios.post('http://localhost:3000/api/events', {
        type: eventType,
        details,
      });
      updateEventHistory(details);
    } catch (error) {
      console.error('Error al enviar evento:', error);
    }
  };

  const handleDoorToggle = () => {
    const newDoorState = !doorOpen;
    const eventDetails = `Puerta ${newDoorState ? 'abierta' : 'cerrada'}`;
    setDoorOpen(newDoorState);
    updateEventHistory(eventDetails);
    sendEventToBackend('doorToggle', eventDetails);
  };

  const updateEventHistory = (eventDetails) => {
    setEventHistory((prevHistory) => [...prevHistory, eventDetails]);
  };

  return (
    <div className="room-page">
      <div className="white-cover"></div> {/* Contenedor blanco */}
      <div className="room-container">
        <h1 className="room-header">Habitación 2</h1>
        <div className={`room ${doorOpen ? 'door-open' : 'door-closed'}`}>
          {/* Estructura de la habitación */}
          <div className="ceiling"></div>
          <div className="floor"></div>
          <div className="wall north"></div>
          <div className="wall east"></div>
          <div className="wall south"></div>
          <div className="wall west"></div>
          <div className="furniture sofa"></div>
          <div className="furniture table bottom-left"></div>
          <div className="furniture chair top"></div>
          <div className="furniture chair right"></div>
          <div className="furniture chair bottom"></div>
          <div className="furniture chair left"></div>
          <div className="furniture tv"></div>
          {/* Puerta */}
          <div className={`furniture door ${doorOpen ? 'open' : ''}`} onClick={handleDoorToggle}>
            <div className="door-handle"></div>
          </div>
        </div>
      </div>
      <div className="event-history">
        <h2>Historial de Eventos:</h2>
        <div className="chat-container">
          {eventHistory.map((event, index) => (
            <div className="chat-message" key={index}>
              {event}
            </div>
          ))}
        </div>
      </div>
      <div className="button-container">
        <ButtonHome onClick={handleDoorToggle} text={doorOpen ? 'Cerrar' : 'Abrir '} />
        <Link to="/home">
          <ButtonHome text="Regresar" />
        </Link>
      </div>
    </div>
  );
}

export default Room;
