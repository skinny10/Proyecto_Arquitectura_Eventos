import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ButtonHome from '../components/UI/ButtonHome';
import '../Style/Room.css';

const Room = () => {
  const [climateOn, setClimateOn] = useState(false);
  const [eventHistory, setEventHistory] = useState(() => {
    const savedHistory = localStorage.getItem('eventHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem('eventHistory');
    if (savedHistory) {
      const lastEvent = JSON.parse(savedHistory)[JSON.parse(savedHistory).length - 1];
      if (lastEvent.includes('encendido')) {
        setClimateOn(true);
      } else if (lastEvent.includes('apagado')) {
        setClimateOn(false);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('eventHistory', JSON.stringify(eventHistory));
  }, [eventHistory]);

  const sendEventToBackend = async (eventType, details) => {
    try {
      await axios.post('http://localhost:3000/api/event-room', {
        type: eventType,
        details,  
      });
      updateEventHistory(details);
    } catch (error) {
      console.error('Error al enviar evento:', error);
    }
  };

  const handleClimateToggle = () => {
    const newClimateState = !climateOn;
    const eventDetails = `Clima ${newClimateState ? 'encendido' : 'apagado'}`;
    setClimateOn(newClimateState);
    updateEventHistory(eventDetails);
    sendEventToBackend('climateToggle', eventDetails);
  };

  const updateEventHistory = (eventDetails) => {
    setEventHistory((prevHistory) => [...prevHistory, eventDetails]);
  };

  return (
    <div className="room-page">
      <div className="white-cover"></div> {/* Contenedor blanco */}
      <div className="room-container">
        <h1 className="room-header">Habitación 1</h1>
        <div className={`room ${climateOn ? 'cooling' : ''}`}>
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
          <div className={`furniture climate ${climateOn ? 'active' : ''}`}>
            {climateOn && (
              <div className="climate-display">
                <div>24°C</div>
                <div>❄️</div>
              </div>
            )}
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
        <ButtonHome onClick={handleClimateToggle} text={climateOn ? 'Apagar' : 'Encender'} />
        <Link to="/home">
          <ButtonHome text="Regresar" />
        </Link>
      </div>
    </div>
  );
}

export default Room;
