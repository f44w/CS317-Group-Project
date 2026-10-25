import {useState} from "react";
import { View, Text, ScrollView, Pressable, Alert} from "react-native";
import { useAppStyles } from "../../styles";
import Slider from '@react-native-community/slider'; 


export default function Mindfulness({navigation}) {
    const styles = useAppStyles();
    
    // ticks at every 1 interval
    const ticks = Array.from({length: 10}, (_, index) => index + 1);

    // states
    const [energyLevel, setEnergyLevel] = useState(5);
    const [painLevel, setPainLevel] = useState(5);
    const [mood, setMood] = useState(null);
    
    // alert user based on mood
    const handleMoodChange = (newMood) => {
        setMood(newMood);

        if (newMood === "sad"){
            Alert.alert("Low Mood","Consider talking to those around you, or telling a nurse.");
        }else if (newMood === "happy"){
            Alert.alert("Good Mood","Glad to hear it!");
        }else{
            Alert.alert("Moderate Mood","Why not try check out our joke section?");
        }
    }
    
    // handle energy level change 
    const handleEnergyChange = (newEnergyLevel) => {
        setEnergyLevel(newEnergyLevel);
        if (newEnergyLevel <= 3){
            Alert.alert("Low Energy","Consider telling a nurse how you are feeling.");
        }
    }

    // handle pain level change
    const handlePainChange = (newPainLevel) => {
        setPainLevel(newPainLevel);
        if (newPainLevel > 8){
            Alert.alert("High Pain","Consider telling a nurse about your pain.");
        }
    }


    // render
    return(
        <ScrollView style= {{flex: 1}} contentContainerStyle = {styles.mindfulnessContentContainer}>
            <Text style={styles.mindfulnessSubTitleText}>
                What is Your Current Level of Pain?
            </Text>

            <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={painLevel}
                onValueChange={setPainLevel} 
                onSlidingComplete={(value) => handlePainChange(value)}
                thumbTintColor='#00bfff'
            />

            <View style={styles.sliderTickMarksContainer}>
                {ticks.map((tickValue) => (
                    <View key={tickValue} style={styles.sliderTickMark}>
                        <Text style={styles.sliderTickText}>{tickValue}</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.mindfulnessSubTitleText}>
                What is Your Energy Level?
            </Text>

            <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={energyLevel}
                onValueChange={setEnergyLevel} 
                onSlidingComplete={(value) => handleEnergyChange(value)}
                thumbTintColor='#00bfff'
            />

            <View style={styles.sliderTickMarksContainer}>
                {ticks.map((tickValue) => (
                    <View key={tickValue} style={styles.sliderTickMark}>
                        <Text style={styles.sliderTickText}>{tickValue}</Text>
                    </View>
                ))}
            </View>
        
            <Text style={styles.mindfulnessSubTitleText}>What is Your Mood?</Text>
        
            <View style={styles.moodButtonsContainer}>
                <Pressable style={[styles.moodButtonGeneric,{backgroundColor: '#32cd32'}]} onPress={() => handleMoodChange("happy")}>
                    <Text style={styles.moodButtonTextGeneric}>Happy</Text>
                </Pressable>

                <Pressable style={[styles.moodButtonGeneric,{backgroundColor: '#ffa500'}]} onPress={() => handleMoodChange("ok")}>
                    <Text style={styles.moodButtonTextGeneric}>OK</Text>
                </Pressable>

                <Pressable style={[styles.moodButtonGeneric,{backgroundColor: '#ff0000'}]} onPress={() => handleMoodChange("sad")}>
                    <Text style={styles.moodButtonTextGeneric}>Sad</Text>
                </Pressable>
            </View>
        
            <View style={styles.breathingExercisesContainer}>
                {/* user breathing exercises */}
                <Text style={styles.breathingExercisesTitleText}>Breathing Exercises</Text>
                <Text style={styles.mindfulnessTextGeneric}>Shut your eyes for a few minutes. What do you hear?</Text>
                <Text style={styles.mindfulnessTextGeneric}>Focus on your breathing</Text>
                <Text style={styles.mindfulnessTextGeneric}>Think about how your body feels. 
                    Pay attention to your feet and slowly move up your body towards your head.</Text>
                <Text style={styles.mindfulnessTextGeneric}>Breathe in slowly through your nose. Hold for four seconds 
                    and breathe out. Repeat this as many times as you want.</Text>
            </View>

            <View style={{alignItems: "center"}}>
                <Pressable style={[styles.sessionGoBackButton, styles.dropshadow]} onPress={() => navigation.goBack()}>
                    <Text style={styles.sessionGoBackButtonText}> Back To Session Page</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}
