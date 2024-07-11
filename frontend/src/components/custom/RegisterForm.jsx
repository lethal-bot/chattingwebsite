import React, { useState } from "react";

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

function RegisterForm() {
  const [open, setOpen] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault();
    setOpen(true);
    console.log(open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <form onSubmit={handleClick}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Register</CardTitle>
          <CardDescription>
            New to this platform? Register here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Aditya Keshari"
              autoComplete="off"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="aditya@gmail.com"
              autoComplete="off"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="enter a password"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="enter available username "
              autoComplete="off"
            />
          </div>
        </CardContent>
        <CardFooter className=" flex items-center justify-center ">
          <Button type="submit">Send OTP</Button>
          <Popup open={open} handleClose={handleClose} />
        </CardFooter>
      </Card>
    </form>
  );
}

export default RegisterForm;
