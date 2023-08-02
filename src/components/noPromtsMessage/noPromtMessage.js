import React from "react";
import "./noPromptsMessage.scss";

const noPromptsMessage = () => {
  return (
    <div className="no-prompts-message">
      <h2>No tienes promts registrados</h2>
      <p>Por favor, agrega nuevos promts para empezar</p>
    </div>
  );
};

export default noPromptsMessage;
