import { PermissionStatus } from 'expo-modules-core'
import * as Notifications from 'expo-notifications'
import { useEffect, useState } from 'react'

export default function useNotificationPermissions(
  notificationHandler: (event: Notifications.Notification) => void,
) {
  const [notificationPermissions, setNotificationPermissions] = useState<PermissionStatus>(
    PermissionStatus.UNDETERMINED,
  )

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync()
    setNotificationPermissions(status)
    return status
  }

  useEffect(() => {
    requestNotificationPermissions()
  }, [])

  useEffect(() => {
    if (notificationPermissions !== PermissionStatus.GRANTED) return
    const listener = Notifications.addNotificationReceivedListener(notificationHandler)
    return () => listener.remove()
  }, [notificationPermissions])

  return notificationPermissions
}
