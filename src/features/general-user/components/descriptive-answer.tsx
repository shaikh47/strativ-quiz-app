import { type ChangeEvent, useState } from "react";
import { message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";

export type DescriptiveAnswerPanelProps = {
  onTypingEnd: (typedAnswer: string) => void;
  value: string;
};

let saveTimeout: number;

const DescriptiveAnswerPanel = ({
  onTypingEnd,
  value,
}: DescriptiveAnswerPanelProps) => {
  const [typedAns, setTypedAns] = useState(value);

  useEffect(() => {
    setTypedAns(value);
  }, [value]);

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
      <p className="font-medium text-xs">
        Write your answers here. It will be autosaved.
      </p>
      <TextArea
        placeholder="Answer.."
        autoSize={{ minRows: 10 }}
        value={typedAns}
        onChange={onChange}
      />
    </div>
  );
};

export default DescriptiveAnswerPanel;
