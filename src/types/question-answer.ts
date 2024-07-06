export type QuestionType = string;
export type AnswerType = {
    options: string[];
    weight: number;
    optionNumber: number;
    isMultichoice: boolean;
}