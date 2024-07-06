import clsx from "clsx";
import { type ReactNode } from "react";

export type CardPropertiesType = Readonly<{
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}>;

export const Card = ({
  children,
  onClick,
  className = "",
}: CardPropertiesType) => {
  return (
    <div
      className={clsx(
        "w-full rounded-3xl bg-white",
        onClick && "cursor-pointer hover:shadow-lg active:bg-slate-200",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
