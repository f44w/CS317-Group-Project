import {useEffect, useState} from "react";
import {View, Text, Pressable} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppStyles } from "../styles";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native";


export default function Home({navigation}) {

    const [nextSession, setNextSession] = useState(null);
    const styles = useAppStyles();

    const loadNextSession = async () => {
        try {
            // load sessions 
            const saved = await AsyncStorage.getItem("sessionsByDate");

        // if no sessions, clear next session state
        if (!saved) {
            setNextSession(null);
            return;
        }
            const sessionsByDate = JSON.parse(saved);
            
            // store time, date, location, notes for each session in array
            let allSessions = [];
            Object.keys(sessionsByDate).forEach(date => {
                sessionsByDate[date].forEach(session => {
                    const [hours, minutes] = session.time.split(":");

                    const fullDate = new Date(date);
                    fullDate.setHours(Number(hours));
                    fullDate.setMinutes(Number(minutes));
                    fullDate.setSeconds(0);

                    allSessions.push({
                        ...session,
                        date,
                        fullDate
                    });
                });
            });


            // sort by date/time
            allSessions.sort((a, b) => a.fullDate - b.fullDate);

            const now = new Date();

            // find next session in future
            const upcoming = allSessions.find(s => s.fullDate > now);
            // set next session state to upcoming session or null if none
            setNextSession(upcoming || null);

        } catch (e) {
            console.log("Failed to load sessions", e);
        }
    };

    // load sessions on homepage when app is opened 
    useEffect(() => {
        loadNextSession();
    }, []);

    // reload sessions when homepage is focused (after adding/editing session)
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            loadNextSession();
    });

        return unsubscribe; // cleanup
    }, [navigation]);
    
    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.homeBanner}
                colors={['#42aad4', '#9fcce3']}>
                <Text style={styles.homeTitle}> Kidney Care </Text>
                <Text style={styles.homeSubtitle}> Here to support your welbeing during dialysis! </Text>
            </LinearGradient>

            <View style={[styles.homeSessionInfoContainer, styles.dropshadow]}>
                <Text style={styles.homeSessionTitle}> Your Next Session: </Text>

                {nextSession ? (
                    <View>
                        <Text style={styles.homeText}>
                            Date: {nextSession.date}
                        </Text>
                        <Text style={styles.homeText}>
                            Time: {nextSession.time}
                        </Text>
                        <Text style={styles.homeText}>
                            Location: {nextSession.location}
                        </Text>
                        <Text style={styles.homeText}>
                            Notes: {nextSession.notes || "None"}
                        </Text>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.homeText}>No upcoming sessions</Text>

                        <Pressable
                            style={styles.homeAddSessionButtonContainer}
                            onPress={() => navigation.navigate("Schedule")}
                        >
                            <LinearGradient
                                colors={['#42aad4', '#9fcce3']}
                                style={styles.homeAddSessionButton}
                            >
                                <Text style={styles.homeAddSessionButtonText}>
                                    Add New Session
                                </Text>
                            </LinearGradient>
                        </Pressable>
                    </View>
                )}
            </View>

            {/* carousel */}
            <Pressable style={[styles.dropshadow, {width: "80%"}]} onPress={() => navigation.navigate("Session")}>
                <LinearGradient
                    colors={['#42aad4', '#9fcce3']}
                    style={styles.homeButtons}>
                    <Text style={styles.homeButtonsText}>Start Session</Text>
                </LinearGradient>
            </Pressable>
            <ScrollView style={styles.homeScrollContainer}horizontal={true}>
                <View style={styles.dropshadow}>
                    <Pressable style={styles.homeButtonCarousel} onPress={() => navigation.navigate("Schedule")}>
                        <Text style = {styles.homeButtonTextCarousel}>Schedule</Text>
                    </Pressable>
                </View>
                <View style={styles.dropshadow}>
                    <Pressable style={styles.homeButtonCarousel} onPress={() => navigation.navigate("Travel")}>
                        <Text style = {styles.homeButtonTextCarousel}>Travel</Text>
                    </Pressable>
                </View>
                <View style={styles.dropshadow}>
                    <Pressable style={styles.homeButtonCarousel} onPress={() => navigation.navigate("Settings")}>
                        <Text style = {styles.homeButtonTextCarousel}>Settings</Text>
                    </Pressable>
                </View>
                </ScrollView>
        </View>
    );
}
