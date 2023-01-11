import { Question, LogEntry, Answer } from '../store/QuestionContext'

export default function useTodayQuestionAns(question: Question): Answer | null {
  const lastLogEntry = question?.logs.at(-1) || null;
  if (lastLogEntry && isLogFromToday(lastLogEntry)) {
    return lastLogEntry.answer;
  }
  return null;
}

const isLogFromToday = (log: LogEntry) => {
  const today = new Date();
  const logDate = new Date(log.timestamp);
  return (
    today.getFullYear() === logDate.getFullYear() &&
    today.getMonth() === logDate.getMonth() &&
    today.getDate() === logDate.getDate()
  );
}
