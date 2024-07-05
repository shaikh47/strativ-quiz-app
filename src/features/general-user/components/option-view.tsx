import clsx from "clsx";

export type OptionViewPropsType = {
  option: string;
  optionNumber: number;
  isSelected: boolean;
};

const OptionView = ({
  option,
  optionNumber,
  isSelected,
}: OptionViewPropsType) => {
  return <div className={clsx("flex items-center gap-4 cursor-pointer")}>
    <div className={clsx('h-8 w-8 rounded-full bg-slate-400 flex items-center justify-center text-white')}>{optionNumber}</div>
    <div className={clsx("")}>{option}</div>
  </div>;
};

export default OptionView;
