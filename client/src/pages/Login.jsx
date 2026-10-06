import { LoginForm } from "@/components/login-form"
import { useState } from "react";


export default function Login( {setIsLogin} ) {

    const [loginInput, setLoginInput] = useState({
        email: "",
        password: "",
    });

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 mt-16">
      <div className="w-full max-w-sm">
        <LoginForm setIsLogin={setIsLogin} loginInput={loginInput} setLoginInput={setLoginInput} />
      </div>
    </div>
  )
}
