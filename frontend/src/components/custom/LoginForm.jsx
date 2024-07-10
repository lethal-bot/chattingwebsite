import React from "react";
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
function LoginForm() {
  return (
    <form>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="aditya@gmail.com" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="enter password" />
          </div>
        </CardContent>
        <CardFooter className=" flex items-center justify-center  flex-col">
          <Button>Login</Button>
          <Link>
            <p className="text-sm pt-4">Forget Password?</p>
          </Link>
        </CardFooter>
      </Card>
    </form>
  );
}

export default LoginForm;
