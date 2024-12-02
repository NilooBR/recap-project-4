import { useState } from "react";
import "./Color.css";

export default function Color({ color, onDelete }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  function handleDelete() {
    setIsConfirming(true);
  }

  function handleCancel() {
    setIsConfirming(false);
  }

  function confirmDelete() {
    setIsDeleted(true);
    onDelete(color.id);
  }

  if (isDeleted) {
    return null;
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>Contrast Text: {color.contrastText}</p>

      {isConfirming ? (
        <div className="color-card-highlight">
          <p>Really delete?</p>
          <button onClick={confirmDelete} className="delete-confirm-button">
            DELETE
          </button>
          <button onClick={handleCancel} className="delete-cancel-button">
            CANCEL
          </button>
        </div>
      ) : (
        <button onClick={handleDelete} className="color-card-delete-button">
          DELETE
        </button>
      )}
    </div>
  );
}