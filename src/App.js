import React, { useEffect, useState, useRef } from "react";
import mrz from "mrz";
import { createWorker } from "tesseract.js";

import UserInfo from "./components/UserInfo";
import useUserMedia from "./hooks/use-user-media";

import "./App.css";

function App() {
  const [image, setImage] = useState({ MRZ: "" });
  const [user, setUser] = useState({});
  const [ocr, setOcr] = useState("Recognizing...");
  const videoRef = useRef();

  const worker = createWorker();

  const mediaStream = useUserMedia({
    audio: false,
    video: { facingMode: "environment" },
  });

  useEffect(() => {
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage("spa");
    await worker.initialize("spa");

    if (image.MRZ) {
      const {
        data: { text },
      } = await worker.recognize(image.MRZ);
      console.log("text", text);

      const idMRZ = text.split("\n").filter((t) => t !== "");
      console.log("cedula", idMRZ);
      const parsedMRZ = mrz.parse(idMRZ);
      console.log("parsed", parsedMRZ);

      setUser(parsedMRZ.fields);
      setOcr("");
    }
  };

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      doOCR();
    }
  });

  return (
    <div className="App">
      <h2>Take a picture of the MRZ</h2>

      <video ref={videoRef} width="500" autoPlay />

      {image.MRZ ? <p>{ocr}</p> : <div />}

      <UserInfo />
    </div>
  );
}

export default App;
