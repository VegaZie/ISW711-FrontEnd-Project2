import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";

import Button from "../button/button";
import ErrorMessage from "../../components/error/errorMessage";
import SuccessMessage from "../../components/successMessage/successMessage";

import "./promtCreatePromtPopup.scss";
import "./tags.css";

const PromtCreatePopup = ({ onClose, onSucess, id, token }) => {
  const [type, setType] = useState("edit");
  const [name, setName] = useState("");
  const [promt, setPromt] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [instruction, setInstruction] = useState("");
  const [temperature, setTemperature] = useState(1);
  const [imageSize, setImageSize] = useState("256x256");
  const [imageCount, setImageCount] = useState(1);
  const [tags, setTags] = useState([]);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleCreate = () => {
    // Lógica para crear el promt
    if (type === "edit") {
      const data = {
        name: name,
        input: inputValue,
        instruction: instruction,
        userID: id,
        type: "edit",
        model: "text-davinci-edit-001",
        tags: tags,
        response: "",
      };

      axios
        .post(process.env.REACT_APP_PROMTS, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSuccess(true);
        })
        .catch((errorM) => {
          console.log(errorM);
          setErrorMessage("Registro de promt fallido.");
          setError(true);
        });
    } else if (type === "completions") {
      const data = {
        name: name,
        promt: promt,
        temperature: temperature,
        userID: id,
        type: "completions",
        model: "text-davinci-003",
        tags: tags,
        response: "",
      };

      axios
        .post(process.env.REACT_APP_PROMTS, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSuccess(true);
        })
        .catch((errorM) => {
          console.log(errorM);
          setErrorMessage("Registro de promt fallido.");
          setError(true);
        });
    } else if (type === "images") {
      const data = {
        name: name,
        promt: promt,
        quantity: parseInt(imageCount),
        size: imageSize,
        userID: id,
        type: "images",
        tags: tags,
        imageresponse: "",
      };

      axios
        .post(process.env.REACT_APP_PROMTS, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSuccess(true);
        })
        .catch((errorM) => {
          console.log(errorM);
          setErrorMessage("Registro de promt fallido.");
          setError(true);
        });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleAcceptError = () => {
    setError(false);
  };

  const handleAcceptSuccess = () => {
    setSuccess(false);
    onSucess();
    onClose();
  };

  const renderInputsByType = () => {
    switch (type) {
      case "edit":
        return (
          <>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Entrada"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <textarea
              placeholder="Instrucción"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
          </>
        );
      case "completions":
        return (
          <>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Promt"
              value={promt}
              onChange={(e) => setPromt(e.target.value)}
            />
            <label>Temperature</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="2"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </>
        );
      case "images":
        return (
          <>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Promt"
              value={promt}
              onChange={(e) => setPromt(e.target.value)}
            />
            <label>Tamaño</label>
            <select
              value={imageSize}
              onChange={(e) => setImageSize(e.target.value)}
            >
              <option value="256x256">256x256</option>
              <option value="512x512">512x512</option>
              <option value="1024x1024">1024x1024</option>
            </select>
            <label>Número de imágenes</label>
            <input
              type="number"
              min="1"
              max="10"
              value={imageCount}
              onChange={(e) => setImageCount(e.target.value)}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="promt-create-popup">
      <div className="promt-create-popup__content">
        <h2>Crear Promt</h2>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="edit">Edit</option>
          <option value="completions">Completions</option>
          <option value="images">Images</option>
        </select>
        {renderInputsByType()}
        <label>Tags</label>
        <div className="react-tag-input">
          <TagsInput
            value={tags}
            onChange={setTags}
            name="tags"
            placeHolder="Agrega tags"
          />
        </div>
        <div>
          <Button onClick={handleCreate}>Crear</Button>
          <Button onClick={handleCancel}>Cancelar</Button>
        </div>
      </div>
      {success && (
        <SuccessMessage
          message={"Registro del promt exitoso"}
          onAccept={handleAcceptSuccess}
        />
      )}
      {error && (
        <ErrorMessage message={errorMessage} onAccept={handleAcceptError} />
      )}
    </div>
  );
};

export default PromtCreatePopup;
