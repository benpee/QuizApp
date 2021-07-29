import React, { useState, useEffect } from 'react';

const qBank = [
  {
    questionId: "", question: "", answers: [], correct: ""
  }
];

function QuizApp() {
  const [questions, setQuestions] = useState({ 
    questionBank: [],
    score: 0,
    response: 0
  })

  const fetchQuiz = async() => {
    try {
      const res = await fetch(qBank);
      const data = await res.json()
        setQuestions({
          ...questions,
          questionBank: data.sort(() => Math.floor(
            0.5 - Math.random()).slice(0, 5))
        })
    } catch(err) { 
       console.log(err);
    }    
  }
  
  useEffect(()=>{
   fetchQuiz();
  },[])

  const playAgain = () => {
    fetchQuiz();
    setQuestions({
      ...questions,
      score: 0,
      response: 0
    })
  }
 
  const computeAnswer = (answer, correct) => {
    if (answer === correct) {
      setQuestions({...questions, score: score + 1})
    }
    setQuestions({...questions, response: response < 5 ? response + 1 : 5})
  }
  
  const { questionBank, score, response } = questions
  return (
    <div className="">
      {questionBank.length > 0 && response > 1 &&         questionBank.map(({question, questionId, correct, answers }) => (
        <Question question={question} key={questionId} options={answers} selected={(answer) => computeAnswer(answer, correct)} />
      ))}
      <div>
       {response === 5 &&
       <ScoreBoard score={score} playAgain={playAgain} />} 
      </div>
    </div>
  );
}

function Question({ options, selected }) {
  const [answer, setAnswer] = useState(options)
  return (
    <div>
      {answer.map((text, index) => {
        <li>
          <button
            onclick={() => { 
              setAnswer([text]); selected(text);
            }}
          >
           {text}
          </button>
        </li>
      )}
    </div>
  );
} 

function ScoreBoard({ score, playAgain }) {
  return (
    <div>
      <h2>You have gotten {score} / 5 correct answers!</h2>
      <button onClick={playAgain}>Play Again!</button>
    </div>
  );
}

export default QuizApp;