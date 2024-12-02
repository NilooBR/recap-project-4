import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm({
  onSubmitColor,
  initialData = { role: "Some color", hex: "#123456", contrastText: "#ffffff" },
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log('Form Data:', data); 
    onSubmitColor(data);
    event.target.reset();
    event.target.elements.role.focus();
  }

  return (
    <form className="color-form-container" onSubmit={handleSubmit}>
      <label htmlFor="role" className="color-form-label">
        Role
        <input
          id="role"
          name="role"
          type="text"
          defaultValue={initialData.role}
          required
        />
      </label>

      <label htmlFor="hex" className="color-form-label">
        Hex
        <ColorInput id="hex" defaultValue={initialData.hex} />
      </label>

      <label htmlFor="contrastText" className="color-form-label">
        Contrast Text
        <ColorInput id="contrastText" defaultValue={initialData.contrastText} />
      </label>

      <button type="submit" className="color-form-submit-button">
        Add Color
      </button>
    </form>
  );
}