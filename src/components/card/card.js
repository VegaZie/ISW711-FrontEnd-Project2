import React, { useState } from "react";
import axios from "axios";

import Button from "../button/button";
import UserPopup from "../popup/userPopup";
import PromtCompletionsPopup from "../popup/promtCompletionsPopup";
import PromtEditPopup from "../popup/promtEditPopup";
import PromtImagePopup from "../popup/promtImagePopup";
import ErrorMessage from "../error/errorMessage";
import SuccessMessage from "../successMessage/successMessage";

import "./card.scss";

const Card = ({ isAdmin, data, token, onSucess }) => {
  const [userPopup, setUserPopup] = useState(false);
  const [promtEditPopup, setPromtEditPopup] = useState(false);
  const [promtCompletionsPopup, setPromtCompletionsPopup] = useState(false);
  const [promtImagesPopup, setPromtImagesPopup] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAcceptError = () => {
    setError(false);
  };

  const handleAcceptSuccess = () => {
    onSucess();
    setSuccess(false);
  };

  const handleView = (type) => {
    switch (type) {
      case "edit":
        setPromtEditPopup(true);
        break;
      case "completions":
        setPromtCompletionsPopup(true);
        break;
      case "images":
        setPromtImagesPopup(true);
        break;
      default:
        setUserPopup(true);
        break;
    }
    // Lógica para observar el elemento
  };

  const onClosePopup = () => {
    setUserPopup(false);
    setPromtEditPopup(false);
    setPromtCompletionsPopup(false);
    setPromtImagesPopup(false);
  };

  const handleDelete = () => {
    const infoID = data._id;
    const url = isAdmin
      ? process.env.REACT_APP_USER + `?id=${infoID}`
      : process.env.REACT_APP_PROMTS + `?id=${infoID}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuccess(true);
      })
      .catch((errorM) => {
        console.log(errorM);
        setErrorMessage("Eliminación del promt fallida.");
        setError(true);
      });
  };

  return (
    <div className="card">
      <div className="card__info">
        <h2 className="card__name">{data.name}</h2>
        {!isAdmin ? (
          <div className="card__user-info">
            <div>
              <span className="card__type">Tipo: {data.type}</span>
            </div>
            <label>Tags: </label>
            {data.tags.length > 0 ? (
              data.tags.map((tag, index) => (
                <div key={index}>
                  <span className="card__tags">{tag}</span>
                </div>
              ))
            ) : (
              <a className="card__tags">No hay tags</a>
            )}
          </div>
        ) : (
          <div className="card__admin-info">
            <span className="card__email">{data.email}</span>
            <span className="card__status">{data.status}</span>
          </div>
        )}
      </div>
      <div className="card__buttons">
        <Button onClick={() => handleView(data.type)} icon="view" />
        <Button onClick={handleDelete} icon="delete" />
      </div>

      {userPopup && (
        <UserPopup data={data} onClose={onClosePopup}  onSucess={handleAcceptSuccess} token={token} />
      )}
      {promtCompletionsPopup && (
        <PromtCompletionsPopup
          data={data}
          onClose={onClosePopup}
          onSucess={handleAcceptSuccess}
          token={token}
        />
      )}
      {promtEditPopup && (
        <PromtEditPopup
          data={data}
          onClose={onClosePopup}
          onSucess={handleAcceptSuccess}
          token={token}
        />
      )}
      {promtImagesPopup && (
        <PromtImagePopup
          data={data}
          onClose={onClosePopup}
          onSucess={handleAcceptSuccess}
          token={token}
        />
      )}

      {success && (
        <SuccessMessage
          message={"Eliminación exitosa"}
          onAccept={handleAcceptSuccess}
        />
      )}
      {error && (
        <ErrorMessage message={errorMessage} onAccept={handleAcceptError} />
      )}
    </div>
  );
};

export default Card;
