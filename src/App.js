import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import "./App.css";
import mrz from "mrz";

function App() {
  const [image, setImage] = useState({ MRZ: "" });
  const [user, setUser] = useState({});
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

    if (image.MRZ) {
      const {
        data: { text },
      } = await worker.recognize(image.MRZ);

      const idMRZ = text.split("\n").filter((t) => t !== "");
      const parsedMRZ = mrz.parse(idMRZ);

      setUser(parsedMRZ.fields);
      setOcr("");
    }
  };

  const [ocr, setOcr] = useState("Recognizing...");

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      doOCR();
    }
  });

  //   documentCode: "ID"
  // documentNumber: "40226366199"
  // sex: "male"
  // lastName: "URENA HERNANDEZ"
  // firstName: "GABRIEL ARTUR"
  return (
    <div className="App">
      <h2>Take a picture of the MRZ</h2>
      <input type="file" accept="image/*" onChange={onChange} capture />
      {image.MRZ ? <p>{ocr}</p> : <div />}
      <span style={{ fontSize: 25, marginTop: 16 }}>User info</span>🔥
      <p>Cedula: {user.documentNumber}</p>
      <p>Name: {user.firstName}</p>
      <p>LastName: {user.lastName}</p>
    </div>
  );
}

export default App;
