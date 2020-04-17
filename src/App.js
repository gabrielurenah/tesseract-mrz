import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import "./App.css";
import myId from "./mrz_2.jpg";
import mrz from "mrz";

function App() {
  const worker = createWorker();
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const {
      data: { text },
    } = await worker.recognize(myId);

    const cedula = text.split("\n").filter((t) => t !== "");
    console.log(cedula);
    const result = mrz.parse(cedula);

    console.log(result);
    setOcr(text);
  };

  const [ocr, setOcr] = useState("Recognizing...");
  useEffect(() => {
    doOCR();
  });

  return (
    <div className="App">
      <p>{ocr}</p>
    </div>
  );
}

export default App;
