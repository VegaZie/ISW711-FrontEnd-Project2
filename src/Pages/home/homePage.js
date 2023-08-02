import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navigation from "../../components/navigation/navigationBar";
import Button from "../../components/button/button";
import Card from "../../components/card/card";
import Spinner from "../../components/spinner/spinner";
import ErrorMessage from "../../components/error/errorMessage";
import NoPromptsMessage from "../../components/noPromtsMessage/noPromtMessage";
import RegistrationPopup from "../../components/popup/registrationUserPopup";
import PromtCreatePopup from "../../components/popup/promtCreatePromtPopup";
import "./homePage.scss";

const HomePage = () => {
  // Declaración del estado dataList usando useState
  const [dataList, setDataList] = useState([]);

  // Estado para mostrar el mensaje de "No tienes promts registrados"
  const [showNoPromptsMessage, setShowNoPromptsMessage] = useState(false);

  // Estado para mostrar los registros de usuario y promts
  const [showRegistrarionPopup, setShowRegistrarionPopup] = useState(false);
  const [showPromtPopup, setShowPromtPopup] = useState(false);

  // Obtebenos el token, nombre, rol y userID del sessionStorage
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");
  const role = sessionStorage.getItem("role");
  const userID = sessionStorage.getItem("id");

  // Convertimos el rol a un valor booleano para userRole
  const userRole = role === "admin";

  // Manejo de errores
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Función para aceptar el mensaje de error
  const handleAcceptError = () => {
    setError(false);
  };

  // Navegación con el hook useNavigate
  const navigate = useNavigate();

  // Función para manejar el logout
  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const onClosePopup = () => {
    setShowRegistrarionPopup(false);
    setShowPromtPopup(false);
  };
  // Función para obtener los promts o usuarios según el rol
  const fetchData = useCallback(() => {
    const url = userRole
      ? process.env.REACT_APP_USER
      : process.env.REACT_APP_PROMTS + `?userID=${userID}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        // handle success
        setDataList(response.data);
      })
      .catch(function (error) {
        setErrorMessage("Algo ha salido mal: " + error);
        setError(true);
      });
  }, [userID, userRole, token]);
  // Efecto para obtener la lista de promts o usuarios según el rol
  useEffect(() => {
    fetchData();

    // Agregamos un timer para mostrar el mensaje si dataList está vacío después de 5 segundos
    const timer = setTimeout(() => {
      if (dataList.length === 0) {
        setShowNoPromptsMessage(true);
      }
    }, 3000); // 5000 milisegundos = 3 segundos

    return () => clearTimeout(timer);
  }, [dataList.length, fetchData]);

  // Función para manejar el click del botón de agregar
  const handleAddClick = () => {
    if (userRole) {
      setShowRegistrarionPopup(true);
    } else {
      setShowPromtPopup(true);
    }
  };

  return (
    <div className="home-page">
      {/* Barra de navegación */}
      <Navigation
        appName="AI Promts"
        userName={name}
        role={role}
        onLogout={handleLogOut}
      />

      {userRole ? (
        <div className="home-page__content">
          <h2>Lista de Usuarios</h2>
          <Button onClick={handleAddClick}>Agregar Usuario</Button>
        </div>
      ) : (
        <div className="home-page__content">
          <h2>Lista de Promts</h2>
          <Button onClick={handleAddClick}>Agregar Promt</Button>
        </div>
      )}

      {dataList.length > 0 ? (
        // Mostrar elementos si dataList tiene datos
        <div className="home-page__content">
          <div className="home-page__card-container">
            {/* Renderizar tarjetas */}
            {userRole ? (
              <div className="home-page__card-item">
                {dataList.map((item) => (
                  <Card
                    key={item._id}
                    isAdmin={userRole}
                    data={item}
                    token={token}
                    onSucess={fetchData}
                  />
                ))}
              </div>
            ) : (
              <div className="home-page__card-item">
                {dataList.map((item) => (
                  <Card
                    key={item._id}
                    isAdmin={userRole}
                    data={item}
                    token={token}
                    onSucess={fetchData}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : showNoPromptsMessage ? (
        // Mostrar mensaje especial si dataList está vacío y ha pasado el tiempo
        <NoPromptsMessage />
      ) : (
        // Mostrar Spinner mientras se obtienen los datos
        <Spinner />
      )}

      {/* Mostrar mensaje de error si hay un error */}
      {error && (
        <ErrorMessage message={errorMessage} onAccept={handleAcceptError} />
      )}

      {showRegistrarionPopup && (
        <RegistrationPopup onSucess={fetchData} onClose={onClosePopup} />
      )}
      {showPromtPopup && (
        <PromtCreatePopup
          onSucess={fetchData}
          onClose={onClosePopup}
          id={userID}
          token={token}
        />
      )}
    </div>
  );
};

export default HomePage;
