import { useState } from "react";
import { View, Text, Pressable} from "react-native";
import { useAppStyles } from "../../styles";
import { getRandomTrivia } from "../../API/triviaAPI";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import he from "he"; // HTML encode and decode functions

export default function Trivia({ navigation }) {

  const styles = useAppStyles();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState(null);
  const [gameState, setGameState] = useState(false);
  const [disabled, setDisabled] = useState([]);

  const startGame = async () => {
    const triviaResults = await getTrivia("9", "medium");
    setResults(triviaResults);
    getNextQuestion(triviaResults);
  };

  const getTrivia = async (category, difficulty) => {
    const data = await getRandomTrivia(10, category, difficulty);
    if (!data) {
      return null;
    }
    return data.results;
  };

  const shuffleAnswers = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getNextQuestion = async (currentResults) => {
    let newResults = [...currentResults];
  
    if (newResults.length === 0) {
      setLoading(true)
      const moreTrivia = await getTrivia("9", "medium");
      setLoading(false)
      if (moreTrivia) {
        newResults = moreTrivia;
      } else {
        setGameState(false);
        return;
      }
    }
  
    const currentResult = newResults.pop();
    setResults(newResults);

    if (currentResult) {
      setGameState(true);

      const decodedQuestion = he.decode(currentResult.question);
      const decodedCorrect = he.decode(currentResult.correct_answer);
      const decodedIncorrect = currentResult.incorrect_answers.map((answer) =>
        he.decode(answer)
      );

      const allAnswers = shuffleAnswers([
        decodedCorrect,
        ...decodedIncorrect,
      ]);

      setQuestion(decodedQuestion);
      setCorrect(decodedCorrect);
      setAnswers(allAnswers);
      setDisabled([]);
    } else {
      setGameState(false);
    }
  };

  const AnswerCheck = (answer, index) => {
    if (answer === correct) {
      getNextQuestion(results);
    } else {
      setDisabled((prev) => [...prev, index]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.triviaTitle}>Trivia</Text>

      {!gameState ? (
          <View style={{alignItems: "center"}}>
            <MaterialIcons name="quiz" size={120} color="black" />
            <Text style={styles.crossworddescription}>Test your trivia knowledge with questions only for the best!</Text>
              {loading && (
                <Text>Loading...</Text>
              )}

            <Pressable style = {styles.startTriviaGameButton} onPress={() => startGame()}>
                <Text style = {styles.startTriviaGameButtonText}> Play Game</Text>
            </Pressable>
          </View>
      ) : (
        <View style={[styles.startContainer, styles.dropshadow]}>
          <Text style = {styles.triviaQuestionText}>{question}</Text>
          
          {answers.map((answer, index) => (
            <Pressable 
              key={index} 
              style={[styles.triviaAnswerButton,disabled.includes(index) && styles.disabledButton]} 
              title={answer} 
              onPress={() => AnswerCheck(answer,index)} 
            >
                <Text style={styles.triviaAnswerButtonText}>{answer}</Text>
            </Pressable>
          ))}
        </View>
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
