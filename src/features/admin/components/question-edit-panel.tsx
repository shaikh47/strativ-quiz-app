import React, { useState, useEffect } from "react";
import { type AnswerType, type QuestionType } from "../../../types";
import { CiSquarePlus } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import { Input, message } from "antd";
const { TextArea } = Input;
import {
  Checkbox,
  InputNumber,
  type InputNumberProps,
  type CheckboxProps,
} from "antd";
import { useDispatch } from "react-redux";
import {
  editQuestion,
  removeQuestion,
} from "../../../store/addQuestion/addQuestionSlice";

export type QuestionEditPanelProps = {
  questionProp: QuestionType;
  answerProp: AnswerType;
  questionIndex: number;
};

const default_anwer_structure: AnswerType = {
  options: [""],
  isMultichoice: false,
  weight: -1,
  optionNumber: -1,
};

const QuestionEditPanel = ({
  questionProp,
  answerProp,
  questionIndex,
}: QuestionEditPanelProps) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState(answerProp);
  const [questionText, setQuestionText] = useState(questionProp);

  useEffect(() => {
    dispatch(
      editQuestion({
        index: questionIndex, // index of the question to edit
        updatedQuestion: {
          question: questionText,
          answer: answer,
        },
      })
    );
  }, [questionText, answer]);

  useEffect(() => {
    setAnswer(answerProp);
    setQuestionText(questionProp);
  }, [questionProp, answerProp]);

  const onQuestionWeightChange: InputNumberProps["onChange"] = (value) => {
    setAnswer({ ...answer, weight: Number(value) || 1 });
  };

  const onOptionEdit = (index: number, value: string) => {
    const newOptions = [...answer.options];
    newOptions[index] = value;
    setAnswer({ ...answer, options: newOptions, isMultichoice: true });
  };

  const onOptionAdd = () => {
    setAnswer({ ...answer, options: [...answer.options, ""] });
  };

  const onQuestionEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionText(e.target.value);
  };

  const onOptionRemove = (index: number) => {
    answer.options.length > 1 &&
      setAnswer({
        ...answer,
        options: answer.options.filter((_, i) => i !== index),
      });
  };

  const onMultiCheck: CheckboxProps["onChange"] = (e) => {
    setAnswer({ ...answer, isMultichoice: e.target.checked });
  };

  const onQuestionRemove = (questionIndex: number) => {
    dispatch(removeQuestion(questionIndex));
  };

  const onSubmit = () => {
    if (questionText.trim() === "") {
      message.error("Question cannot be empty.");
      return;
    }

    if (answer.options.some((option) => option.trim() === "")) {
      message.error("Options cannot be empty.");
      return;
    }

    console.log("This is the saveable question: ", {
      answer: answer,
      question: questionText,
    });
    message.success("Question submitted successfully.");
  };

  return (
    <div className="border-2 rounded-xl p-4">
      <div className="grid gap-3">
        <div className="">
          <ImCross
            className="ml-auto cursor-pointer"
            onClick={() => onQuestionRemove(questionIndex)}
            color="red"
          />
        </div>
        <div className="flex gap-4 items-center justify-center">
          <div className="w-full grid gap-2">
            <p className="text-sm">Add Your Question:</p>
            <TextArea
              placeholder="Add Question"
              autoSize
              value={questionText}
              onChange={onQuestionEdit}
            >
              {questionText}
            </TextArea>
          </div>
          <Checkbox onChange={onMultiCheck}>Multiple Choice</Checkbox>
        </div>
        {answer.isMultichoice && (
          <div className="grid gap-3">
            <p className="text-sm">Options: </p>
            {answer.options.map((option, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-center items-center gap-3"
                >
                  <TextArea
                    placeholder="Add Option"
                    autoSize
                    onChange={(e) => onOptionEdit(index, e.target.value)}
                    value={option}
                  />
                  <ImCross
                    className="cursor-pointer"
                    onClick={() => onOptionRemove(index)}
                  />
                </div>
              );
            })}
            <button
              className="justify-self-end flex gap-2 px-4 py-1 text-sm text-white bg-[#5F6CE1] justify-center items-center rounded-lg hover:bg-[#5462e0]"
              onClick={onOptionAdd}
            >
              Add Option <CiSquarePlus size={20} />
            </button>
          </div>
        )}
        <div className="flex gap-2 w-fit items-center">
          <p className="text-sm">Question Weight: </p>
          <InputNumber
            min={1}
            defaultValue={1}
            onChange={onQuestionWeightChange}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionEditPanel;
