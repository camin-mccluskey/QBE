import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';

type AddQuestionTabBarBtnProps = {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function AddQuestionTabBarBtn({ children, onPress }: AddQuestionTabBarBtnProps) {
  return (
    <TouchableOpacity
      style={{
        top: -10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'purple',
        shadowOffset: {
          width: 1,
          height: 3,
        },
        shadowOpacity: 0.30,
        shadowRadius: 3.5,
        elevation: 5,
      }}
      onPress={onPress}
    >
      <View style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'blue'
      }}>
        {children}
      </View>
    </TouchableOpacity>
  )
}
