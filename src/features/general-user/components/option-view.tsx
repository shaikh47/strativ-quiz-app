import clsx from "clsx";
import { TiTickOutline } from "react-icons/ti";

export type OptionViewPropsType = {
  option: string;
  optionNumber: number;
  isSelected: boolean;
  onOptionClick: (optionNumber: number, option: string) => void;
};

const OptionView = ({
  option,
  optionNumber,
  isSelected,
  onOptionClick,
}: OptionViewPropsType) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-4 cursor-pointer hover:bg-slate-200/50 rounded-lg p-2 transition-colors ease-linear delay-[5ms]",
        isSelected && "border border-black border-1 font-bold"
      )}
      onClick={() => onOptionClick(optionNumber, option)}
    >
      <div
        className={clsx(
          "h-8 w-8 p-4 rounded-full bg-slate-400 flex items-center justify-center text-white"
        )}
      >
        {optionNumber}
      </div>
      <div className={clsx("flex items-center justify-between w-full")}>
        <div className={clsx()}>{option}</div>
        {isSelected && <TiTickOutline />}
      </div>
    </div>
  );
};

export default OptionView;
