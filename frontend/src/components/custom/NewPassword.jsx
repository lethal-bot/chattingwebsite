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

//custom hooks
import usePasswordToggle from "@/customhooks/usePasswordToggle";

function NewPassword() {
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  return (
    <Card className="w-[100%]">
      <CardHeader className="pb-3">
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Enter new password for login</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <div className=" w-[100%] relative">
            <Input
              id="password"
              type={PasswordInputType}
              placeholder="enter a password"
              name="password"
              maxLength="30"
              className={"focus-visible:ring-1 focus-visible:ring-offset-0"}
            />
            <span className="absolute top-[33%] right-[5%] z-10 cursor-pointer">
              {ToggleIcon}
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Re-enter Password</Label>
          <div className=" w-[100%] relative">
            <Input
              id="password"
              type={PasswordInputType}
              placeholder="re-enter the password"
              name="password"
              maxLength="30"
              className={"focus-visible:ring-1 focus-visible:ring-offset-0"}
            />
            <span className="absolute top-[33%] right-[5%] z-10 cursor-pointer">
              {ToggleIcon}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className=" flex items-center justify-center  flex-col">
        <Button type="submit">Change</Button>
      </CardFooter>
    </Card>
  );
}

export default NewPassword;
