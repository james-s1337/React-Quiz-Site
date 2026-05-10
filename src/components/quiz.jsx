import { useState } from "react"
import Results from './results'

const Quiz = () => {
    const questionBank = [
        {
            question: "What is the capital of Indonesia?",
            options: ["Bandung", "Hanoi", "Jakarta", "Kuala Lumpur"],
            answer: "Jakarta",
        },
        {
            question: "What mountain range is Mount Everest in?",
            options: ["The Rockies", "The Andes", "The Himalayas", "The Alps"],
            answer: "The Himalayas",
        },
        {
            question: "How many continents are there in the world?",
            options: ["8", "7", "6", "5"],
            answer: "7",
        },
        {
            question: "What is the capital of Australia?",
            options: ["Canberra", "Sydney", "Melbourne", "Perth"],
            answer: "Canberra",
        },
        {
            question: "How many oceans are there?",
            options: ["7", "3", "4", "5"],
            answer: "5",
        },
        {
            question: "What country is the Stonehenge found in?",
            options: ["France", "England", "Scotland", "Austria"],
            answer: "England",
        },
        {
            question: "What is the capital of Kenya?",
            options: ["Kampala", "Nairobi", "Cape Town", "Freetown"],
            answer: "Nairobi",
        },
        {
            question: "What is the most populous city in China by administrative area?",
            options: ["Guangzhou", "Chongqing", "Beijing", "Shanghai"],
            answer: "Chongqing",
        },
        {
            question: "What is the primary language of Brazil?",
            options: ["Spanish", "Portuguese", "English", "Brazilian"],
            answer: "Portuguese",
        },
        {
            question: "The Amazon River is the longest river in the world.",
            options: ["True", "False"],
            answer: "False",
        },
        {
            question: "Kazakhstan only has one official language, Russian.",
            options: ["True", "False"],
            answer: "False",
        },
        {
            question: "Japan experiences the most earthquakes out of all countries in the world.",
            options: ["True", "False"],
            answer: "True",
        },
    ];

    const quizIndexLen = questionBank.length-1;

    const initialAnswers = Array(questionBank.length).fill(null);
    const [userAnswers, setUserAnswers] = useState(initialAnswers);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const selectedAnswer = userAnswers[currentQuestion];

    const [isQuizFinished, setIsQuizFinished] = useState(false);

    function handleSelectOption(option) {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[currentQuestion] = option;

        setUserAnswers(newUserAnswers);
    }

    function goToNext() {
        if (currentQuestion < quizIndexLen) {
            setCurrentQuestion(currentQuestion + 1);
        }
        else {
            setIsQuizFinished(true);
        }
    }

    function goToPrev() {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }

    function restartQuiz() {
        setUserAnswers(initialAnswers);
        setCurrentQuestion(0);
        setIsQuizFinished(false);
    }

    if (isQuizFinished) {
        return <Results userAnswers={userAnswers} questionBank={questionBank} restartQuiz={restartQuiz}/>
    }

    return (
    <div> 
        <h2> Question {currentQuestion+1}</h2> 
        <p className='question'> {questionBank[currentQuestion].question}</p>

        
        {questionBank[currentQuestion].options.map((option) => (
            // () => funcName(params...) used when params needed
            <button className={'option'+ (selectedAnswer === option ? ' selected' : '')} onClick={() => handleSelectOption(option)}> 
                {option}
            </button> 
        ))}

        

        <div className='nav-buttons'>
            <button onClick={goToPrev} disabled={currentQuestion === 0} > Previous</button>
            <button onClick={goToNext} disabled={!selectedAnswer}> 
                {currentQuestion === quizIndexLen ? 'Finish Quiz' : 'Next'}
            </button>
        </div>
    </div>
    );
}

export default Quiz;