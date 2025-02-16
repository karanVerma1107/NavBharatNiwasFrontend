import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignaturePad = ({ onSaveSignature }) => {
  const signatureRef = useRef(null);

  const clearSignature = () => {
    signatureRef.current.clear();
  };

  const saveSignature = () => {
    const signatureData = signatureRef.current.toDataURL(); // Converts the signature to a base64 string
    onSaveSignature(signatureData);
  };

  return (
    <div className="signature-pad-container">
      <SignatureCanvas
        ref={signatureRef}
        backgroundColor="white"
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: "signature-canvas" }}
      />
      <div>
        <button onClick={saveSignature}>Save Signature</button>
        <button onClick={clearSignature}>Clear</button>
      </div>
    </div>
  );
};

export default SignaturePad;
