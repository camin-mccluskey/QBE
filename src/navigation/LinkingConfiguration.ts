/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'

import { RootStackParamList } from '../types'

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Questions: {
            screens: {
              QuestionsScreen: 'questions',
            },
          },
          NewQuestion: {
            screens: {
              NewQuestionScreen: 'new-question',
            },
          },
          Stats: {
            screens: {
              StatsScreen: 'stats',
            },
          },
        },
      },
      QuestionModal: 'question-modal',
      NotFound: '*',
    },
  },
}

export default linking
