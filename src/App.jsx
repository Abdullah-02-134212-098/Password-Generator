import { useState, useCallback, useEffect } from "react";
import "./App.css";   

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);

  // Function to generate password
  const generatePassword = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeCharacters) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(newPassword);
  }, [length, includeNumbers, includeCharacters]);

  // Auto-generate password when options change
  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeCharacters, generatePassword]);

  // Copy password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>

      {/* Input & Copy Button */}
      <div className="nav1">
        <input type="text" value={password} readOnly placeholder="Generated Password" />
        <button onClick={copyToClipboard}>Copy</button>
      </div>

      {/* Slider for Length */}
      <div className="nav2">
        <input 
          type="range" 
          id="slider" 
          min="6" 
          max="20" 
          value={length} 
          onChange={(e) => setLength(e.target.value)} 
        />
        <label htmlFor="slider">Length: {length}</label>
      </div>

      {/* Checkbox Options */}
      <div className="nav3">
        <div>
          <input 
            type="checkbox" 
            id="Numbers" 
            checked={includeNumbers} 
            onChange={() => setIncludeNumbers(!includeNumbers)} 
          />
          <label htmlFor="Numbers">Numbers</label>
        </div>

        <div>
          <input 
            type="checkbox" 
            id="Characters" 
            checked={includeCharacters} 
            onChange={() => setIncludeCharacters(!includeCharacters)} 
          />
          <label htmlFor="Characters">Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
