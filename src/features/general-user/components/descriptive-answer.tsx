import { TextInput } from "../../../components/elements";
import { type ChangeEvent, useState } from "react";
import { message } from "antd";

export type DescriptiveAnswerPanelProps = {
  onTypingEnd: (typedAnswer: string) => void;
  value: string;
};

let saveTimeout: number;

const DescriptiveAnswerPanel = ({
  onTypingEnd,
  value
}: DescriptiveAnswerPanelProps) => {
  const [typedAns, setTypedAns] = useState(value);

  const autoSave = (typedAnswer: string) => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      onTypingEnd(typedAnswer);
      message.success("Saved Successfully");
    }, 1000);
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setTypedAns(e.target.value);
    autoSave(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium text-xs">Write your answers here. It will be autosaved.</p>
      <TextInput onChange={onChange} value={typedAns} />
    </div>
  );
};

export default DescriptiveAnswerPanel;
