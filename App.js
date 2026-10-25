import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontSizeProvider} from "./Helpers/FontSizeHelper";
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

/* Main Page imports */
import Home from './Screens/Home';
import Settings from './Screens/Settings';
import Schedule from './Screens/Schedule';
import Session from './Screens/Session/Session';
import Travel from './Screens/Travel';

import Learn from './Screens/Session/Learn';
import Activity from './Screens/Session/Activity';

/* Game Imports */
import Crossword from './Screens/Games/Crossword';
import Trivia from './Screens/Games/Trivia';
import Facts from './Screens/Games/Facts';
import Jokes from './Screens/Session/Connect/Jokes';

/* Activity Imports */
import StepCounter from './Screens/Activities/StepCounter';
import Stretching from './Screens/Activities/Stretching';


/* Connect Imports */
import Connect from './Screens/Session/Connect/Connect';
import ConversationStarter from './Screens/Session/Connect/ConversationStarter';

/* Mindfullness/Notice Imports */
import Mindfulness from './Screens/Session/Mindfulness';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// Substack for Sessions Page to hold all values  
function SessionStack() {
  return (
    <Stack.Navigator screenOptions={{ 
      headerShown: false ,
      }}>
      <Stack.Screen name="SessionNav" component={Session} />
      <Stack.Screen name="Learn" component={Learn} />
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="Crossword" component={Crossword} />
      <Stack.Screen name="Trivia" component={Trivia} />
      <Stack.Screen name="Facts" component={Facts} />
      <Stack.Screen name="Jokes" component={Jokes} />
      <Stack.Screen name="StepCounter" component={StepCounter} />
      <Stack.Screen name="Stretching" component={Stretching}/>
      <Stack.Screen name= "Connect" component={Connect}/>
      <Stack.Screen name = "ConversationStarter" component={ConversationStarter}/>
      <Stack.Screen name="Mindfulness" component={Mindfulness}/>
    </Stack.Navigator>
  );
}


export default function App() {

  // request Permissions on Startup 
  useEffect(() => {
    requestPermissions();
  }, []);


  // requesting Permissions to send Notifacations
  async function requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission for notifications not granted!');
    }
  }

  return (
    <FontSizeProvider>
      <NavigationContainer>
        <Tab.Navigator
        // set icon for each route in tabNavigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } 
              else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              } 
              else if (route.name === 'Schedule') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              } 
              else if (route.name === 'Session') {
                iconName = focused ? 'play-circle' : 'play-circle-outline';
              } 
              else if (route.name === 'Travel') {
                iconName = focused ? 'car' : 'car-outline';
              }
  
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
  
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Schedule" component={Schedule} />
          <Tab.Screen name="Session" component={SessionStack} />
          <Tab.Screen name="Travel" component={Travel} />
          <Tab.Screen name="Settings" component={Settings} />
  
        </Tab.Navigator>
      </NavigationContainer>
    </FontSizeProvider>
  );
}
