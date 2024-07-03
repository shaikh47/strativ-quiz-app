import * as React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import clsx, { type ClassValue } from "clsx";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <MailOutlined />,
    label: "Navigation One",
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: "Navigation Two",
  },
  {
    key: "3",
    icon: <SettingOutlined />,
    label: "Navigation Three",
  },
];

type NavbarPropsType = {
  className: ClassValue;
};

const Navbar = ({ className = "" }: NavbarPropsType) => {
  return (
    <div className="bg-slate-600">
      <div className="w-full bg-green-500 max-w-7xl mx-auto">
        <Menu
          className={clsx(className, " max-w-7xl")}
          mode="horizontal"
          defaultSelectedKeys={["231"]}
          items={items}
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
    <div className="w-full h-full bg-red-200">
      <Navbar className="bg-slate-600" />
      <div className="h-full flex flex-col overflow-hidden bg-gray-300">
        <div className="flex-1 flex overflow-hidden">
          <div className="max-w-7xl mx-auto w-full h-full">
            <main className="flex-1 relative overflow-y-auto h-full">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};
