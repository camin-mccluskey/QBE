import { useMemo } from 'react'
import { Question, LogEntry, Answer } from '../store/QuestionContext'

export default function useTodayQuestionAns(question: Question): Answer | null {
  return useMemo(() => {
    const lastLogEntry = question?.logs.at(-1) || null;
    if (lastLogEntry && isLogFromToday(lastLogEntry)) {
      return lastLogEntry.answer;
    }
    return null;
  }, [question])
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
