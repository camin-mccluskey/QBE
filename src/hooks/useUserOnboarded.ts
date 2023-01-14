import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export default function useOnboarded(): [boolean, (state: boolean) => void] {
  const [onboarded, setOnboardedState] = useState<boolean>(false);

  useEffect(() => {
    AsyncStorage.getItem('@qbe:onboarded')
      .then((state) => setOnboardedState(state !== null))
      .catch((e) => console.warn('Error fetching onboarded from storage', e))
  }, [])

  const setOnboarded = (state: boolean) => {
    AsyncStorage.setItem('@qbe:onboarded', state ? 'true' : 'false')
      .then(() => setOnboardedState(state))
      .catch((e) => console.warn('Error setting onboarded in storage', e))
  }

  return [onboarded, setOnboarded]
}
