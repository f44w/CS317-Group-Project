import {useState, useMemo, useEffect} from "react";
import { View, Text, TextInput,Platform, ScrollView, Pressable, Modal, Alert} from "react-native";
import {Calendar} from "react-native-calendars"
import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppStyles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

const MyCalendar = ({selectedDate, markedDates, onDayPress}) => {

    const styles = useAppStyles();

    return (
        <View style={[styles.calendar]}>
            <Calendar

                onDayPress={onDayPress}

                markedDates={markedDates}

                theme = {{
                    todayTextColor: "blue"
                }}
            />

            <View style={styles.selectedTextContainer}>
                {/* shows date selcted in format YYYY-MM-DD or message informing user to select date */}
                <Text style = {styles.selectedText}>
                    {selectedDate ? `Selected: ${selectedDate}` : "Tap a date to select it"}
                </Text>
            </View>
        </View>
    );
};

export default function Schedule() {
    const navigation = useNavigation();
    const styles = useAppStyles();

    const [selectedDate, setSelectedDate] = useState(null); // currently selected date (YYYY-MM-DD)
    const [sessionsByDate, setSessionsByDate] = useState({}); // stores all sessions 

    // user inputted info about session
    const [timeValue, setTimeValue] = useState(new Date()); // store selected time as Date object
    const [showTimePicker, setShowTimePicker] = useState(false); // shows time picker when true

    const [location, setLocation] = useState("");
    const [notes, setNotes] = useState(""); // optional notes for session

    const [editingSessionID, setEditingSessionID] = useState(null); // id for currently editing session

    const sessionsForSelectedDate = selectedDate ? (sessionsByDate[selectedDate] || []) : []; // get sessions list for currently selected date or empty list

    const [isLoaded, setIsLoaded] = useState(false);
    // new consts 
    const [modalVisible, setModalVisible] = useState(false);
    const [presetLocations, setPresetLocations] = useState([]); // loded presets from async storage
    const dropdownLocations = presetLocations.map((loc, index) => ({
        key: index,
        value: loc.name
      }));
    
    // load sessions from async storage to displau on calendar 
    useEffect(() => {
        const loadSessions = async () => {
            try {
                const saved = await AsyncStorage.getItem("sessionsByDate");

                if (saved) {
                    setSessionsByDate(JSON.parse(saved));
                }
            } catch (e) {
                console.log("Failed to load sessions", e);
            } finally {
                setIsLoaded(true); 
            }
        };

        loadSessions();
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        const saveSessions = async () => {
            try {
                await AsyncStorage.setItem(
                    "sessionsByDate",
                    JSON.stringify(sessionsByDate)
                );
            } catch (e) {
                console.log("Failed to save sessions", e);
            }
        };

        saveSessions();
    }, [sessionsByDate, isLoaded]);


    // get user locations
    const loadPresetLocations = async () => {
        try {
            const saved = await AsyncStorage.getItem("presetLocations");
            console.log(JSON.parse(saved))
            if (saved) {
                setPresetLocations(JSON.parse(saved));
            }
            else{
                setPresetLocations([]);
            }
        } catch (e) {
            console.log("Failed to load preset locations:", e);
        }
    };

    const dateToSeconds = (d) => (d.getHours() * 3600) + (d.getMinutes() * 60); // convert a date to seconds since midnight

    // taken from Session Page for referencing modified for HH:MM
    // HH:MM
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds/3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        return `${hours.toString().padStart(2,"0")}:`+
               `${minutes.toString().padStart(2,"0")}`
    };

    const onTimeChange = (event, selected) => {
        
        if (Platform.OS !== "ios") {
            setShowTimePicker(false); // Android picker is dialog, close after selection
        }

        if (selected) {
            setTimeValue(selected);
        }
    };
    

    // build dates for calendar 
    // useMemo to cach results of calculation between re-renders 
    const markedDates = useMemo(() => {

        const marks = {}; 

        Object.keys(sessionsByDate).forEach((dateKey) => { // for every date key that has sessions

            marks[dateKey] = {marked: true, dotColor: 'red'}; // mark date with dot
        });

        if (selectedDate){
            marks[selectedDate] = { 
                ...(marks[selectedDate] || {}), // if object for date exists use that otherwise use empty object, ... is spread - copies properties into new object https://www.w3schools.com/REACT/react_es6_spread.asp
                 selected: true, // highlight date
                 selectedColor: "blue" // colour of selected date
                }; 
        }

        return marks;
    }, [sessionsByDate, selectedDate]);

    // when user taps a date on calendar
    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    // saves new session or updates existing
    const saveSession = () => {

        // need to add validaation for ensuring time is of format HH:MM

        // Handle Missing Inputs
        if (!selectedDate){
            Alert.alert("Please select a date on the calendar first");
            return;
        }

        if (!location || location.trim().length === 0){
            Alert.alert("Please enter a location");
            return;
        }
        
        if (notes.trim().length > 100){
            Alert.alert("Notes must be less than 100 characters","Please reduce the note");
            return;
        }

        const newSession = {
            id: editingSessionID || String(Date.now()), // editing session ID else timestamped unique id 
            time: formatTime(dateToSeconds(timeValue)), // convert date to seconds first
            location: location.trim(),
            notes: notes.trim(),
        };

        setSessionsByDate((prev) => {
            const existing = prev[selectedDate] || []; // get sessions for selected date or just empty list
            
            if (editingSessionID){
                // session editing mode - session already exist
                // find session by id and replace
                const updated = existing.map((s) =>
                    s.id === editingSessionID ? newSession : s
                );
                return {...prev,[selectedDate]: updated};
            }else{
                // new session
                return {...prev, [selectedDate]: [...existing, newSession]};
            }
        });

        // reset
        setModalVisible(false); // modal hidden
        setEditingSessionID(null);
        setLocation("");
        setNotes("");
    };
    
    const editSession = (item) => {
        // refill fields
        setEditingSessionID(item.id);
        setLocation(item.location);
        setNotes(item.notes);

        // refill date - convert time into date
        const [hours, minutes] = item.time.split(":").map(Number);
        const newDate = new Date();
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        setTimeValue(newDate);

        setModalVisible(true);
        loadPresetLocations();
    };


    const deleteSession = (id) => {
        setSessionsByDate((previous) => {
            const updated = (previous[selectedDate] || []).filter((s) => s.id !== id);
            
            if (updated.length === 0) {
                // deleting date fully so that [] doesn't show a dot on calendar
                const newSession = {...previous};
                delete newSession[selectedDate];
                return newSession;
            }
    
            return {...previous, [selectedDate]: updated};
        });
    };


    const getDirections = (locationName) => {
        navigation.navigate("Travel", {
            destination: locationName
        });
    };
    

    // modal for session creating and editing
    // renders
    const renderSessionModal= () => (
        <Modal visible={modalVisible} animationType="slide">
            <View style={styles.modal}>
                <Text style ={styles.presetLocationText}>Session Location</Text>
                <View style={styles.scheduleDropBox}>
                    <SelectList
                        setSelected={(val) => {setLocation(val);}}
                        style={styles.dropshadow}
                        data={dropdownLocations}
                        save="value"
                        placeholder="Select preset location"
                        notFoundText="No preset locations - Add one in settings."
                    />
                </View>
                <Text style={styles.sessionNoteText}>Session Notes</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Enter notes (optional)"
                    value={notes}
                    onChangeText={setNotes}
                    multiline={true}
                    numberOfLines={4}
                />

                <Text style ={styles.selectedTimeText}>Selected Time: {formatTime(dateToSeconds(timeValue))}</Text>

                <View >
                    <Pressable style={[styles.dropshadow]}  onPress={() => setShowTimePicker(!showTimePicker)}>
                        <LinearGradient
                            colors={['#42aad4', '#9fcce3']}
                            style={styles.homeButtons}>
                            <Text style={styles.homeButtonsText}>Pick A Time</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
                <View>
                {showTimePicker && (
                        <DateTimePicker
                            value={timeValue}
                            mode="time"
                            is24Hour={true}
                            display="spinner" // IOS wheel/spinner
                            onChange={onTimeChange}
                            themeVariant="light" 
                        />
                    )}
                </View>
                <Pressable style={[styles.dropshadow]}  onPress={saveSession}>
                    <LinearGradient
                            colors={['#42aad4', '#9fcce3']}
                            style={styles.homeButtons}>
                            <Text style={styles.homeButtonsText}>{editingSessionID ? "Save Changes" : "Add Session"}</Text>
                        </LinearGradient>
                </Pressable>
                <View>
                <Pressable style={[styles.modalCancelButton, styles.dropshadow ]} onPress={() => setModalVisible(false)}>
                    <Text style={styles.schedulePageButtonGenericText}>Cancel</Text>
                </Pressable>
                </View>
            </View>
        </Modal>
    )

    return (
    
        <ScrollView 
            style= {{flex: 1}}
            contentContainerStyle = {styles.container}
        >
            <Text style = {styles.scheduleTitle}>Dialysis Schedule</Text>

            <MyCalendar
                selectedDate={selectedDate}
                markedDates={markedDates}
                onDayPress={handleDayPress}
            />


            {
            // check if user has selected a date and print appropriate message
              !selectedDate ? null : (
                <>
                  {sessionsForSelectedDate.length !== 0 ? (
                    <Text style={styles.listTitle}>Sessions for selected date</Text>
                  ) : (
                    <Text style={styles.listTitle}>No Sessions for selected date</Text>
                  )}
                </>
              )
            }

            {/* need to use map instead of flat list as cant use scroll view and flatlist together */}
            {sessionsForSelectedDate.map((item) => (
                <View key={item.id} style={styles.sessionScheduleContainer}>
                    <View style={styles.sessionListRow}>
                         {/* every jsx element here gets a segment */}
                        <Text style={styles.sessionListRowTitle}>
                            {item.location} - {item.time}
                        </Text>

                         {/* if notes exists add a tab for it */}
                        {item.notes ? (
                            <Text style={styles.sessionListRowNotes}>{item.notes}</Text>
                        ) : null}

                         {/* Add edit delete pressables */}
                        <View style={styles.schedulePageButtonContainer}>
                            <Pressable style={styles.schedulePageButtonGeneric} onPress={() => editSession(item)}>
                                <Text style={styles.schedulePageButtonGenericText}>Edit</Text>
                            </Pressable>

                            <Pressable style={styles.schedulePageButtonGeneric} onPress={() => getDirections(item.location)}>
                                <Text style={styles.schedulePageButtonGenericText}>Directions</Text>
                            </Pressable>

                            <Pressable style={styles.scheduleDeleteButton} 
                                    onPress={() => deleteSession(item.id)}>
                                <Text style={styles.schedulePageButtonGenericText}>Delete</Text>
                            </Pressable>

                        </View>
                    </View>
                </View>
            ))}
        
            {selectedDate && (
                <Pressable style={[styles.dropshadow]}  onPress={() => {
                    setEditingSessionID(null);
                    setLocation("");
                    setNotes("");
                    setModalVisible(true);
                    loadPresetLocations();
                }}>
                    <LinearGradient
                        colors={['#42aad4', '#9fcce3']}
                        style={styles.homeButtons}>
                        <Text style={styles.homeButtonsText}>Add Session to Date</Text>
                    </LinearGradient>
                </Pressable>
            )}

            {/* Render modal - may or may not be visible */}
            {renderSessionModal()}

        </ScrollView>
    );
}
