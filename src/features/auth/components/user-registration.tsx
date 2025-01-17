import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../../../store/authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getHash } from "../../../utils/crypto";
import { type RootStateType } from "../../../store/rootStore";
import { EmailSchema } from "../../../domains/models/user";

type SignUpProps = {
  loginClick: () => void;
};

type FormValues = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
};

const SignUp: React.FC<SignUpProps> = ({ loginClick }) => {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loginStatus, setLoginStatus] = useState<string>("loggedout");
  const isAuthenticated = useSelector(
    (store: RootStateType) => store.auth.isAuthenticated
  );
  const authenticatedUser = useSelector(
    (store: RootStateType) => store.auth.user
  );

  const onFinish = async (values: FormValues) => {
    dispatch(
      signup({
        email: values.email.trim(),
        username: `${values.firstname}-${values.lastname}`,
        password: getHash(values.password.trim()),
      })
    );
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

  if (isAuthenticated === true) {
    if (authenticatedUser?.role === "user")
      return <Navigate replace to="/take-quiz/history" />;
    else if (authenticatedUser?.role === "admin")
      return <Navigate replace to="/admin/view-user-responses" />;
    else <Navigate replace to="/auth" />;
  } else {
    return (
      <div className="flex flex-col items-center justify-center gap-5 rounded-lg shadow-2xl p-16">
        <p className="text-center mb-5 text-xl font-medium text-[#282860] opacity-90">
          Create your account to answer questions
        </p>

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
              status={loginStatus === "loginerror" ? "error" : ""}
              className="input"
              placeholder="Email address"
            />
          </Form.Item>

          <Form.Item
            validateStatus={loginStatus === "loginerror" ? "error" : ""}
            className="m-0"
            name="firstname"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input
              status={loginStatus === "loginerror" ? "error" : ""}
              className="input"
              placeholder="First name"
            />
          </Form.Item>

          <Form.Item
            validateStatus={loginStatus === "loginerror" ? "error" : ""}
            className="m-0"
            name="lastname"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input
              status={loginStatus === "loginerror" ? "error" : ""}
              className="input"
              placeholder="Last name"
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
              className="input"
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
          {/* {loginStatus === "loginerror" && (
            <p className="text-red-500">{"response"}</p>
          )} */}
          <button className="signup-button w-full rounded-lg bg-[#720455] py-1 text-md font-semibold leading-7 text-white hover:bg-[#3c0753]">
            Create Account
          </button>
        </Form>

        <p className="login-prompt commonStyles mt-5 text-md text-[#8CABFF]">
          Already have an account?{" "}
          <b>
            <a
              className="login-link cursor-pointer text-[#4477CE] hover:text-[#1760df]"
              onClick={loginClick}
            >
              Login
            </a>
          </b>
        </p>
      </div>
    );
  }
};

export default SignUp;
