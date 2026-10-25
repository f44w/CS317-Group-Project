import { useState, useEffect, useRef } from "react";
import { Pedometer } from "expo-sensors";
import { Text, View , Pressable, Platform} from "react-native";
import { useAppStyles } from "../../styles";

export default function StepCounter({ navigation }) {

  const styles = useAppStyles();

  // states
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [goalMatch, setGoalMatch] = useState(false);

  const subscriptionRef = useRef(null);

  const subscribe = async () => {
    // get async result
    const isAvailable = await Pedometer.isAvailableAsync();

    if (!isAvailable) return;

    const end = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0); 

    const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);

    if (pastStepCountResult) {
      setPastStepCount(pastStepCountResult.steps);

      if (pastStepCountResult.steps >= 5000) {
        setGoalMatch(true);
      }
    }

    subscriptionRef.current = Pedometer.watchStepCount(result => {
      setCurrentStepCount(result.steps);

      if (pastStepCountResult.steps + result.steps >= 50) {
        setGoalMatch(true);
      }
    });
  };

  useEffect(() => {
    subscribe();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
    };
  }, []);

  const totalSteps = pastStepCount + currentStepCount

  return (
    <View style = {styles.container}>
      <Text style = {styles.crosswordtitle}>Step Counter</Text>
      <View style = {[styles.stepCounterCard, styles.dropshadow]}>

          <Text style= {styles.stepCounterTotal}>Total Steps Taken: {totalSteps}</Text>
          {/* Past steps does not work on android  */ }
          {Platform.OS === 'ios' && (
            <Text style={styles.stepCounterText}>
              Steps already recorded today: {pastStepCount}
            </Text>
          )}
          <Text style= {styles.stepCounterText}> Steps since opening page: {currentStepCount}</Text>

        <View style ={styles.stepCounterGoalBox}>

          {/* show progress towards step goal */ }
          {!goalMatch &&(
            <Text style= {styles.stepCounterGoalText}>
              Daily Goal: 5000 Steps
            </Text>
          )}

          {/* if reached goal show message*/}
          {goalMatch && (
            <Text style = {styles.stepCounterGoalText}>
              Daily Step Goal Reached! Well Done
            </Text>
          )}
        </View>
        

      </View>
      
      <View style={styles.bottomButtonContainer}>
        <Pressable 
          style={[styles.sessionGoBackButton, styles.dropshadow]} 
          onPress={() => navigation.goBack()}
        >
        <Text style={styles.sessionGoBackButtonText}>Back to Activity Page</Text>
        </Pressable>
      </View>
    </View>
  );
}
