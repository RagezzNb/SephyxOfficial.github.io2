import { useState, useEffect } from "react";
import { useLocation } from "wouter";

const SECRET_CODE = "2025streetwear";
const VAULT_UNLOCKED_KEY = "sephyx_vault_unlocked";

export function useVaultUnlock() {
  const [, setLocation] = useLocation();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");

  useEffect(() => {
    // Check if vault was previously unlocked
    const wasUnlocked = localStorage.getItem(VAULT_UNLOCKED_KEY) === "true";
    setIsUnlocked(wasUnlocked);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      // Build the input buffer
      const newBuffer = (inputBuffer + event.key).toLowerCase();
      setInputBuffer(newBuffer);

      // Check if the secret code is contained in the buffer
      if (newBuffer.includes(SECRET_CODE)) {
        // Vault unlocked!
        setIsUnlocked(true);
        localStorage.setItem(VAULT_UNLOCKED_KEY, "true");
        setInputBuffer(""); // Clear buffer
        
        // Navigate to vault with a slight delay for dramatic effect
        setTimeout(() => {
          setLocation("/vault");
        }, 500);
      }

      // Keep buffer manageable - only keep last 20 characters
      if (newBuffer.length > 20) {
        setInputBuffer(newBuffer.slice(-20));
      }
    };

    // Clear buffer after 3 seconds of inactivity
    const clearBufferTimeout = setTimeout(() => {
      setInputBuffer("");
    }, 3000);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(clearBufferTimeout);
    };
  }, [inputBuffer, setLocation]);

  return { isUnlocked };
}