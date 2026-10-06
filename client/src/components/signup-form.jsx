// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Eye, EyeOff, Loader2 } from "lucide-react";

// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useRegisterUserMutation } from "@/features/api/authApi";

// export function SignupForm({
//   signupInput,
//   setSignupInput,
//   setIsLogin,
//   ...props
// }) {
//   const navigate = useNavigate();

//   const [
//     registerUser,
//     { data: registerData, error: registerError, isLoading, isSuccess },
//   ] = useRegisterUserMutation();

//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");

//   const [passwordTouched, setPasswordTouched] = useState(false);
//   const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

//   // Show / Hide password
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [isLoading, setIsLoading] = useState(false);

//   const changeInputHandler = (e) => {
//     const { name, value } = e.target;

//     setSignupInput({
//       ...signupInput,
//       [name]: value,
//     });
//   };

//   const handleRegisteration = async (e) => {
//     e.preventDefault();

//     const action = registerUser;
//     await action(signupInput);

//     // try {
//     //   if (
//     //     signupInput.password.length < 8 ||
//     //     signupInput.password !== signupInput.confirmPassword
//     //   ) {
//     //     toast.error("Passwords do not match.");
//     //     return;
//     //   }

//     //   setIsLoading(true);

//     //   const response = await axios.post(
//     //     "http://localhost:8000/api/users/register",
//     //     signupInput,
//     //     {
//     //       withCredentials: true,
//     //     },
//     //   );

//     //   console.log(response.data);

//     //   setSignupInput({
//     //     name: "",
//     //     email: "",
//     //     password: "",
//     //     confirmPassword: "",
//     //   });

//     //   setPasswordTouched(false);
//     //   setConfirmPasswordTouched(false);
//     //   setPasswordError("");
//     //   setConfirmPasswordError("");

//     //   // Go to login, because we want to generate token of the new user
//     //   toast.success("Account created successfully. Please log in to continue.");
//     //   setIsLogin(true);
//     // } catch (error) {
//     //   if (error.response?.status === 400) {
//     //     toast.error("Email already exists. Please login.");
//     //   } else {
//     //     toast.error("Something went wrong. Please try again.");
//     //   }
//     // } finally {
//     //   setIsLoading(false);
//     // }
//   };

//   useEffect(() => {
//     if (!passwordTouched) return;

//     const timer = setTimeout(() => {
//       if (signupInput.password.length > 0 && signupInput.password.length < 8) {
//         setPasswordError("Password must be at least 8 characters.");
//       } else {
//         setPasswordError("");
//       }
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [signupInput.password, passwordTouched]);

//   useEffect(() => {
//     if (!confirmPasswordTouched) return;

