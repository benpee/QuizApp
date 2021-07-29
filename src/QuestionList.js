import React, {useState} from "react";

function QuestionList ({answers, question, selected}) {
const [answer, setAnswer] = useState(answers)

  return <div>
  <div>{question}</div>
  {answer.map((text, i) => 
  (<button key={i} onClick={()=> { setAnswer([text]); selected(text);}}>{text}</button>))}
  </div>
}

export default QuestionList