import { useEffect, useState } from 'react'
import { Question } from '../store/QuestionContext'

export type Stats = {
  totalYes: number
  totalNo: number
  totalSkipped: number
}

export default function useStats(question: Question) {
  const [stats, setStats] = useState<Stats>({ totalYes: 0, totalNo: 0, totalSkipped: 0 })

  useEffect(() => {
    const computedStats = question.logs.reduce<Stats>(
      (acc, logEvent) => ({
        totalYes: acc.totalYes + (logEvent.answer === 'yes' ? 1 : 0),
        totalNo: acc.totalNo + (logEvent.answer === 'no' ? 1 : 0),
        // need to implement this in the LogEvent type
        totalSkipped: acc.totalSkipped,
      }),
      { totalYes: 0, totalNo: 0, totalSkipped: 0 },
    )
    setStats(computedStats)
  }, [question])

  return stats
}
