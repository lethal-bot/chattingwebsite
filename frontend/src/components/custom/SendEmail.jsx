import React, { useState } from "react";
import { Link } from "react-router-dom";
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

import Popup from "@/components/custom/Popup";

function SendEmail() {
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
    <Card className="w-[100%]">
      <CardHeader className="pb-3">
        <CardTitle>Forget Password</CardTitle>
        <CardDescription>Enter your email to send otp</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="aditya@gmail.com"
            autoComplete="off"
            name="email"
            maxLength="50"
            className={"focus-visible:ring-1 focus-visible:ring-offset-0"}
          />
        </div>
      </CardContent>
      <CardFooter className=" flex items-center justify-center  flex-col">
        <Button type="submit" onClick={handleClick}>
          send Otp
        </Button>
        <Link className="pt-4 text-sm" to={"/register"}>
          Register/login
        </Link>
        <Popup open={open} handleClose={handleClose} />
      </CardFooter>
    </Card>
  );
}

export default SendEmail;
