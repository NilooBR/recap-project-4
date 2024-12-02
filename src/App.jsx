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

  return (
    <div className="app">
      <h1>Theme Creator</h1>

      {/* Form to add a new color */}
      <ColorForm onSubmitColor={handleSubmitColor} />

      {/* Display the list of colors */}
      <div className="color-container">
        {colors.map((color) => (
          <Color key={color.id} color={color} />
        ))}
      </div>
    </div>
  );
}

export default App;