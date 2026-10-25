import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useAppStyles } from "../../../styles";
import { getRandomJoke } from "../../../API/jokesAPI";

export default function Jokes({navigation}) {

    const [joke, setJoke] = useState(null);
    const [punchline, setPunchline] = useState(null);

    const styles = useAppStyles();

    const getJoke = async () => {
        const data = await getRandomJoke();
        setJoke(data.setup);
        setPunchline(data.punchline);
    }

    // render
    return (
        <View style={styles.container}>
            <View style={styles.jokeContainer}>
                <Text style = {styles.jokeHeading}>Try Telling A Few Of These Jokes To Someone Nearby And Start A Conversation</Text>

                <Text style={styles.joke}>{joke}</Text>
                <Text style={styles.jokePunchline}>{punchline}</Text>

                <Pressable style = {[styles.startTriviaGameButton, styles.dropshadow]} onPress={() => getJoke()}>
                        <Text style = {styles.startTriviaGameButtonText}>Generate A New Joke</Text>
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
