export type QuestionType = string;
export type AnswerType = {
    answerType: 'multichoice' | 'descriptive',
    answer: string,
    optionNumber?: number
}