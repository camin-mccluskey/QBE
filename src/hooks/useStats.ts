import { useEffect, useState } from 'react'
import { Question } from '../store/QuestionContext'

export type Stats = {
  totalYes: number
  totalNo: number
  totalSkipped: number
  streak: number
}

export default function useStats(question: Question) {
  const [stats, setStats] = useState<Stats>({ totalYes: 0, totalNo: 0, totalSkipped: 0, streak: 0 })

  useEffect(() => {
    const computedStats = question.logs.reduce<Stats>(
      (acc, logEvent) => ({
        totalYes: acc.totalYes + (logEvent.answer === 'yes' ? 1 : 0),
        totalNo: acc.totalNo + (logEvent.answer === 'no' ? 1 : 0),
        totalSkipped: acc.totalSkipped + (logEvent.answer === 'skip' ? 1 : 0),
        streak: logEvent.answer === 'yes' ? acc.streak + 1 : 0,
      }),
      { totalYes: 0, totalNo: 0, totalSkipped: 0, streak: 0 },
    )
    setStats(computedStats)
  }, [question])

  return stats
}
