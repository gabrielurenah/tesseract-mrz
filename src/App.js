import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import "./App.css";
import mrz from "mrz";

function App() {
  const [image, setImage] = useState({ MRZ: "" });
  const worker = createWorker();

  const onChange = (event) => {
    setImage({
      MRZ: event.target.files[0],
    });
  };

  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage("spa");
    await worker.initialize("spa");

    const {
      data: { text },
    } = await worker.recognize(image.MRZ);

    const MRZ = text.split("\n").filter((t) => t !== "");
    console.log(MRZ);
    const parsedMRZ = mrz.parse(MRZ);

    console.log(parsedMRZ);
    setOcr(text);
  };

  const [ocr, setOcr] = useState("Recognizing...");
  useEffect(() => {
    doOCR();
  });

  return (
    <div className="App">
      <input type="file" accept="image/*" onChange={onChange} capture />
      {image.MRZ ? <p>{ocr}</p> : <div />}
    </div>
  );
}

export default App;
