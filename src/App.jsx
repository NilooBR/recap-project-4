import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import ColorForm from "./Components/ColorForm/ColorForm";

function App() {
  // Manage colors state using local storage
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  // Handle adding a new color
  function handleSubmitColor(newColor) {
    setColors([{ id: uid(), ...newColor }, ...colors]);
    console.log("Colors", colors);
  }

  // Handle deleting a color
  function handleDeleteColor(colorId) {
    const updatedColors = colors.filter((color) => color.id !== colorId);
    setColors(updatedColors);
  }

  // Handle editing an existing color
  function handleEditColor(colorId, updatedColor) {
    const updatedColors = colors.map((color) =>
      color.id === colorId ? { ...color, ...updatedColor } : color
    );
    setColors(updatedColors);
  }

  return (
    <div className="app">
      <h1>Theme Creator</h1>

      {/* Form to add a new color */}
      <ColorForm onSubmitColor={handleSubmitColor} />

      {/* Display the list of colors or a message if no colors */}
      <div className="color-container">
        {colors.length === 0 ? (
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#FF6347",
              textAlign: "center",
              padding: "20px",
              borderRadius: "8px",
            }}>
            No colors... start by adding one!
          </p> // Display message if no colors
        ) : (
          colors.map((color) => (
            <Color
              key={color.id}
              color={color}
              onDelete={handleDeleteColor}
              onEditColor={handleEditColor}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
