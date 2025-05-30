import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import MapScreen from 'screens/MapScreen';
import ScorecardScreen from 'screens/ScorecardScreen';
import HistoryScreen from 'screens/HistoryScreen';
import CourseSelectionScreen from 'screens/CourseSelectionScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Map') {
            iconName = 'map';
          } else if (route.name === 'Scorecard') {
            iconName = 'score';
          } else if (route.name === 'History') {
            iconName = 'history';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2e8b57',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Scorecard" component={ScorecardScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="CourseSelection" 
          component={CourseSelectionScreen} 
          options={{ title: 'Select Course' }} 
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
