import { loginFormControls } from "@/components/config";
import Form from "@/components/forms/Form";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Login successful");
      } else {
        console.log("Error logging in user:", data?.payload?.message);
        toast.error("Error logging in user: " + data?.payload?.message);
      }
    });
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in your account
        </h1>
        <p className="mt-2">
          Dont have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <Form
        formData={formData}
        setFormData={setFormData}
        buttonText={"Sign In"}
        formControls={loginFormControls}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
