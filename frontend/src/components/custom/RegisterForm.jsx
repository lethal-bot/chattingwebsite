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
import Popup from "./Popup";
import Username from "./Username";

function RegisterForm() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    username: "",
  });
  function handleChange(e, inputFieldName) {
    if (inputFieldName == "name") {
      const value = e.target.value.trim();
      console.log(value);
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
      console.log(value);
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
      console.log(value);
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

  function handleUsernameChange(value) {
    setInput((input) => ({ ...input, username: value }));
  }
  const handleClick = async (e) => {
    e.preventDefault();
    setOpen(true);
    console.log(open);
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
          <Input
            id="password"
            type="password"
            placeholder="enter a password"
            name="password"
            maxLength="40"
            // value={input.password}
            onChange={(e) => handleChange(e, "password")}
            className={"focus-visible:ring-1 focus-visible:ring-offset-0"}
          />
          {input.passwordError && (
            <p className="error">{input.passwordError}</p>
          )}
        </div>
        <Username setChange={handleUsernameChange} />
      </CardContent>
      <CardFooter className=" flex items-center justify-center pb-5">
        <Button type="button">Send OTP</Button>
        <Popup open={open} handleClose={handleClose} />
      </CardFooter>
    </Card>
  );
}

export default RegisterForm;
