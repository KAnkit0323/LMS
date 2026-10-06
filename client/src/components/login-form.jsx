// import { useState } from "react";
// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";

// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { userLoggedIn } from "@/features/authSlice";

// import { useNavigate } from "react-router-dom";
// import { useLoginUserMutation } from "@/features/api/authApi";

// export function LoginForm({ loginInput, setLoginInput, className, ...props }) {

//   const navigate = useNavigate();

//   const [
//     loginUser,
//     { data: loginData, error: loginError, isLoading, isSuccess },
//   ] = useLoginUserMutation();

//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // changed -> what is the usecase?
//   const dispatch = useDispatch();

//   const changeInputHandler = (e) => {
//     const { name, value } = e.target;

//     setLoginInput({
//       ...loginInput,
//       [name]: value,
//     });
//   };

//   // changed
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const action = loginUser;
//     await action(loginInput);

//     // try {
//     //   setIsLoading(true);

//     //   const response = await axios.post(
//     //     "http://localhost:8000/api/users/login",
//     //     loginInput, //we're sending the data to the backend
//     //     {
//     //       withCredentials: true,
//     //       // it means Allow Axios to send and receive cookies when making the request.
//     //     },
//     //   );

//     //   dispatch(userLoggedIn(response.data.user));
//     //   navigate("/");

//     //   console.log(response.data);
//     // } catch (error) {
//     //   console.log(error);
//     // } finally {
//     //   setIsLoading(false);
//     // }
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card>
//         <CardHeader>
//           <CardTitle>Login to your account</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <FieldGroup>
//               <Field>
//                 <FieldLabel htmlFor="email">Email</FieldLabel>

//                 <Input
//                   name="email"
//                   value={loginInput.email}
//                   onChange={changeInputHandler}
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   required
//                 />
//               </Field>

//               <Field>
//                 <div className="flex items-center">
//                   <FieldLabel htmlFor="password">Password</FieldLabel>

//                   <a
//                     href="#"
//                     className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                   >
//                     Forgot your password?
//                   </a>
//                 </div>

//                 <div className="relative">
//                   <Input
//                     name="password"
//                     value={loginInput.password}
//                     onChange={changeInputHandler}
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     className="pr-10"
//                     required
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-0 top-0 flex h-full items-center px-3 text-muted-foreground hover:text-foreground"
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//               </Field>

//               <Field>
//                 <Button disabled={isLoading} type="submit">
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Please Wait...
//                     </>
//                   ) : (
//                     "Login"
//                   )}
//                 </Button>

//                 <FieldDescription className="text-center">
//                   Don&apos;t have an account?{" "}
//                   <button
//                     onClick={() => navigate("/signup")}
//                     className="cursor-pointer underline text-[#000000]"
//                   >
//                     Signup
//                   </button>
//                 </FieldDescription>
//               </Field>
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }





































import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/features/api/authApi";

export function LoginForm({
  loginInput,
  setLoginInput,
  className,
  ...props
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // RTK Query login mutation
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const changeInputHandler = (e) => {
    const { name, value } = e.target;

    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit clicked");
    try {
      // Call login API
      const response = await loginUser(loginInput).unwrap();

      // Save user in Redux store
      dispatch(userLoggedIn(response.user));

      // Show success message
      toast.success("Login successful!");

      // Navigate to home
      navigate("/");
    } catch (error) {
      const message =
        error?.data?.message ||
        error?.data?.error ||
        error?.message ||
        "Invalid email or password.";

      toast.error(message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>

                <Input
                  name="email"
                  value={loginInput.email}
                  onChange={changeInputHandler}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>

                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </button>
                </div>

                <div className="relative">
                  <Input
                    name="password"
                    value={loginInput.password}
                    onChange={changeInputHandler}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 flex h-full items-center px-3 text-muted-foreground hover:text-foreground"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </Field>

              {/* Login button */}
              <Field>
                <Button disabled={isLoading} type="submit" onClick={() => console.log("BUTTON CLICKED")}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please Wait...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="cursor-pointer underline text-[#000000]"
                  >
                    Signup
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}