import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import LoginForm from "@/components/custom/LoginForm";
import RegisterForm from "@/components/custom/RegisterForm";

function Register() {
  const [data, setData] = useState({});

  return (
    <div className="container mt-3 mx-auto max-w-[500px] flex items-center justify-center flex-col">
      <Tabs defaultValue="login" className="w-[100%] ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Register;
