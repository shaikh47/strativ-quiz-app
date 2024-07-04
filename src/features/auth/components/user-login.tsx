import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootStateType } from "../../../store/rootStore";
import { increment } from "../../../store/authentication/authSlice";

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
  const [loginStatus, setLoginStatus] = useState<string>("loggedout");
  const [response, setResponse] = useState<string>("");

  const counter = useSelector((store: RootStateType) => store.auth.counter);

  const onFinish = async (values: FormValues) => {
    console.log("response is: ", response, "input: ", values);
    // Handle login logic here
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onFormChange = () => {
    setLoginStatus("loggedout");
  };

  if (loginStatus === "loggedin") {
    return <Navigate replace to="/contact" />;
  } else {
    return (
      <div className="flex flex-col items-center justify-center gap-5 rounded-lg shadow-2xl p-16">
        <p className="text-center mb-5 text-xl font-medium text-[#282860] opacity-90">
          Login to answer questions
        </p>

        <button
          onClick={() => {
            console.log("Clicked");
            dispatch(increment(1))
          }}
        >
          Increment {counter}
        </button>

        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onChange={onFormChange}
          autoComplete="off"
          className="flex flex-col gap-3"
        >
          <Form.Item
            validateStatus={loginStatus === "loginerror" ? "error" : ""}
            style={{ margin: "0" }}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              status={loginStatus === "loginerror" ? "error" : ""}
              className="input "
              placeholder="Email address"
            />
          </Form.Item>

          <Form.Item
            validateStatus={loginStatus === "loginerror" ? "error" : ""}
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
              status={loginStatus === "loginerror" ? "error" : ""}
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
          {loginStatus === "loginerror" && (
            <p className="text-red-500">{response}</p>
          )}
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
