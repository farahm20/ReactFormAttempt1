import React, { useState } from 'react';
import { useData } from '../DataContext';

import { useForm } from "react-hook-form";

import { FormControlLabel, TextareaAutosize } from '@material-ui/core';
import Checkbox from "@material-ui/core/Checkbox";
import { Validators } from "../Validation/Validator"
import TextQuestionsTwo from "./TextQuestionsTwo";
import TextQuestions from "./TextQuestions";
import CheckboxQuestions from "./CheckboxQuestions";


//checks question type and render's respective class. 

function checkQuestionType(question) {
    const toRender = question.questionType;
    return toRender;
}

const Question = ({ question }) => {
    // const { handleSubmit, } = useForm
    // const { setValues, data } = useData();
    const questionOptions = question.options;
    const typeResult = checkQuestionType(question);

    const [value, setValue] = useState('');

    const handleChange = (value) => {
        console.log("In question: handle change", value)
        setValue(value.onChange);
    }

    // const onSubmit = (data) => {
    //     console.log("in submit")
    //     console.log(data)
    //     setValues(data)
    // }

    return (
        <div className="form-control">
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <div className="form-question">
                <h3 style={{ color: 'red', }}>{question.id}</h3>
                <h3 style={{ color: 'red', }}> - </h3>
                <h3> {question.text}</h3>

            </div>
            <div className="form-options">
                {
                    questionOptions.map(
                        (choice, index) => <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    name={choice}
                                    value={choice}
                                    label={choice}
                                />
                            }
                            label={choice}
                        />
                    )
                }
            </div>
            <div style={{ color: 'green', }}>
                {(() => {
                    switch (typeResult) {
                        case 'TextQuestions':
                            return <TextQuestionsTwo
                                value={value}
                                placeholder="Testing input"
                                type="text"
                                label={question.id}
                                key={question.id}
                                question={question}
                            // validators={[
                            //     {
                            //         check: Validators.required,
                            //         message: "This field is required."
                            //     }
                            // ]}
                            />;
                        case 'CheckboxQuestions':
                            return <CheckboxQuestions
                                key={question.id}
                                question={question} />;
                            {/* case 'Email':
                            return <Email />;
                        case 'Number':
                            return <Number />; */}
                        default:
                            return null;
                    }
                })()}
                {/* {typeResult ? <TextQuestions /> : <CheckboxQuestions />} */}
                {/* <input className="button"
                        type="submit"
                        placeholder="submit"
                    /> */}
            </div>
            {/* </form> */}
        </div>
    )
}



export default Question