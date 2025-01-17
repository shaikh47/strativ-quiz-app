import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Form, Input, message } from "antd";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootStateType } from "../../../store/rootStore";
import { login } from "../../../store/authentication/authSlice";
import { getHash } from "../../../utils/crypto";
import { EmailSchema } from "../../../domains/models/user";

type LoginProps = {
  loginClick: () => void;
};

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC<LoginProps> = ({ loginClick }) => {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const isAuthenticated = useSelector(
    (store: RootStateType) => store.auth.isAuthenticated
  );
  const authenticatedUser = useSelector(
    (store: RootStateType) => store.auth.user
  );

  const onFinish = async (values: FormValues) => {
    try {
      dispatch(
        login({ email: values.email.trim(), password: getHash(values.password.trim()) })
      );
    } catch (err) {
      message.error("Could not Login");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (isAuthenticated === true) {
    // check the user role here
    if (authenticatedUser?.role === "user")
      return <Navigate replace to="/take-quiz/history" />;
    else if (authenticatedUser?.role === "admin")
      return <Navigate replace to="/admin/view-user-responses" />;
    else <Navigate replace to="/auth" />;
  } else {
    return (
      <div className="flex flex-col items-center justify-center gap-5 rounded-lg shadow-2xl p-16">
        <p className="text-center mb-5 text-xl font-medium text-[#282860] opacity-90">
          Login to answer questions
        </p>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex flex-col gap-3"
        >
          <Form.Item
            className="m-0"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                validator: (_, value) =>
                  EmailSchema.safeParse(value).success
                    ? Promise.resolve()
                    : Promise.reject(new Error("Invalid Email format!")),
              },
            ]}
          >
            <Input
              className="input "
              placeholder="Email address"
            />
          </Form.Item>

          <Form.Item
            className="m-0"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              className=""
              placeholder="Password"
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined onClick={toggleVisibility} />
                ) : (
                  <EyeInvisibleOutlined onClick={toggleVisibility} />
                )
              }
            />
          </Form.Item>
          <button className="signup-button w-full rounded-lg bg-[#720455] py-1 text-md font-semibold leading-7 mt-8 text-white hover:bg-[#3c0753]">
            Login
          </button>
        </Form>

        <p className="login-prompt commonStyles mt-5 text-md text-[#8CABFF]">
          Don't have an account?{" "}
          <b>
            <a
              className="login-link cursor-pointer text-[#4477CE] hover:text-[#1760df]"
              onClick={loginClick}
            >
              Sign Up
            </a>
          </b>
        </p>
      </div>
    );
  }
};

export default Login;
