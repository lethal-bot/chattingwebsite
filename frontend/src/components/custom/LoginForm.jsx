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

import { emailValidation, passwordValidation } from "../helpers/validators";
function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitHandler(e) {
    setLoading(true);
    setError("");
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const emailError = emailValidation(data.email);
    const passwordError = passwordValidation(data.password);
    console.log(data.email + " " + data.password);
    if (emailError || passwordError) {
      setError("invalid email/password");
    } else {
      try {
        setTimeout(() => setLoading(false), 1000);
      } catch (error) {}
      // setError("invalid email/password");

      //fetch logic
    }
  }

  return (
    <form onSubmit={submitHandler}>
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
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="enter password"
              name="password"
              maxLength="40"
              className={"focus-visible:ring-1 focus-visible:ring-offset-0"}
            />
          </div>
        </CardContent>
        <CardFooter className=" flex items-center justify-center  flex-col">
          {!loading && <Button type="submit">Login</Button>}
          {loading && <Button disabled>Loginggg</Button>}
          {error && <p className="error">{error}</p>}
          <Link to="/forget">
            <p className="text-sm pt-4">Forget Password?</p>
          </Link>
        </CardFooter>
      </Card>
    </form>
  );
}

export default LoginForm;
