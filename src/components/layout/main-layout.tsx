import * as React from "react";
import { Menu } from "antd";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import clsx, { type ClassValue } from "clsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authentication/authSlice";

type MenuItem = Required<MenuProps>["items"][number];

type NavbarPropsType = {
  className: ClassValue;
};

const Navbar = ({ className = "" }: NavbarPropsType) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispath = useDispatch();

  const general_user_options: MenuItem[] = [
    {
      key: "/take-quiz/history",
      icon: <MailOutlined />,
      label: "History",
      onClick: () => navigate("/take-quiz/history"),
    },
    {
      key: "/take-quiz/attempt",
      icon: <AppstoreOutlined />,
      label: "Take Quiz",
      onClick: () => navigate("/take-quiz/attempt"),
    },
    {
      key: "logout",
      icon: <AppstoreOutlined />,
      className: '!ml-auto',
      label: "Logout",
      onClick: () => dispath(logout()),
    },
  ];

  const admin_user_options: MenuItem[] = [
    {
      key: "/set-quistion/something",
      icon: <MailOutlined />,
      label: "History",
      onClick: () => navigate("/take-quiz/history"),
    },
    {
      key: "/view-attempts/something",
      icon: <AppstoreOutlined />,
      label: "Take Quiz",
      onClick: () => navigate("/take-quiz/attempt"),
    },
    {
      key: "logout",
      icon: <AppstoreOutlined />,
      label: "Logout",
      onClick: () => navigate("/take-quiz/attempt"),
    },
  ];

  return (
    <div className="shadow-xl">
      <div className="w-full max-w-7xl mx-auto">
        <Menu
          className={clsx(className, "max-w-7xl")}
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={general_user_options}
        />
      </div>
    </div>
  );
};

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Navbar className="fixed top-0 w-full z-10 bg-white shadow-lg" />
      <div className="w-full h-full pt-14">
        <div className="h-full flex flex-col overflow-hidden">
          <div className="flex-1 flex overflow-hidden">
            <div className="max-w-7xl mx-auto w-full h-full">
              <main className="flex-1 relative overflow-y-auto h-full">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
