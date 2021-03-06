import React, { useEffect, useState } from "react"
import Answers from "./answers";

export default function Game(props){

    const [answers, setAnswers] = useState(loadAnswers())
    
    function loadAnswers(){
        const ansArr = [];
        let randomNum = Math.floor(Math.random() * 4)
        let count = 0;
        for(let i=0;i<4;i++){
            if(i === randomNum){
                ansArr.push({"answer": props.correct_answer,
                    "isChosen": false, "correct": true, "isRight": 0});     // isRight - 0 means no answer, 1 means right and -1 means wrong 
            }
            else{
                ansArr.push({"answer": props.answers[count],
                    "isChosen": false, "correct": false, "isRight": 0})
                count++;
            }
        }
        return ansArr;
    }

    useEffect(() => {
        setAnswers(loadAnswers())
    },[props.question])

    useEffect(() => {
        for(let i=0;i<4;i++){
            if(answers[i].isRight === 1){
                props.showScore()
            }
        }
    }, [props.revealAnswers])
    
    
    function chooseAnswer(ans){
        setAnswers(prevAns => prevAns.map(data => {
            if(data.answer !== ans && data.isChosen){
                return {...data, "isChosen": !data.isChosen, "isRight": 0};
            }
            else if(data.answer === ans){
               return data.correct ? {...data, "isChosen": true, "isRight": 1} : {...data, "isChosen": true, "isRight": -1};
            }
            else return data;
            
        }))
    }
    
    const answersElement = answers.map((answer, index) => {
        
        return(
            <Answers key={index} answer={answer.answer} isRight={answer.isRight} isChosen={answer.isChosen} chooseAnswer={() => chooseAnswer(answer.answer)} 
                revealAns={props.revealAnswers} isCorrect={answer.correct}/>
        )
    })

    return(
        <div className="question-container">
            <div className="question"><>{props.question}</></div>
            <div className="answers">
                {answersElement}
            </div>
        </div>
    )
}