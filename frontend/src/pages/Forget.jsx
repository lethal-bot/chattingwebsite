import { useState } from "react";
import NewPassword from "@/components/custom/NewPassword";
import SendEmail from "@/components/custom/SendEmail";

function Forget() {
  const [verified, setVerified] = useState(false);
  function changeVerified() {
    setVerified(true);
  }
  return (
    <div className="container mt-24 mx-auto max-w-[500px] flex items-center justify-center flex-col">
      {!verified && <SendEmail changeVerified={changeVerified} />}
      {verified && <NewPassword />}
    </div>
  );
}

export default Forget;
