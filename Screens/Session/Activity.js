import { View, Text,Pressable } from "react-native";
import { useAppStyles } from "../../styles";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Activity({navigation}) {

    const styles = useAppStyles();

    // intermediate page
    return (
        <View style={styles.container}>
            <View>
                <Text style = {styles.scheduleTitle}>Activities</Text>
            </View>
            <View style={styles.sessionButtonContainer}>
                <Pressable style={[styles.sessionButton, styles.dropshadow]} onPress={() => navigation.navigate("StepCounter")}>
                    <Text style={styles.sessionButtonText}>Pedometer</Text>
                    <FontAwesome5 name="walking" size={24} color="black" />
                </Pressable>
                <Pressable style={[styles.sessionButton, styles.dropshadow]} onPress={() => navigation.navigate("Stretching")}>
                    <Text style={styles.sessionButtonText}>Stretching</Text>
                    <MaterialCommunityIcons name="arm-flex" size={24} color="black" />
                </Pressable>
                

            </View>

            <View style={styles.bottomButtonContainer}>
                    <Pressable 
                        style={[styles.sessionGoBackButton, styles.dropshadow]} 
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.sessionGoBackButtonText}> Back to Session Page</Text>
                    </Pressable>
                </View>
        </View>
    );
}
