import  { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useAppStyles } from "../../styles";
import { getRandomFact } from "../../API/factsAPI";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Facts({navigation}) {

    const [fact, setFact] = useState(null);

    const styles = useAppStyles();

    const getFact = async () => {
        const data = await getRandomFact();
        setFact(data);
    }

    return (
            <View style={styles.container}>
                <View style={styles.factContainer}>
                    <Text style = {styles.factHeading}>Here are some facts you may find interesting.</Text>
                    {!fact && (<Ionicons name="school" size={75} color="black" />)}
                    <Text style={styles.fact}>{fact}</Text>
                    <Pressable style = {[styles.startTriviaGameButton, styles.dropshadow]} onPress={() => getFact()}>
                        <Text style = {styles.startTriviaGameButtonText}>Generate a new Fact</Text>
                    </Pressable>
                </View>
    
    
                <View style={styles.bottomButtonContainer}>
                    <Pressable 
                        style={[styles.sessionGoBackButton, styles.dropshadow]} 
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.sessionGoBackButtonText}> Back to Learn Page</Text>
                    </Pressable>
                </View>
            </View>
        );
}