//     const timer = setTimeout(() => {
//       if (
//         signupInput.confirmPassword.length > 0 &&
//         signupInput.password !== signupInput.confirmPassword
//       ) {
//         setConfirmPasswordError("Passwords do not match.");
//       } else {
//         setConfirmPasswordError("");
//       }
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [
//     signupInput.password,
//     signupInput.confirmPassword,
//     confirmPasswordTouched,
//   ]);

//   const isPasswordValid =
//     signupInput.password.length >= 8 &&
//     signupInput.password === signupInput.confirmPassword;

//   return (
//     <Card {...props}>
//       <CardHeader>
//         <CardTitle>Create an account</CardTitle>
//       </CardHeader>

//       <CardContent>
//         <form onSubmit={handleRegisteration}>
//           <FieldGroup>
//             {/* Full Name */}
//             <Field>
//               <FieldLabel htmlFor="name">Full Name</FieldLabel>

//               <Input
//                 id="name"
//                 name="name"
//                 value={signupInput.name}
//                 onChange={(e) => changeInputHandler(e)}
//                 type="text"
//                 placeholder="John Doe"
//                 required
//               />
//             </Field>

//             {/* Email */}
//             <Field>
//               <FieldLabel htmlFor="email">Email</FieldLabel>

//               <Input
//                 id="email"
//                 name="email"
//                 value={signupInput.email}
//                 onChange={(e) => changeInputHandler(e)}
//                 type="email"
//                 placeholder="m@example.com"
//                 required
//               />
//             </Field>

//             {/* Password */}
//             <Field data-invalid={!!passwordError}>
//               <FieldLabel htmlFor="password">Password</FieldLabel>

//               <div className="relative">
//                 <Input
//                   id="password"
//                   name="password"
//                   value={signupInput.password}
//                   onChange={(e) => changeInputHandler(e)}
//                   onBlur={() => setPasswordTouched(true)}
//                   type={showPassword ? "text" : "password"}
//                   aria-invalid={!!passwordError}
//                   className="pr-10"
//                   required
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-0 top-0 flex h-full items-center px-3 text-muted-foreground hover:text-foreground"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </button>
//               </div>

//               {passwordError ? (
//                 <FieldError>{passwordError}</FieldError>
//               ) : (
//                 <FieldDescription>
//                   Must be at least 8 characters long.
//                 </FieldDescription>
//               )}
//             </Field>

//             {/* Confirm Password */}
//             <Field data-invalid={!!confirmPasswordError}>
//               <FieldLabel htmlFor="confirm-password">
//                 Confirm Password
//               </FieldLabel>

//               <div className="relative">
//                 <Input
//                   id="confirm-password"
//                   name="confirmPassword"
//                   value={signupInput.confirmPassword}
//                   onChange={(e) => changeInputHandler(e)}
//                   onBlur={() => setConfirmPasswordTouched(true)}
//                   type={showConfirmPassword ? "text" : "password"}
//                   aria-invalid={!!confirmPasswordError}
//                   className="pr-10"
//                   required
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-0 top-0 flex h-full items-center px-3 text-muted-foreground hover:text-foreground"
//                   aria-label={
//                     showConfirmPassword
//                       ? "Hide confirm password"
//                       : "Show confirm password"
//                   }
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </button>
//               </div>

//               {confirmPasswordError ? (
//                 <FieldError>{confirmPasswordError}</FieldError>
//               ) : (
//                 <FieldDescription>
//                   Please confirm your password.
//                 </FieldDescription>
//               )}
//             </Field>

//             {/* Buttons */}
//             <FieldGroup>
//               <Field>
//                 <Button disabled={isLoading || !isPasswordValid} type="submit">
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
//                       Wait...
//                     </>
//                   ) : (
//                     "Signup"
//                   )}
//                 </Button>

//                 <FieldDescription className="px-6 text-center">
//                   Already have an account?{" "}
//                   <button
//                     onClick={() => navigate("/login")}
//                     className="cursor-pointer underline text-[#000000]"
//                   >
//                     Login
//                   </button>
//                 </FieldDescription>
//               </Field>
//             </FieldGroup>
//           </FieldGroup>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }










































import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "@/features/api/authApi";

export function SignupForm({
  signupInput,
  setSignupInput,
  setIsLogin,
  ...props
}) {
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input changes
  const changeInputHandler = (e) => {
    const { name, value } = e.target;

    setSignupInput({
      ...signupInput,
      [name]: value,
    });
  };

  // Register user
  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      // Call RTK Query mutation
      await registerUser(signupInput).unwrap();

      // Reset form
      setSignupInput({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setPasswordTouched(false);
      setConfirmPasswordTouched(false);
      setPasswordError("");
      setConfirmPasswordError("");

      // Show success message
      toast.success(
        "Account created successfully. Please log in to continue."
      );

      // Go to login
      setIsLogin(true);
    } catch (error) {
      // Handle API error
      const message =
        error?.data?.message ||
        error?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again.";

      toast.error(message);
    }
  };

  // Validate password
  useEffect(() => {
    if (!passwordTouched) return;

    const timer = setTimeout(() => {
      if (
        signupInput.password.length > 0 &&
        signupInput.password.length < 8
      ) {
        setPasswordError("Password must be at least 8 characters.");
      } else {
        setPasswordError("");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [signupInput.password, passwordTouched]);

  // Validate confirm password
  useEffect(() => {
    if (!confirmPasswordTouched) return;

    const timer = setTimeout(() => {
      if (
        signupInput.confirmPassword.length > 0 &&
        signupInput.password !== signupInput.confirmPassword
      ) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError("");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    signupInput.password,
    signupInput.confirmPassword,
    confirmPasswordTouched,
  ]);

  const isPasswordValid =
    signupInput.password.length >= 8 &&
    signupInput.password === signupInput.confirmPassword;

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleRegistration}>
          <FieldGroup>
            {/* Full Name */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>

              <Input
                id="name"
                name="name"
                value={signupInput.name}
                onChange={changeInputHandler}
                type="text"
                placeholder="John Doe"
                required
              />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                id="email"
                name="email"
                value={signupInput.email}
                onChange={changeInputHandler}
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>

            {/* Password */}
            <Field data-invalid={!!passwordError}>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  value={signupInput.password}
                  onChange={changeInputHandler}
                  onBlur={() => setPasswordTouched(true)}
                  type={showPassword ? "text" : "password"}
                  aria-invalid={!!passwordError}
                  className="pr-10"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 flex h-full items-center px-3 text-muted-foreground hover:text-foreground"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {passwordError ? (
                <FieldError>{passwordError}</FieldError>
              ) : (
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              )}
            </Field>

            {/* Confirm Password */}
            <Field data-invalid={!!confirmPasswordError}>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>

              <div className="relative">
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  value={signupInput.confirmPassword}
                  onChange={changeInputHandler}
                  onBlur={() => setConfirmPasswordTouched(true)}
                  type={showConfirmPassword ? "text" : "password"}
                  aria-invalid={!!confirmPasswordError}
                  className="pr-10"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-0 top-0 flex h-full items-center px-3 text-muted-foreground hover:text-foreground"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {confirmPasswordError ? (
                <FieldError>{confirmPasswordError}</FieldError>
              ) : (
                <FieldDescription>
                  Please confirm your password.
                </FieldDescription>
              )}
            </Field>

            {/* Buttons */}
            <FieldGroup>
              <Field>
                <Button
                  disabled={isLoading || !isPasswordValid}
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please Wait...
                    </>
                  ) : (
                    "Signup"
                  )}
                </Button>

                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="cursor-pointer underline text-[#000000]"
                  >
                    Login
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}