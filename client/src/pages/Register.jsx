import { registerFormControls } from "@/components/config";
import Form from "@/components/forms/Form";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Registration successful!");
        navigate("/auth/login");
      } else {
        console.log("Error registering user:", data?.payload?.message);
        toast.error("Error registering user: " + data?.payload?.message);
        // variant:"destructive";
      }
    });
  };  
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create a new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <Form
        formData={formData}
        setFormData={setFormData}
        buttonText={"Sign Up"}
        formControls={registerFormControls}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
