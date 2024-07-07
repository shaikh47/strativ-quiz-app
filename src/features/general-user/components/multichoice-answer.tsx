import OptionView from "./option-view";
import clsx from "clsx";

export type MultichoiceAnswerPanelProps = {
  options: string[];
  selectedOption: number;
  onOptionClick: (optionNumber: number, option: string) => void;
};

const MultichoiceAnswerPanel = ({
  options,
  selectedOption,
  onOptionClick,
}: MultichoiceAnswerPanelProps) => {
  
  return (
    <div className={clsx("flex flex-col gap-4 p-2")}>
      {options.map((option, index) => {
        return (
          <OptionView
            key={index}
            isSelected={selectedOption === index + 1}
            option={option}
            optionNumber={index + 1}
            onOptionClick={onOptionClick}
          />
        );
      })}
    </div>
  );
};

export default MultichoiceAnswerPanel;
