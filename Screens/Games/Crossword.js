import { useState } from "react";
import { View, Text, FlatList, TextInput, Alert, Pressable } from "react-native";
import { useAppStyles } from "../../styles";
import { getRandomCrossword } from "../../API/crosswordAPI"; 
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function Crossword({navigation}) {
  
    // states
    const styles = useAppStyles();
    const [gameState, setGameState] = useState(false);
    const [title, setTitle] = useState("Mini-Crossword");
    const [board, setBoard] = useState([]);
    const [across, setAcross] = useState([]);
    const [down, setDown] = useState([]);

    const [grid, setGrid] = useState(
        Array.from({ length: 25 }, () => "")
      );

    const [clueNumbers, setClueNumbers] = useState(
        Array.from({ length: 25 }, () => null)
      );


    // when user enters a value check for win condition and update grid
    const updateCell = (value, index) => {
        const newGrid = [...grid];
        newGrid[index] = value;
        if (JSON.stringify(newGrid) === JSON.stringify(board)) { 
            Alert.alert(
                'You Win!',
                'You Completed the Mini-Crossword!',
                [
                  { text: 'OK', style: 'default' },
                ]
            );
        }
        setGrid(newGrid);
    };

    // getting the clue numbers for the boxes
    const FindClueNumbers = (boardArr) => {
        const width = 5;
        const numbers = Array(boardArr.length).fill(null);
        let current = 1;

        for (let index = 0; index < boardArr.length; index++) {
          if (boardArr[index] === "") {
            continue;
          }

          const row = Math.floor(index / width);
          const column = index % width;

          // checks if a box has a box above or to the left of itself
          const hasLeft = column > 0 && boardArr[index - 1] !== "";
          const hasAbove = row > 0 && boardArr[index - width] !== "";

          const startsAcross = !hasLeft;
          const startsDown = !hasAbove;

          // if word starts in current box assign current value as its clue number 
          if ((startsAcross || startsDown) && numbers[index] === null) {
            numbers[index] = String(current);
            current += 1;
          }
        }

        return numbers;
      };

      // starts game, calls api and initialises all values 
    const startGame = async () => {
        const data = await getRandomCrossword();
        setBoard(data.board);
        setAcross(data.across);
        setDown(data.down);
        setTitle(data.title);
        setClueNumbers(FindClueNumbers(data.board));
        setGameState(true);
    }

    // render
    return (
        <View style={[styles.container, { alignItems: 'stretch' }]}>
            { !gameState ? (

              <View style={{alignItems: "center"}}>
                <Text style={styles.crosswordtitle}>Mini-Crossword</Text>
                <FontAwesome name="table" size={200} color="black" />
                <Text style={styles.crossworddescription}>All the fun of a regular crossword but you can solve it in seconds!</Text>
                <Pressable style = {styles.startTriviaGameButton} onPress={() => startGame()}>
                  <Text style = {styles.startTriviaGameButtonText}> Play Game</Text>
                </Pressable>
              </View>

            ) : (

              <>
                <FlatList
                  data={grid}
                  numColumns={5}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    const isDisabled = board[index] === "";
                    const numberLabel = clueNumbers[index];

                    return (
                        <View
                            style={[
                                styles.cellContainer,
                                isDisabled && styles.disabledcell
                            ]}
                        >
                        {numberLabel && (
                          <Text style={styles.clueNumber}>{numberLabel}</Text>
                        )}
                        <TextInput
                          style={styles.cellInput}
                          value={item}
                          onChangeText={(text) => updateCell(text, index)}
                          maxLength={1}
                          autoCapitalize="characters"
                          editable={!isDisabled}
                        />
                      </View>
                    );

                  }}
                />

              <View style={[styles.clues, { paddingBottom: 120 }]}> 
                {/* Across Column */}
                <View style={styles.column}>
                  <Text style={styles.heading}>Across</Text>
                  {across.map((clue) => (
                    <Text key={`across-${clue.number}`} style={styles.clueText}>
                      {clue.number}. {clue.clue}
                    </Text>
                  ))}
                </View>

                {/* Down Column */}
                <View style={styles.column}>
                  <Text style={styles.heading}>Down</Text>
                  {down.map((clue) => (
                    <Text key={`down-${clue.number}`} style={styles.clueText}>
                      {clue.number}. {clue.clue}
                    </Text>
                  ))}
                </View>
              </View>
              </>
            )}

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
