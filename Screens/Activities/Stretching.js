import {View,Text, Pressable} from "react-native";
import { useAppStyles } from "../../styles";
import { useState } from "react";

// define 4 routines
const stretchingRoutines = {
        routine1: {
            title: "Routine 1 - Upper Body",
            stretches: [
                "Neck stretch - 20 seconds each side",
                "Shoulder rolls - 10 reps forward and backward",
                "Cross-body arm stretch - 20 seconds each side",
                "Tricep stretch - 20 seconds each side",
            ],
        },
        routine2: {
            title: "Routine 2 - Lower Body",
            stretches: [
                "Standing quad stretch - 20 seconds each side",
                "Hamstring stretch - 20 seconds each side",
                "Calf stretch - 20 seconds each side",
                "Figure-four stretch - 20 seconds each side",
            ],
        },
        routine3: {
            title: "Routine 3 - Full Body",
            stretches: [
                "Reach to the sky - 20 seconds",
                "Toe touch stretch - 20 seconds",
                "Standing side stretch - 20 seconds each side",
                "Hip opener stretch - 20 seconds each side",
            ],
        },
        routine4: {
            title: "Routine 4 - Cool Down",
            stretches: [
                "Child's pose - 30 seconds",
                "Seated forward fold - 30 seconds",
                "Butterfly stretch - 30 seconds",
                "Deep breathing with gentle reach - 5 breaths",
            ],
        },
    };
export default function Stretching({navigation}) {

    const styles = useAppStyles();
    const[selectedRoutine, setSelectedRoutine] = useState(null);

    const showRoutine = (routineNum) => {
        setSelectedRoutine(stretchingRoutines[routineNum]);
    };


    return (
        <View style={styles.container}>
            <Text style = {styles.stretchingTitle}> Stretching</Text>

            <Text style = {styles.stretchingSubTitle}> Choose a stretching routine to begin</Text>

            <Pressable style = {styles.stretchingRoutineButton} onPress={() => showRoutine("routine1")}>
                <Text style = {styles.stretchingRoutineButtonText}> Upper Body Stretches</Text>
            </Pressable>

            <Pressable style = {styles.stretchingRoutineButton}  onPress={() => showRoutine("routine2")}>
                <Text style = {styles.stretchingRoutineButtonText}> Lower Body Stretches </Text>
            </Pressable>

            <Pressable style = {styles.stretchingRoutineButton}  onPress={() => showRoutine("routine3")}>
                <Text style = {styles.stretchingRoutineButtonText}> Full Body Stretches</Text>
            </Pressable>

            <Pressable style = {styles.stretchingRoutineButton}  onPress={() => showRoutine("routine4")}>
                <Text style = {styles.stretchingRoutineButtonText}> Cool Down Stretches</Text>
            </Pressable>

            {selectedRoutine && (
                <View style={styles.showSelectedRoutine}>
                    <Text style= {styles.selectedRoutineTitle}>{selectedRoutine.title}</Text>

                    {selectedRoutine.stretches.map((stretch, index) => (
                        <Text 
                            key={index}
                            style={styles.selectedRoutineText}>
                                {index+ 1}. {stretch}
                            </Text>
                    ))}
                </View>

            )}

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