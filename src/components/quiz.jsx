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
            question: "What country is Mount Everest in?",
            options: ["Nepal", "China", "India", "Bhutan"],
            answer: "Nepal",
        },
        {
            question: "How many continents are there in the world?",
            options: ["8", "7", "6", "5"],
            answer: "7",
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

    if (isQuizFinished) {
        return <Results userAnswers={userAnswers} questionBank={questionBank} />
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