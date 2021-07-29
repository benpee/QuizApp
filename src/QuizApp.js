import React from "react";
import quizBank from './quizBank'
import QuestionList from './QuestionList'
import Result from './Result'
 
class QuizApp extends React.Component {
state= {
quiz: [],
score: 0, 
response: 0
}
  playAgain = () => {
    this.getQuiz();
    this.setState({
     score: 0,
     response: 0
    })
  }
  computeAnswer = (answer, correctAnswer) => {
   const {score, response} = this.state
   if (answer === correctAnswer) { 
     this.setState({
        score: score + 1
     }) 
   }
   this.setState({
     response: (response < 5) ? response + 1 : 5
   })
  }
  getQuiz = () => {
    quizBank().then(res =>
  this.setState({quiz: res})
  )};
  componentDidMount() {
    this.getQuiz();
  }

  render() {
  return (<div>
   <div>Quiz Bee</div>
    {(this.state.quiz.length > 0 && this.state.response < 5 )&& this.state.quiz.map(({question, answers, correct, questionId}) => <QuestionList key={questionId} answers={answers} question={question} selected={answer => this.computeAnswer(answer, correct)} />)}
    {this.state.response === 5 ? <Result score={this.state.score} playAgain={this.playAgain} /> : null}
    </div>
)
}
}

export default QuizApp