import { useState, useEffect } from "react";

export default function CopyToClipboard({ hexCode }) {
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(hexCode);
      setConfirmationMessage("SUCCESSFULLY COPIED!");
    } catch (error) {
      setConfirmationMessage("FAILED TO COPY");
    }
  }

  useEffect(() => {
    if (confirmationMessage) {
      const timer = setTimeout(() => {
        setConfirmationMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [confirmationMessage]);

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide-copy"
        onClick={copyToClipboard}>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
}
