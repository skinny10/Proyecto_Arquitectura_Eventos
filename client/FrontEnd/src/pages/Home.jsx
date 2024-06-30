import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ButtonHome from "../components/UI/ButtonHome";
import "../Style/Home.css";

function Home() {
  const [lampOn, setLampOn] = useState(false);
  const [eventHistory, setEventHistory] = useState(() => {
    const savedHistory = localStorage.getItem("eventHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem("eventHistory");
    if (savedHistory) {
      const lastEvent =
        JSON.parse(savedHistory)[JSON.parse(savedHistory).length - 1];
      if (lastEvent.includes("encendido")) {
        setLampOn(true);
      } else if (lastEvent.includes("apagado")) {
        setLampOn(false);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("eventHistory", JSON.stringify(eventHistory));
  }, [eventHistory]);

  const sendEventToBackend = async (eventType, details) => {
    try {
      await axios.post("http://localhost:3000/api/events", {
        type: eventType,
        details,
      });
      updateEventHistory(details);
    } catch (error) {
      console.error("Error al enviar evento:", error);
    }
  };

  const handleButtonClick = (event) => {
    const eventDetails = `Botón ${event.target.name} clickeado`;
    console.log(eventDetails);
    sendEventToBackend("buttonClick", eventDetails);
  };

  const handleLampButtonClick = () => {
    const newLampState = !lampOn;
    const eventDetails = `Foco ${newLampState ? "encendido" : "apagado"}`;
    console.log(`Botón del foco clickeado: ${eventDetails}`);
    setLampOn(newLampState);
    updateEventHistory(eventDetails);
    sendEventToBackend("lampToggle", eventDetails);
  };

  const updateEventHistory = (eventDetails) => {
    setEventHistory((prevHistory) => [...prevHistory, eventDetails]);
  };

  return (
    <div className="home">
      <h1 className="header">¡Bienvenido a tu Sala!</h1>
      <div className="content">
        <div className="room">
          <div className={`ceiling ${lampOn ? "lamp-on" : ""}`}>
            <div className="lamp"></div>
          </div>
          <div className="floor"></div>
          <div className="wall north"></div>
          <div className="wall east"></div>
          <div className="wall south"></div>
          <div className="wall west"></div>
          <div className="furniture sofa left"></div>
          <div className="furniture sofa right"></div>
          <div className="furniture table"></div>
          <div className="furniture chair top"></div>
          <div className="furniture chair right"></div>
          <div className="furniture chair bottom"></div>
          <div className="furniture chair left"></div>
          <div className="furniture table"></div>
          <div className="furniture chair top"></div>
          <div className="furniture chair right"></div>
          <div className="furniture chair bottom"></div>
          <div className="furniture chair left"></div>
        </div>
        <div className="event-historyi">
          <h2>Historial de Eventos</h2>
          <div className="chat-container">
            {eventHistory.map((event, index) => (
              <div className="chat-message" key={index}>
                {event}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="button-home-container">
        <Link to="/room">
          <ButtonHome
            name="Button1"
            onClick={handleButtonClick}
            text="Habitación 1"
          />
        </Link>

        <ButtonHome
          name="Button-conteiner"
          onClick={handleLampButtonClick}
          text={lampOn ? "Apagar" : "Encender"}
        />

        <Link to="/room2">
          <ButtonHome
            name="Button2"
            onClick={handleButtonClick}
            text="Habitación 2"
          />
        </Link>
      </div>
    </div>
  );
}

export default Home;
