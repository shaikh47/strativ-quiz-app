import * as React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import clsx, { type ClassValue } from "clsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type RootStateType } from "../../store/rootStore";
import { logout } from "../../store/authentication/authSlice";
import { IoIosLogOut } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { PiExamLight } from "react-icons/pi";
import { MdOutlineHistoryToggleOff } from "react-icons/md";

type MenuItem = Required<MenuProps>["items"][number];

type NavbarPropsType = {
  className: ClassValue;
};

const Navbar = ({ className = "" }: NavbarPropsType) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispath = useDispatch();
  const user = useSelector((store: RootStateType) => store.auth.user);

  const general_user_options: MenuItem[] = [
    {
      key: "/take-quiz/history",
      icon: <MdOutlineHistoryToggleOff />,
      label: "History",
      onClick: () => navigate("/take-quiz/history"),
    },
    {
      key: "/take-quiz/attempt",
      icon: <PiExamLight />,
      label: "Take Quiz",
      onClick: () => navigate("/take-quiz/attempt"),
    },
    {
      key: "logout",
      icon: <IoIosLogOut />,
      className: '!ml-auto',
      label: "Logout",
      onClick: () => dispath(logout()),
    },
  ];

  const admin_user_options: MenuItem[] = [
    {
      key: "/admin/view-user-responses",
      icon: <LuUsers />,
      label: "View Responses",
      onClick: () => navigate("/admin/view-user-responses"),
    },
    {
      key: "/admin/manage-question",
      icon: <PiExamLight />,
      label: "Manage Questions",
      onClick: () => navigate("/admin/manage-question"),
    },
    {
      key: "logout",
      icon: <IoIosLogOut />,
      className: '!ml-auto',
      label: "Logout",
      onClick: () => dispath(logout()),
    },
  ];

  return (
    <div className="shadow-xl">
      <div className="w-full max-w-7xl mx-auto">
        <Menu
          className={clsx(className, "max-w-7xl")}
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={user?.role === 'user' ? general_user_options : admin_user_options}
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
