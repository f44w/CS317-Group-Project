import { View, Text, Pressable } from "react-native";
import { useAppStyles } from "../../styles";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Learn({navigation}) {

    const styles = useAppStyles();

    // intermediate page
    return (
        <View style={styles.container}>
            <Text style={styles.scheduleTitle}>Learn</Text>

            <View style={styles.sessionButtonContainer}>
                <Pressable style={[styles.sessionButton, styles.dropshadow]} onPress={() => navigation.navigate("Crossword")}>
                    <Text style={styles.sessionButtonText}>Crossword</Text>
                    <Ionicons name="extension-puzzle" size={24} color="black" />
                </Pressable>
                <Pressable style={[styles.sessionButton, styles.dropshadow]} onPress={() => navigation.navigate("Trivia")}>
                    <Text style={styles.sessionButtonText}>Trivia</Text>
                    <MaterialIcons name="quiz" size={24} color="black" />
                </Pressable>
                <Pressable style={[styles.sessionButton, styles.dropshadow]} onPress={() => navigation.navigate("Facts")}>
                    <Text style={styles.sessionButtonText}>Facts</Text>
                    <Ionicons name="school" size={24} color="black" />
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
