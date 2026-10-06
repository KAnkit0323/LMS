import { SignupForm } from "@/components/signup-form"
import { useState } from "react";


export default function Signup( {setIsLogin} ) {

    const [signupInput, setSignupInput] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4 py-4 mt-16">
      <div className="w-full max-w-sm">
        <SignupForm setIsLogin={setIsLogin} signupInput={signupInput} setSignupInput={setSignupInput} />
      </div>
    </div>
  )
}