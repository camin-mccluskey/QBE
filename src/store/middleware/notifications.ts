import * as Notifications from 'expo-notifications';
import { NotificationRequestInput, WeeklyTriggerInput } from 'expo-notifications';
import { QuestionAction, QuestionState } from '../QuestionContext';

function createNotificationInput(title: string, body: string, trigger: WeeklyTriggerInput): NotificationRequestInput {
  console.log('notif trigger', trigger);
  return {
    content: {
      title,
      body,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      color: 'blue',
    },
    trigger,
  };
}


/**
 * Middleware schedules notifications and attaches notification ids to the question pre store dispatch
 * @param action 
 * @param state 
 */
export default async function notifications(action: QuestionAction, state: QuestionState) {
  switch (action.type) {
    case 'CREATED_OR_EDITED_QUESTION': {
      const { title, schedule, id, notificationIds } = action.payload;
      // no schedule
      if (!schedule) return;

      const possibleExistingQuestion = state.find((question) => question.id === id);
      // no schedule change for question
      if (possibleExistingQuestion && possibleExistingQuestion.schedule === schedule) return;
      
      // cancel all notifications for this question
      notificationIds.forEach((id) => Notifications.cancelScheduledNotificationAsync(id));
      
      // schedule new notifications
      const newNotificationTime = {hour: schedule.time.getHours(), minute: schedule.time.getMinutes()};
      const newNotificationIds = await Promise.all(
        schedule.days.map(async dayIdx => {
          const notifId = await Notifications.scheduleNotificationAsync(
            createNotificationInput('Question Time', title, {
              repeats: true,
              weekday: dayIdx + 1, // expects sunday to be 1, monday to be 2, etc.
              ...newNotificationTime,
            })
          );
          return notifId;
        })
      );
      action.payload.notificationIds = newNotificationIds;
      break;
    }
    case 'DELETED_QUESTION': {
      const { notificationIds } = action.payload;
      notificationIds.forEach((id) => Notifications.cancelScheduledNotificationAsync(id));
      break;
    }
    default:
      break;
  }
}
