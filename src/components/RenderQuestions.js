import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import Question from './Question'

function Render() {
    const [question, setQuestions] = useState([])

    useEffect(() => {
        firebase
            .firestore()
            .collection("ClientQuestions")
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

const RenderQuestions = () => {
    const questions = Render()

    return (
        <div>
            <ol>
                {
                    questions.map((question) => (
                        <Question
                            key={question.id}
                            question={question} />
                    )
                        /* <li key={question.id}>
                            <label className="form-question">{question.text}</label>
                            <p>{question.questionType}</p>
                            <p>{question.answerFlag}</p>
                        </li> */

                    )}

            </ol>
        </div>
    )
}

export default RenderQuestions
