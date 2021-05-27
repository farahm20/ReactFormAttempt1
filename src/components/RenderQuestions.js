import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import TextQuestionsTwo from './TextQuestionsTwo'
import Question from './Question'

//Picks questions from Firebase and shows them on screen. 

function Render() {
    const [question, setQuestions] = useState([])

    useEffect(() => {
        firebase
            .firestore()
            .collection("TestingQuestions")
            .orderBy("id", "asc")
            .onSnapshot((snapshot) => {
                const getQuestion = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setQuestions(getQuestion)
            })
    }, [])

    return question
}

// const renderQuestionText = (questions) => {
//     return questions.map(question => {
//         let { id, text, type, questionType } = question;
//         // console.log(id);
//         // console.log(text);
//         // console.log(type);
//         // console.log(questionType);
//     })
// }

const RenderQuestions = () => {
    const questions = Render()
    // console.log(questions)
    // renderQuestionText(questions)


    return (
        <div>
            <ol>
                {
                    questions.map((question) => (
                        <Question
                            key={question.id}
                            question={question}
                            label={question.id}
                        />
                    ))
                }
            </ol>
        </div>
    )
}

export default RenderQuestions
