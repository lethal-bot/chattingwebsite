import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { userNameValidation } from "../helpers/validators";
function Username({ setChange }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (username === "") {
      setChange("");
      setError("");
      return;
    }

    const invalidUserName = userNameValidation(username);
    if (invalidUserName) {
      setChange("");
      setError(invalidUserName);
      return;
    }
    setError("");
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        setChange("");
        // Simulate async operation
        await delay(800);
        // Here you can add the logic to validate the username
        setLoading(false);
        setChange(username);
        setError("");
      } catch (e) {
        setLoading(false);
        setError("");
        setChange("");
      }
    }, 800);

    setTimeoutId(newTimeoutId);

    return () => {
      clearTimeout(newTimeoutId);
    };
  }, [username]);

  function changeHandler(e) {
    setUsername(e.target.value.trim());
  }

  return (
    <div className="space-y-1">
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        type="text"
        placeholder="enter unique username "
        autoComplete="off"
        name="username"
        className={"focus-visible:ring-1 focus-visible:ring-offset-0"}
        maxLength="30"
        onChange={(e) => changeHandler(e)}
      />
      {loading && <p className="text-slate-400 text-sm p-0">checkingg..</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Username;
