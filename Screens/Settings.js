import { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Modal, StyleSheet, Alert, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFontSize } from "../Helpers/FontSizeHelper";
import { useAppStyles } from "../styles";
import { LinearGradient } from 'expo-linear-gradient';

export default function Settings() {
    const styles = useAppStyles();
    const { size, setSize } = useFontSize();
    
    const [presetLocations, setPresetLocations] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCoord, setSelectedCoord] = useState(null);
    const [newPresetLocation, setNewPresetLocation] = useState("");

    // Load preset locations from AsyncStorage
    useEffect(() => {
        const loadPresetLocations = async () => {
            try {
                const savedLocations = await AsyncStorage.getItem("presetLocations");
                if (savedLocations) {
                    setPresetLocations(JSON.parse(savedLocations));
                }
            } catch (e) {
                console.log("Failed to load preset locations:", e);
            }
        };
        loadPresetLocations();
    }, []);

    // Save preset locations to AsyncStorage
    const savePresetLocations = async (next) => {
        try {
            await AsyncStorage.setItem("presetLocations", JSON.stringify(next));
        } catch (e) {
            console.log("Failed to save preset locations: ", e);
        }
    };

    // Delete location
    const deletePresetLocation = async (item) => {
        const next = presetLocations.filter(loc => loc !== item);
        setPresetLocations(next);
        await savePresetLocations(next);
    };

    const clearPresetLocations = async () => {
        const next = [];
        setPresetLocations(next);
        await savePresetLocations(next);
    };

    return (
        <View style={styles.container}>
            <View style ={[styles.settingsSectionCard, styles.dropshadow]}>

                {/* Font Size Settings */}
                <Text style={styles.settingsTitle}>Font Size</Text>
                <Text style={styles.settingsText}>Current Size: {size}</Text>

                <View style={styles.settingsButtonRow}>

                    <Pressable style={[styles.dropshadow]} onPress={() => setSize("Small")}>
                    <LinearGradient
                            colors={['#42aad4', '#9fcce3']}
                            style={styles.homeButtons}>
                            <Text style={styles.homeButtonsText}>Small</Text>
                        </LinearGradient>
                    </Pressable>
                    <Pressable style={[styles.dropshadow]}  onPress={() => setSize("Medium")}>
                    <LinearGradient
                            colors={['#42aad4', '#9fcce3']}
                            style={styles.homeButtons}>
                            <Text style={styles.homeButtonsText}>Medium</Text>
                        </LinearGradient>
                    </Pressable>
                    <Pressable style={[styles.dropshadow]}  onPress={() => setSize("Large")}>
                    <LinearGradient
                            colors={['#42aad4', '#9fcce3']}
                            style={styles.homeButtons}>
                            <Text style={styles.homeButtonsText}>Large</Text>
                        </LinearGradient>
                    </Pressable>


                </View>
            </View>
            
            {/* Preset Locations */}
            <View style ={[styles.settingsSectionCard, styles.dropshadow]}>

                <Text style={styles.settingsTitle}>Preset Locations</Text>

                <Pressable style={[styles.dropshadow]}  onPress={() => setModalVisible(true)}>
                    <LinearGradient
                            colors={['#42aad4', '#9fcce3']}
                            style={styles.homeButtons}>
                            <Text style={styles.homeButtonsText}>Add Location On Map</Text>
                    </LinearGradient>
                </Pressable>

                <Pressable style={[styles.dropshadow]} onPress={() => clearPresetLocations()}>
                    <LinearGradient
                            colors={['#42aad4', '#9fcce3']}
                            style={styles.homeButtons}>
                            <Text style={styles.homeButtonsText}>Clear Preset Locations</Text>
                    </LinearGradient>
                </Pressable>

                <FlatList style={{padding: 20}}
                data={presetLocations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    const isObject = item && typeof item === "object" && "latitude" in item && "longitude" in item;
                    return (
                        <View style={styles.sessionListRow}>
                            <Text style={styles.sessionListRowTitle}>
                                {isObject
                                    ? `${item.name} (${item.latitude.toFixed(4)}, ${item.longitude.toFixed(4)})`
                                    : item // fallback for old string-only data
                                }
                            </Text>
                            {isObject && (

                                <Pressable style={[styles.settingsDeleteButton, styles.dropshadow]} onPress={() => deletePresetLocation(item)}>
                                    <Text style = {styles.settingsDeleteButtonText}>Delete</Text>
                                </Pressable>
                            )}
                        </View>
                    );
                }}
            />
            </View>
            
            {/* Modal with Map + TextInput */}
            <Modal visible={modalVisible} animationType="slide">
                <View style={{ flex: 1 }}>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: 55.8642, // Glasgow
                            longitude: -4.2518,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                        onPress={(e) => setSelectedCoord(e.nativeEvent.coordinate)}
                    >
                        {selectedCoord && <Marker coordinate={selectedCoord} />}
                    </MapView>

                    <View style={modalStyles.modalControls}>
                        <TextInput
                            placeholder="Enter New Location Name"
                            placeholderTextColor="#666"
                            value={newPresetLocation}
                            onChangeText={setNewPresetLocation}
                            style={styles.settingsPresetLocationsInput}
                        />

                        <Pressable 
                            style={[styles.settingsModalButton, styles.dropshadow]} 
                            onPress={() => {
                            
                                if (!selectedCoord) {
                                    Alert.alert("Select a location", "Please tap a point on the map first.");
                                    return;
                                }
                                if (!newPresetLocation.trim()) {
                                    Alert.alert("Enter a name", "Please provide a name for the location.");
                                    return;
                                }

                                const newLocation = {
                                    name: newPresetLocation.trim(),
                                    latitude: selectedCoord.latitude,
                                    longitude: selectedCoord.longitude,
                                };

				// add new location
                                const next = [...presetLocations, newLocation];
                                setPresetLocations(next);
                                savePresetLocations(next);
                                setNewPresetLocation("");
                                setSelectedCoord(null);
                                setModalVisible(false);
                            }}
                        >
                                
                            <Text style = {styles.settingsModalButtonText}>Save Location</Text>
                        </Pressable>

                        <Pressable
                            style = {[styles.settingsModalCancelButton, styles.dropshadow]}
                            onPress={() => {
                                setModalVisible(false);
                                setSelectedCoord(null);
                                setNewPresetLocation("");
                            }}
                        >
                            <Text style = {styles.settingsModalCancelButtonText}> Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const modalStyles = StyleSheet.create({
    modalControls: {
        padding: 10,
        backgroundColor: "white",
        
    },
});
