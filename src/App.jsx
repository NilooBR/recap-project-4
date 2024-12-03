import { initialThemes } from "./lib/themes";
import Color from "./Components/Color/Color";
import "./App.css";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import ColorForm from "./Components/ColorForm/ColorForm";

function App() {
  
  // Manage colors state using local storage
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });

  const [selectedThemeId, setSelectedThemeId] = useLocalStorageState(
    "selectedThemeId",
    {
      defaultValue: "t1",// Default to the first theme
    }
  );

  // Handle editing an existing color
  function handleEditColor(colorId, updatedColor) {
    const updatedThemes = themes.map((theme) =>
      theme.id === selectedThemeId
        ? {
            ...theme,
            colors: theme.colors.map((color) =>
              color.id === colorId ? { ...color, ...updatedColor } : color
            ),
          }
        : theme
    );
    setThemes(updatedThemes);
  }

  const currentTheme = themes.find((theme) => theme.id === selectedThemeId);

  // Handle theme creation
  const [newThemeName, setNewThemeName] = useLocalStorageState(
    "setNewThemeName",
    {
      defaultValue: "",
    }
  );

  // Updated handleAddTheme function
  function handleAddTheme() {
    if (newThemeName.trim() === "") {
      // Prevent adding empty themes
      alert("Theme name cannot be empty!");
      return;
    }
    const newTheme = {
      id: uid(),
      name: newThemeName.trim(),
      colors: [],
    };
    setThemes([...themes, newTheme]);
  }

  // Handle theme deletion
  function handleDeleteTheme(themeId) {
    if (themeId === "t1") {
      alert("You cannot delete the Default Theme!");
      return;
    }
    setThemes(themes.filter((theme) => theme.id !== themeId));
    if (selectedThemeId === themeId) {
      // Switch back to Default Theme if the selected one is deleted
      setSelectedThemeId("t1");
    }
  }

  // Handle theme editing
  function handleEditTheme(themeId, updatedName) {
    const updatedThemes = themes.map((theme) =>
      theme.id === themeId ? { ...theme, name: updatedName } : theme
    );
    setThemes(updatedThemes);
  }

  // Handle adding a color to the selected theme
  function handleAddColorToTheme(newColor) {
    const updatedThemes = themes.map((theme) =>
      theme.id === selectedThemeId
        ? { ...theme, colors: [...theme.colors, { id: uid(), ...newColor }] }
        : theme
    );
    setThemes(updatedThemes);
  }

  // Handle deleting a color
  function handleDeleteColor(colorId) {
    const updatedThemes = themes.map((theme) =>
      theme.id === selectedThemeId
        ? {
            ...theme,
            colors: theme.colors.filter((color) => color.id !== colorId),
          }
        : theme
    );
    setThemes(updatedThemes);
  }

  return (
    <div className="app">
      <h1>Theme Creator</h1>

      {/* Dropdown to switch between themes */}
      <div className="theme-selector">
        <select
          value={selectedThemeId}
          onChange={(e) => setSelectedThemeId(e.target.value)}>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter theme name"
          value={newThemeName}
          onChange={(e) => setNewThemeName(e.target.value)}
        />
        <button onClick={handleAddTheme}>🟢 ADD THEME</button>
      </div>

      {/* Manage themes */}
      <div className="theme-management">
        {themes.map((theme) => (
          <div key={theme.id} className="theme-card">
            <h3>{theme.name}</h3>
            {theme.id !== "t1" && (
              <>
                <button
                  onClick={() =>
                    handleEditTheme(
                      theme.id,
                      prompt("Enter a new name for the theme", theme.name)
                    )
                  }>
                  🟡 EDIT
                </button>
                <button onClick={() => handleDeleteTheme(theme.id)}>
                  🔴 DELETE
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* List of colors in the current theme */}
      <ColorForm onSubmitColor={handleAddColorToTheme} />
      <div>
        {currentTheme.colors.length === 0 ? (
          <h3 style={{textAlign: "center"}}>🎨 No colors in this theme. Add one!</h3>
        ) : (
          currentTheme.colors.map((color) => (
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
