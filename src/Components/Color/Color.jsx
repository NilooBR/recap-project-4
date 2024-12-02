import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";
import "./Color.css";

export default function Color({ color, onDelete, onEditColor }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  function handleSubmitColor(updatedColor) {
    onEditColor(color.id, updatedColor);
    setIsEditing(false);
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
      {isEditing ? (
        <div className="color-card-edit">
          <ColorForm onSubmitColor={handleSubmitColor} initialData={color} buttonText="UPDATE COLOR"/>
          <button
            onClick={toggleEdit}
            className="color-card-cancel-button"
          >
            CANCEL
          </button>
        </div>
      ) : (
        <>
          <h3 className="color-card-headline">{color.hex}</h3>
          <h4>{color.role}</h4>
          <p>Contrast Text: {color.contrastText}</p>
          
          <button onClick={toggleEdit} className="color-card-edit-button">
            EDIT
          </button>
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
        </>
      )}
    </div>
  );
}