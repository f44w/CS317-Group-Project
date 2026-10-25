import {useMemo} from 'react';
import { StyleSheet} from 'react-native'
import {useFontSize} from "./Helpers/FontSizeHelper";

const buttonColour = '#00bfff';
const headerColour= 'black';
const buttonTextColour = '#ffffff'
const deleteButon = '#ff0000';

export function useAppStyles() {
  const {fontScale} = useFontSize();

  const fs = (size) => Math.round(size * fontScale);

  // rebuild only when font scale changes
  return useMemo(() => {
    return StyleSheet.create({

      container: { 
      flex: 1 ,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
      /* -----TRAVEL PAGE-----*/

    map: { 
      flex: 1, 
      width: "100%" },

    errorText: { 
      fontSize: fs(16), 
      marginTop: 6,
      color: "red"},
      
    weatherContainer: {
      position: "absolute",
      top: 50,
      left: 20,
      right: 20,
      padding: 12,
      borderRadius: 12,
      backgroundColor: '#ffffff',
      alignItems: "center",
    },

    centerbuttoncontainer: {
      position: "absolute",
      bottom: 30, 
    },

    weatherTemp: {
      fontSize: fs(28),
      fontWeight: "bold",
    },

    weatherDesc: {
      fontSize: fs(16),
      marginTop: 4,
      textTransform: "capitalize",
    },

    destinationText: {
      marginTop: 6,
      fontSize: fs(14),
      color: "#555",
    },

    locateButton: {
      padding: 10,
      marginBottom: 5,
      alignItems: "center",
      backgroundColor: buttonColour,
      borderRadius: 10,
    },

    locateButtonText: {
      fontSize: fs(14),
      fontWeight: "bold",
      color: "#fff"

    },

      /* -----SESSION PAGE-----*/

    countdownHeader: {
      alignItems: "center",
      padding: 10,
    },
    countdownContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '52%',
      marginBottom: 5,
    },
    countdownAdjustmentButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16,
      marginTop: 8,
      },
    sessionButtonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      width: '100%',
    },
    sessionTimerButton: {
      backgroundColor: "white",
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 10,
      padding: 10,
    },
    sessionTimerButtonText: {
      color: 'black',
      fontWeight: 'bold', 
      fontSize: fs(18),
    },
    sessionCountdownText: {
      color: '#fff',
      fontWeight: "bold", 
      fontSize: 40, 
    },

    sessionButtonText: {
      fontSize: fs(16),
      fontWeight: "bold",
      textAlign: "center"
    },

    /* -----HOME PAGE----- */
    homeBanner: {
      padding: 20,
    },
    homeTitle: {
      fontSize: fs(40),
      fontWeight: 'bold',
      marginTop: 20,
      color: "white",
      textAlign: "center",
    },
    homeSubtitle: {
      fontSize: fs(18),
      fontWeight: 'bold',
      marginTop: 10,
      textAlign: "center",
      color: "white"
    },
    homeSessionTitle: {
      fontSize: fs(18),
      fontWeight: 'bold',
      marginTop: 10,
      textAlign: "left",
      color: "black",
    },
    homeText: {
      fontSize: fs(16),
      marginTop: 5,
    },

    homeSessionInfoContainer: {
      marginTop: 20,
      padding: 15,
      borderColor: '#ccc',
      borderRadius: 10,
      width: '80%',
      backgroundColor: "white",
      alignItems: 'center', 

      },

    homeButtons: {
      padding: 15,
      marginTop: 15,
      alignItems: "center",
      borderRadius: 10,
    },

    dropshadow: {
      shadowColor: '#171717',
      shadowOffset: {width: -1, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },

    homeButtonsText: {
      fontSize: fs(16),
      fontWeight: "bold",
      color: buttonTextColour,
    },
    homeButtonCarousel: {
      width: 140,
      height: 150,
      marginRight: 10,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      padding: 15,
    },
    homeButtonTextCarousel: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
    },
    homeScrollContainer: {
      padding: 20,
    },
    homeAddSessionButtonContainer: {
      alignItems: "center",
      marginTop: 10,
    },

    homeAddSessionButton: {
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 8,
    },

    homeAddSessionButtonText: {
      color: buttonTextColour,
      fontSize: 14,
      textAlign: "center",
    },
   
  /* ---- SCHEDULE PAGE ---- */
  scheduleTitle: {
      marginTop: 30,
      fontSize: fs(24),
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
      color: headerColour,
    },

    selectedTextContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },

    selectedText: {
      marginTop: 10,
      marginBottom: 6,
      fontSize: fs(16),
    },

    listTitle: {
      marginTop: 12,
      marginBottom: 6,
      fontSize: fs(16),
      fontWeight: "bold",
    },

    sessionListRow: {
      width: "100%",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: "#e5e7eb",
      alignItems: "center",
      marginTop: 10,
    },

    sessionListRowTitle: {
      fontSize: fs(18),
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
    },

    sessionListRowNotes: {
      fontSize: fs(14),
      marginTop: 4,
      textAlign: 'center',
    },

    modal: {
      paddingTop: 100,
      backgroundColor: "white",
      alignItems: "center"
    },

    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 10,
      marginBottom: 20,
      marginVertical: 5,
      height: 80,
      width: "80%",
      textAlignVertical: 'top',
    },

    calendar:{
      borderWidth: 1,
      borderRadius: 10,
      borderColor: 'gray',
      width: "90%"
    },
      
    sessionScheduleContainer:{
      alignSelf: 'center',
      width: "90%",
    },
      
    schedulePageButtonGeneric: {
      padding: 10,
      marginBottom: 25,
      alignItems: "center",
      backgroundColor: buttonColour,
      borderRadius: 10,
    },

    scheduleDeleteButton: {
      padding: 10,
      marginBottom: 25,
      alignItems: "center",
      backgroundColor: deleteButon,
      borderRadius: 10,
    },
    
      
    schedulePageButtonGenericText: {
      fontSize: fs(16),
      fontWeight: "bold",
      color: buttonTextColour,
    },
      
    schedulePageButtonContainer: {
      flexDirection: "row",
      gap: 8, 
      marginTop: 4,
    },

    scheduleDropBox: { 
      width: "80%", 
      alignSelf: "center", 
      zIndex: 1000,
    },
      
    modalCancelButton: {
      padding: 15,
      alignItems: "center",
      backgroundColor: "#ff0000",
      borderRadius: 10,
      marginTop: 30,
    },

    scheduleTimePickerButtonText: {
      fontSize: fs(16),
      fontWeight: "bold",
      color: buttonTextColour,
    },
    
    selectedTimeText : {
      fontSize: fs(16),
      fontWeight: 'bold',
      textAlign: "center",
      marginBottom: 10,
    },

    presetLocationText : {
      fontSize: fs(16),
      fontWeight: 'bold',
      textAlign: "center",
      marginBottom: 8,
    },

    sessionNoteText:{
      fontSize: fs(16),
      marginTop: 20,
      textAlign: "center",
      marginBottom: 8,
      fontWeight: 'bold',
    },
    


    /* ---- SETTINGS PAGE ---- */

    settingsTitle: {
      fontSize: fs(22),
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
      color: "black",
      },

    settingsText: {
      fontSize: fs(16),
      marginBottom: 16,
      textAlign: "center",
      },

    settingsButtonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "80%",
      marginBottom: 10,
      alignSelf: "center",
    },

    settingsFontSizeButton: {
      flex: 1,
      padding: 10,
      marginHorizontal: 5,
      alignItems: "center",
      backgroundColor: buttonColour,
      borderRadius: 10,

    },

    sessionBanner: {
      padding: 20,
      alignItems: "center",
    },

    settingsSectionCard: {
      marginTop: 15,
      padding: 15,
      borderColor: '#ccc',
      borderRadius: 10,
      width: '90%',
      backgroundColor: "white",
    },

    settingsLocationsButton: {
      padding: 10,
      marginBottom: 10,
      alignItems: "center",
      backgroundColor: buttonColour,
      borderRadius: 10,
  
    },

    settingsLocationButtonsText: {
      fontSize: fs(16),
      fontWeight: "bold",
      color: buttonTextColour,
    },

    settingsFontSizeButtonsText: {
      fontSize: fs(12),
      fontWeight: "bold",
      color: buttonTextColour,
    },

    settingsDeleteButton: {
      padding: 10,
      marginTop: 8,
      alignItems: "center",
      backgroundColor: deleteButon,
      borderRadius: 10,
    },

    settingsDeleteButtonText: {
      fontSize: fs(14),
      fontWeight: "bold",
      color: buttonTextColour,
    },

    settingsModalButton: {
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: buttonColour,
      paddingVertical: 12,
    },

    settingsModalButtonText: {
      fontSize: fs(18),
      fontWeight: "bold",
      color: buttonTextColour,
    },

    settingsModalCancelButton: {
      padding: 16,
      marginTop: 10,
      alignItems: "center",
      backgroundColor: deleteButon,
      borderRadius: 10,
      marginBottom: 14,
    },

    settingsModalCancelButtonText: {
      fontSize: fs(16),
      fontWeight: "bold",
      color: buttonTextColour,
    },

    settingsPresetLocationsInput: {
      width: "100%",
      marginBottom: 14,
      paddingVertical: 18,
      textAlign: "center",
      marginBottom: 20,
    },

      /* ---- SESSION PAGE ---- */
    sessionButtonContainer: {
      flexDirection: 'row',
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: 10,
    },
    sessionButton: { 
      backgroundColor: "white",
      margin: 5,
      marginTop: 5,
      width: 175,
      height: 175,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },

    sessionGoBackButton: {
      padding: 10,
      marginTop: 8,
      alignItems: "center",
      backgroundColor: buttonColour,
      width: "80%",
      borderRadius: 25,
    },

    sessionGoBackButtonText: {
      fontSize: fs(20),
      fontWeight: "bold",
      color: buttonTextColour,
    },


    /* ---- JOKE PAGE ---- */
    joke: {
      textAlign: "center",
      fontSize: fs(20),
      marginTop: 20,
      fontWeight: "bold",
    },
    jokePunchline: {
      textAlign: "center",
      fontSize: fs(22),
      marginTop: 20,
    },

    jokeContainer: {
      alignItems: "center"
    },

    jokeHeading: {
      textAlign: "center",
      fontSize: fs(18),
      marginTop: 20,
      marginBottom: 26,
    },

    newJokeButton: {
      padding: 10,
      marginTop: 8,
      marginBottom: 20,
      alignItems: "center",
      backgroundColor: buttonColour,
      borderRadius: 10,
    },

    newJokeButtonText: {
      fontSize: fs(14),
      fontWeight: "bold",
      color: buttonTextColour,
    },

    jokeGoBackButton: {
      padding: 10,
      alignItems: "center",
      backgroundColor: buttonColour,
      borderRadius: 10,
      marginTop: 20,
    },

    jokeGoBackButtonText: {
      fontSize: fs(14),
      fontWeight: "bold",
      color: buttonTextColour,
    },


    /* ---- STRETCHING PAGE ---- */

    stretchingTitle: {
      fontSize: fs(24),
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
      color: headerColour,
    },

    stretchingSubTitle: {
      fontSize: fs(16),
      marginBottom: 30,
    },

    stretchingRoutineButton: {
      width: "80%",
      backgroundColor: buttonColour,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 15,
    },

    stretchingRoutineButtonText: {
      color: buttonTextColour,
      fontSize: fs(18),
      fontWeight: "bold",
    },

    showSelectedRoutine: {
      width: "85%",
      marginTop: 5,
      marginBottom: 5,
      padding: 12,
      backgroundColor: "#f5f5f5",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#ccc",
    },

    selectedRoutineTitle: {
      fontSize: fs(20),
      fontWeight: "bold",
      color: headerColour,
      marginBottom: 12,
      textAlign: "center",
    },

    selectedRoutineText: {
      fontSize: fs(16),
      color:  "#222",
      marginBottom: 8,
    },

    /* ---- STEP COUNTER PAGE ---- */
    stepCounterContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    stepCounterCard: {
      marginTop: 20,
      width: "80%",
      backgroundColor: "white",
      padding: 20,
      alignItems: "center",
      marginBottom: 20,
      borderRadius: 20,
    },

    stepCounterTitle: {
      fontSize: fs(24),
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
      color: headerColour,
    },

    stepCounterTotal: {
      fontSize: fs(20),
      fontWeight: "bold",
      marginBottom: 15,
    },

    stepCounterLabel: {
      fontSize: fs(16),
      marginBottom: 15,

    },

    stepCounterText: {
      fontSize: fs(15),
      marginTop: 6,
      textAlign: "center",
    },

    
    stepCounterGoalBox: {
      width: "85%",
      marginTop: 20,
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
    },

    
    stepCounterGoalText: {
      fontSize: fs(18),
      fontWeight: "bold",
      textAlign: "center",
    },

    backToActivityButton: {
      marginTop: 15,
    },

    /* ---- MINDFULNESS PAGE ---- */
    mindfulnessTextGeneric:{
      marginTop: 20,
      textAlign: 'center',
      fontSize: fs(16),
    },

    mindfulnessContentContainer: {
      alignItems: 'center',
      paddingBottom: 20
    },

    slider:{
      width: 310, 
      height: 40,
    },

    sliderTickMarksContainer:{
      flexDirection: "row",
      justifyContent: "space-between",
      width: 295,
    },

    sliderTickMark:{
      alignItems: "center",
    },

    sliderTickText:{
      fontSize: fs(14),
      color: "black",
      fontWeight: 'bold',
    },
      
    mindfulnessSubTitleText: {
      marginTop: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: fs(16),
    },
      
    moodButtonsContainer:{
      flexDirection: "row",
      gap: 8, 
      marginTop: 4,
      justifyContent: 'space-between',
    },

    moodButtonGeneric: {
      padding: 10,
      marginBottom: 25,
      alignItems: "center",
      borderRadius: 10,
    },

    moodButtonTextGeneric: {
      fontSize: fs(16),
      fontWeight: "bold",
      color: buttonTextColour,
    },
      
    breathingExercisesTitleText:{
      fontSize: fs(18),
      fontWeight: "bold",
      color: '#000000',
      textAlign: 'center',
    },
      
    breathingExercisesContainer:{
      marginTop: 20,
      marginBottom: 30,
      textAlign: 'center',
    },

    
    /* ---- CONVERSATION STARTER PAGE ---- */

    starter: {
      textAlign: "center",
      fontSize: fs(20),
      marginTop: 20,
      fontWeight: "bold",
    },

    conversationStarterContainer: {
      alignItems: "center"
    },

    startersTitle: {
      textAlign: "center",
      fontSize: fs(18),
      marginTop: 20,
      marginBottom: 26,
      fontWeight: "bold",
    },

    startersSubTitle: {
      textAlign: "center",
      fontSize: fs(20),
      marginTop: 20,
      marginBottom: 26,

    },

    newStarterButton: {
      padding: 10,
      marginTop: 8,
      marginBottom: 20,
      alignItems: "center",
      backgroundColor: buttonColour,
      borderRadius: 10,
    },

    newStarterButtonText: {
      fontSize: fs(14),
      fontWeight: "bold",
      color: buttonTextColour,
    },

    starterGoBackButton: {
      padding: 10,
      alignItems: "center",
      backgroundColor: buttonColour,
      borderRadius: 10,
      marginTop: 20,
    },

    starterGoBackButtonText: {
      fontSize: fs(14),
      fontWeight: "bold",
      color: buttonTextColour,
    },

    /* ---- TRIVIA PAGE ---- */

    triviaTitle: {
      fontSize: fs(40),
      fontWeight: "bold",
      color: headerColour,
    },

    startContainer: {
      borderRadius: 40,
      backgroundColor: "white",
      padding: 30,
      margin: 10,
      width: "90%",
    },

    triviaQuestionText: {
      fontSize: fs(18),
      textAlign: "center",
      marginBottom: 16,
    },

    triviaAnswerButton: {
      backgroundColor: buttonColour,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginTop: 10,
      alignItems: "center",
      alignSelf: "stretch",
    },

    disabledButton: {
      backgroundColor: 'gray',
    },

    triviaAnswerButtonText: {
      fontSize: fs(16),
      textAlign: "center",

    },

    startTriviaGameButton: {
      padding: 10,
      paddingHorizontal: 50,
      alignItems: "center",
      backgroundColor: buttonColour,
      width: "80%",
      borderRadius: 25,
      marginTop: 20,
    },

    startTriviaGameButtonText: {
      fontSize: fs(20),
      fontWeight: "bold",
      color: buttonTextColour,
      textAlign: "center"
    },

    /* ---- CROSSWORD PAGE ---- */

    crosswordtitle: {
      fontSize: fs(40),
      fontWeight: 'bold',
      marginTop: 20,
      color: "black",
      textAlign: "center",
    },
    crossworddescription: {
      fontSize: fs(20),
      marginTop: 20,
      color: "black",
      textAlign: "center",
    },

    cellContainer: {
      flex: 1,
      height: 70,
      borderWidth: 1,
      borderColor: "#ccc",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    cellInput: {
      width: "100%",
      height: "100%",
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold"
    },
    disabledcell: {
      backgroundColor: "black",
    },
    clueNumber: {
      position: "absolute",
      color: "gray",
      top: 2,
      left: 2,
      fontSize: 20,
    },

    startbutton: {
      padding: 10,
      marginTop: 8,
      alignItems: "center",
      backgroundColor: buttonColour,
      width: "80%",
      borderRadius: 25,
    },

    startbuttontext: {
      fontSize: fs(20),
      fontWeight: "bold",
      color: buttonTextColour,
    },


    clues: {
      padding: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    column: {
      flex: 1,
      marginHorizontal: 8,
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 4,
    },
    clueText: {
      marginBottom: 2,
    },

    bottomButtonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingBottom: 30,
      paddingHorizontal: 20,
    },

    /* ---- FACTS PAGE ---- */
    fact: {
      textAlign: "center",
      fontSize: fs(20),
      marginTop: 20,
      fontWeight: "bold",
      marginBottom: 20,
    },

    factContainer: {
      alignItems: "center"
    },

    factHeading: {
      textAlign: "center",
      fontSize: fs(18),
      marginTop: 20,
      marginBottom: 26,
    },

    newFactButton: {
      padding: 10,
      marginTop: 8,
      marginBottom: 20,
      alignItems: "center",
      backgroundColor: buttonColour,
      borderRadius: 10,
    },

    newFactButtonText: {
      fontSize: fs(14),
      fontWeight: "bold",
      color: buttonTextColour,
    },

    factGoBackButton: {
      padding: 10,
      marginTop: 8,
      alignItems: "center",
      backgroundColor: buttonColour,
      borderRadius: 10,
      marginTop: 20,
    },

    factGoBackButtonText: {
      fontSize: fs(14),
      fontWeight: "bold",
      color: buttonTextColour,
    },

    });
  }, [fontScale]);
}
