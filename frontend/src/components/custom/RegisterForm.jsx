import React, { useState } from "react";
import {
  nameValidation,
  emailValidation,
  passwordValidation,
} from "../helpers/validators";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

//custom components
import Popup from "./Popup";
import Username from "./Username";

//custom hooks
import usePasswordToggle from "@/customhooks/usePasswordToggle";

//urls
import { register, sendOtp } from "@/lib/api";

function RegisterForm() {
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    nameError: "",
    emailError: "",
    passwordError: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  function handleChange(e, inputFieldName) {
    setError("");
    if (inputFieldName == "name") {
      const value = e.target.value.trim();

      const temp = nameValidation(value);
      if (temp)
        setInput((input) => ({ ...input, name: value, nameError: temp }));
      else setInput((input) => ({ ...input, name: value, nameError: "" }));
    }
    if (inputFieldName == "email") {
      const value = e.target.value.trim();
      if (value === "") {
        setInput((input) => ({ ...input, emailError: "" }));
        return;
      }

      const temp = emailValidation(value);
      if (temp)
        setInput((input) => ({ ...input, email: value, emailError: temp }));
      else setInput((input) => ({ ...input, email: value, emailError: "" }));
    }
    if (inputFieldName == "password") {
      const value = e.target.value.trim();
      if (value === "") {
        setInput((input) => ({ ...input, passwordError: "" }));
        return;
      }

      const temp = passwordValidation(value);
      if (temp)
        setInput((input) => ({
          ...input,
          password: value,
          passwordError: temp,
        }));
      else
        setInput((input) => ({ ...input, password: value, passwordError: "" }));
    }
  }

  // function handleUsernameChange(value) {
  //   setInput((input) => ({ ...input, username: value }));
  // }

  async function sendingOtp(email) {
    try {
      const res = await fetch(sendOtp + "/" + email);
      if (!res.ok) return false;
      return true;
    } catch (error) {
      return false;
    }
  }

  const handleSubmit = async (e) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    if (
      input.nameError ||
      input.passwordError ||
      input.emailError ||
      !input.name ||
      !input.password ||
      !input.email
    ) {
      setError("invalid input");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(register, {
        method: "POST",
        body: JSON.stringify({
          name: input.name,
          email: input.email,
          password: input.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (!res.ok) throw new Error("already registered");
      const result = await res.json();
      console.log(result);
      const otpSent = sendingOtp(input.email);
      if (otpSent) {
        setOpen(true);
      } else setError("error occured");
    } catch (e) {
      setError(e.message);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Register</CardTitle>
        <CardDescription>New to this platform? Register here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            pattern="[A-Za-z\s]+"
            placeholder="Aditya Keshari"
            autoComplete="off"
            name="name"
            maxLength="30"
            // value={input.name}
            onChange={(e) => handleChange(e, "name")}
            className={"focus-visible:ring-1 focus-visible:ring-offset-0"}
          />
          {input.nameError && <p className="error">{input.nameError}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="aditya@gmail.com"
            autoComplete="off"
            name="email"
            maxLength="50"
            // value={input.email}
            onChange={(e) => handleChange(e, "email")}
            className={"focus-visible:ring-1 focus-visible:ring-offset-0"}
          />
          {input.emailError && <p className="error">{input.emailError}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <div className=" w-[100%] relative">
            <Input
              id="password"
              type={PasswordInputType}
              placeholder="enter a password"
              name="password"
              maxLength="30"
              onChange={(e) => handleChange(e, "password")}
              className={"focus-visible:ring-1 focus-visible:ring-offset-0"}
            />
            <span className="absolute top-[33%] right-[5%] z-10 cursor-pointer">
              {ToggleIcon}
            </span>
          </div>
          {input.passwordError && (
            <p className="error">{input.passwordError}</p>
          )}
        </div>

        {/* <Username setChange={handleUsernameChange} /> */}
      </CardContent>
      <CardFooter className=" flex items-center justify-center flex-col pb-5">
        {!loading && (
          <Button type="button" onClick={handleSubmit}>
            Send OTP
          </Button>
        )}
        {loading && (
          <Button type="button" disabled>
            Sending...
          </Button>
        )}
        {error && <p className="error">{error}</p>}
        <Popup open={open} handleClose={handleClose} email={input.email} />
        {/* <Popup open={true} handleClose={handleClose} /> */}
      </CardFooter>
    </Card>
  );
}

export default RegisterForm;
