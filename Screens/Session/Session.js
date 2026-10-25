import {useState,useRef,useEffect} from "react";
import {View, Text,Button, Pressable} from "react-native";
import { useAppStyles } from "../../styles";
import { sendNotification } from "../../Helpers/NotificationHelper";
import { LinearGradient } from 'expo-linear-gradient';

export default function Session({navigation}) {
    const styles = useAppStyles();

    // states
    const timeConstant = 14400;
    const[time, setTime] = useState(timeConstant); // countdown time
    const[running,setRunning] = useState(false);
    const intervalRef = useRef(null); // allows for pausing/reset
    const startTimeRef = useRef(60); // store init time for reset
    
    // HH:MM:ss
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds/3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds%60);

        return `${hours.toString().padStart(2,"0")}:`+
               `${minutes.toString().padStart(2,"0")}:`+
               `${secs.toString().padStart(2,"0")}`
    };
    
    const startTimer = () => {
        if (!running){
            setRunning(true);
            startTimeRef.current = time; // store countdown value at session start
            const halftime = Math.floor(time/2);

            // re-run func and update the .current var to its result
            intervalRef.current = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 0){
                        // wipe interval as timer finished
                        clearInterval(intervalRef.current);
                        setRunning(false);
                        return 0;
                    }
                    if (prevTime === halftime) {
                        sendNotification("Halfway there!", "keep going, you're doing great!");
                    } else if (prevTime === 900){
                        sendNotification("15 Minutes Left!", "You're almost there!");

                    }else if ((startTimeRef.current-prevTime)%1800 === 0 && prevTime !== startTimeRef.current) {

                        const elapsedMinutes = Math.floor((startTimeRef.current - prevTime) / 60 );

                        const remaningHours = Math.floor(prevTime / 3600); // seconds -> whole hours
                        const remainingMinutes = Math.floor((prevTime % 3600) / 60 ); // convert leftover seconds after whole hours removal into whole minutes

                        sendNotification(
                            `${elapsedMinutes} minutes completed`,
                            `${remaningHours}hours ${remainingMinutes}minutes remaining in your session.`
                        ); // sends notifaction every 30mins 
                    }
                    // subtract second
                    return prevTime - 1;
                });
            },1000); // 1 sec delay
        }
    };
    
    const pauseTimer = () => {
        clearInterval(intervalRef.current);
        setRunning(false);
    }
    
    const resetTimer = () => {
        clearInterval(intervalRef.current);
        // re-init time to original value
        setTime(timeConstant);
        setRunning(false);
    }
    
    const incrementCountdown = () => {
        setTime(prevTime => prevTime + 60);
    }

    const decrementCountdown = () => {
        // don't go below 0
        setTime(prevTime => (prevTime - 60 < 0 ? 0 : prevTime-60));
    }
    
    // clear interval on DOM reload/umount
    useEffect(() => {
        // specifies cleanup when component unounted
        return () => clearInterval(intervalRef.current);
    },[]);

    // render
    return (
        <View style={styles.container}>
                <LinearGradient 
                colors={['#42aad4', '#9fcce3']}>
                <View style={styles.countdownHeader}>
                    <View style={styles.countdownContainer}>
                            <Text style={styles.sessionCountdownText}>
                                {formatTime(time)}
                            </Text>
                    </View>
                        <View style={styles.countdownAdjustmentButtonContainer}>
                            <Button title="+" onPress={incrementCountdown}/>
                            <Button title="-" onPress={decrementCountdown}/>
                        </View>     

                    <View style={styles.sessionButtonRow}>
                        <Pressable
                            style = {[styles.sessionTimerButton]}
                            onPress= {running ? pauseTimer: startTimer}
                        >
                            <Text style = {[styles.sessionTimerButtonText, styles.dropshadow]}>
                                {running ? "Pause" : "Start"}
                            </Text>
                        </Pressable>

                        <Pressable
                            style = {[styles.sessionTimerButton,styles.sessionResetButton, styles.dropshadow]}
                            onPress={resetTimer}
                        >
                            <Text style = {[styles.sessionTimerButtonText, styles.dropshadow]}>Reset Timer</Text>
			</Pressable>
                    </View>
                </View>
                </LinearGradient>

                <View style={styles.sessionButtonContainer}>
                    <Pressable style={[styles.sessionButton, styles.dropshadow]} onPress={() => navigation.navigate("Learn")}>
                        <Text style={styles.sessionButtonText}>Learn</Text>
                    </Pressable>
                    <Pressable style={[styles.sessionButton, styles.dropshadow]} onPress={() => navigation.navigate("Activity")}>
                        <Text style={styles.sessionButtonText}>Be Active</Text>
                    </Pressable>
                    <Pressable style={[styles.sessionButton, styles.dropshadow]} onPress={() => navigation.navigate("Mindfulness")}>
                        <Text style={styles.sessionButtonText}>Be Mindful</Text>
                    </Pressable>
                    <Pressable style={[styles.sessionButton, styles.dropshadow]} onPress={() => navigation.navigate("Connect")}>
                        <Text style={styles.sessionButtonText}>Connect</Text>
                    </Pressable>
                </View>
        </View>
    );
}
