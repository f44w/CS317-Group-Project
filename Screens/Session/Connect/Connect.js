import { View, Text, Pressable } from "react-native";
import { useAppStyles } from "../../../styles";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Connect({navigation}) {

    const styles = useAppStyles();

    // render
    return (
            <View style={styles.container}>
                <View>
                    <Text style = {styles.scheduleTitle}>Connect</Text>
                </View>
                
                <View style = {styles.sessionButtonContainer}>
    
                    <Pressable style={[styles.sessionButton, styles.dropshadow]} onPress={() => navigation.navigate("Jokes")}>
                        <Text style={styles.sessionButtonText}>Tell Someone A Joke</Text>
                        <FontAwesome5 name="laugh-squint" size={24} color="black" />
                    </Pressable>
                    <Pressable style={[styles.sessionButton, styles.dropshadow]} onPress={() => navigation.navigate("ConversationStarter")}>
                        <Text style={styles.sessionButtonText}>Start A Conversation</Text>
                        <FontAwesome6 name="people-group" size={24} color="black" />
                    </Pressable>
                </View>
    
                <View style={styles.bottomButtonContainer}>
                    <Pressable 
                        style={[styles.sessionGoBackButton, styles.dropshadow]} 
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.sessionGoBackButtonText}>Back to Session Page</Text>
                    </Pressable>
                </View>
            </View>
        );
    }