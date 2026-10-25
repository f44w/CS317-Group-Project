import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useAppStyles } from "../../../styles";

export default function ConversationStarter({navigation}) {

    const styles = useAppStyles();

    // stores list of conversation starters
    const starters = [
        "Ask how their week has been.",
        "Tell someone one positive thing from today.",
        "Ask if they have seen any good movies or shows lately.",
        "Ask if they have read any good books lately.",
        "Ask if they have been on or are planning any nice holidays.",
        "Ask them how their family are doing.",
        "Ask what their current favorite song is.",
        "Ask them if they could have one dinner with any person dead or alive who would it be.",
    ];

    // init state to random starter
    const [currentStarter, setCurrentStarter] = useState(() => {
        return starters[Math.floor(Math.random() * starters.length)];
    });

    const getRandomStarter = () => {
        const randomIndex = Math.floor(Math.random() * starters.length); // pick random from array
        setCurrentStarter(starters[randomIndex]);
    }

    return (
            <View style={styles.container}>
                <View style = {styles.conversationStarterContainer}>

                    <Text style = {styles.startersTitle}>These prompts can help start a conversation.</Text>

                    <Text style = {styles.startersSubTitle}> Try using them on people nearby or through messages or phone calls. </Text>

                    <Text style={styles.starter}>{currentStarter}</Text>

                    <Pressable style = {[styles.startTriviaGameButton, styles.dropshadow]} onPress={() => getRandomStarter()}>
                        <Text style = {styles.startTriviaGameButtonText}>Generate A New Conversation Starter</Text>
                    </Pressable>
                </View>
               
                <View style={styles.bottomButtonContainer}>
                    <Pressable 
                        style={[styles.sessionGoBackButton, styles.dropshadow]} 
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.sessionGoBackButtonText}>Back to Connect Page</Text>
                    </Pressable>
                </View>
            </View>
        );
    }