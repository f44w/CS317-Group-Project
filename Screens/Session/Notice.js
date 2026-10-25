import { View, Text, Pressable } from "react-native";
import { useAppStyles } from "../../styles";

export default function Notice({navigation}) {

    const styles = useAppStyles();

    // intermediate page
    return (
        <View>
            <View>
                <Text style = {styles.scheduleTitle}>Notice</Text>
            </View>
            
            <View style = {styles.sessionButtonContainer}>

                <Pressable style={styles.sessionButton} onPress={() => navigation.navigate("StepCounter")}>
                    <Text style={styles.sessionButtonText}>Log How Your Feeling</Text>
                </Pressable>
                <Pressable style={styles.sessionButton} onPress={() => navigation.navigate("Stretching")}>
                    <Text style={styles.sessionButtonText}>Mindfullness</Text>
                </Pressable>
            </View>

            <View style={{alignItems: "center"}}>
                <Pressable style={[styles.sessionGoBackButton, styles.dropshadow]} onPress={() => navigation.goBack()}>
                    <Text style={styles.sessionGoBackButtonText}> Back To Session Page</Text>
                </Pressable>
            </View>
        </View>
    );
}
