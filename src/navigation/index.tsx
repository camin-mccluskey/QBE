/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName, Image } from 'react-native'
import AddQuestionTabBarBtn from '../components/AddQuestionTabBarBtn'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import NewQuestionScreen from '../screens/NewQuestionScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import QuestionModalScreen from '../screens/QuestionModalScreen'
import QuestionsScreen from '../screens/QuestionsScreen'
import StatsScreen from '../screens/StatsScreen'
import { RootStackParamList, RootTabParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='QuestionModal'
          component={QuestionModalScreen}
          options={{headerShown: false}}/>
      </Stack.Group>
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName='Questions'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name='Questions'
        component={
          QuestionsScreen
        }
        options={{
          title: 'Questions',
          tabBarIcon: ({ color }) => <TabBarIcon name='help-outline' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='NewQuestion'
        component={
          NewQuestionScreen
        }
        options={{
          title: 'New Question',
          tabBarIcon: ({ color }) => (
            // <Image
            //   // need to use and add icon here - I'd like to use an icon but alas
            //   source={require('../assets/images/icon.png')}
            //   style={{ width: 30, height: 30, tintColor: color }}
            //   resizeMode='contain'
            // />
            <TabBarIcon name='add-outline' color={color} size={60} style={{marginBotton: 0}}/>
          ),
          tabBarButton: (props) => <AddQuestionTabBarBtn  {...props} />,
          tabBarLabel: () => null,
        }}
      />
      <BottomTab.Screen
        name='Stats'
        component={
          StatsScreen
        }
        options={{
          title: 'Stats',
          tabBarIcon: ({ color }) => <TabBarIcon name='stats-chart-outline' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name']
  color: string
  style?: any
  size?: number
}) {
  return <Ionicons size={props.size || 30} style={[{ marginBottom: -3 }, props.style]} {...props} />
}
