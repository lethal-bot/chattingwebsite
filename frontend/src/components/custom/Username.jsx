import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { userNameValidation } from "../helpers/validators";
import { validUsername } from "@/lib/api";
function Username({ setChange }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (username === "") {
      setChange("");
      setError("");
      setLoading(false);
      return;
    }

    const invalidUserName = userNameValidation(username);
    if (invalidUserName) {
      setChange("");
      setError(invalidUserName);
      setLoading(false);
      return;
    }
    setError("");
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(async () => {
      try {
        setChange("");
        // Simulate async operation
        const res = await fetch(validUsername + "/" + username);
        if (!res.ok) throw new Error("username already taken");
        setLoading(false);
        setChange(username);
        setError("");
      } catch (e) {
        setLoading(false);
        setError(e.message);
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
        spellCheck="false"
        name="username"
        className={"focus-visible:ring-1 focus-visible:ring-offset-0"}
        maxLength="30"
        onChange={(e) => changeHandler(e)}
      />
      {loading && <p className="text-slate-400 text-sm p-0">checkingg..</p>}
      {error && <p className="error">{error}</p>}
      {username && !loading && !error && (
        <p className="valid">valid username ✅</p>
      )}
    </div>
  );
}

export default Username;
