import { useEffect, useState } from "react";

export default function ContrastCheckerAPI({ color }) {
  const [contrastValue, setContrastValue] = useState(null);

  useEffect(() => {
    async function fetchContrastCheckColor(){
      try {
        const response = await fetch(
          "https://www.aremycolorsaccessible.com/api/are-they",
          {
            method: "POST",
            body: JSON.stringify({ colors: [color.hex, color.contrastText] }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        setContrastValue(data);
      } catch (error) {
        console.error("API Error:", error.message);
      }
    }
    fetchContrastCheckColor();
  }, [color]);

  const getBackgroundColor = (overall) => {
    switch (overall) {
      case "Yup":
        return "lightgreen";
      case "Kinda":
        return "lightyellow";
      case "Nope":
        return "lightcoral";
      default:
        return "lightgray";
    }
  };

  return (
    <>
      {contrastValue ? (
        <p
          style={{
            backgroundColor: getBackgroundColor(contrastValue.overall),
            padding: "10px",
            borderRadius: "5px",
            color: "black",
          }}>
          Overall Contrast Score: {contrastValue.overall}
        </p>
      ) : (
        <p>⏳⏳⏳</p>
      )}
    </>
  );
}
