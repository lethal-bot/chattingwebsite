import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function usePasswordToggle() {
  const [visible, setVisibility] = useState(false);
  const Icon = !visible ? (
    <FaRegEye onClick={() => setVisibility(true)} />
  ) : (
    <FaRegEyeSlash onClick={() => setVisibility(false)} />
  );
  const InputType = visible ? "text" : "password";
  return [InputType, Icon];
}

export default usePasswordToggle;
