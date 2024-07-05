import OptionView from "./option-view";
import clsx from "clsx";

export type MultichoiceAnswerPanelProps = {
  options: string[];
  selectedOption?: number;
};

const MultichoiceAnswerPanel = ({ options, selectedOption = -1 }: MultichoiceAnswerPanelProps) => {
  return (
    <div className={clsx("flex flex-col gap-4 p-2")}>
      {options.map((option, index) => {
        return <OptionView key={index} isSelected={false} option={option} optionNumber={index+1}/>;
      })}
    </div>
  );
};

export default MultichoiceAnswerPanel;
