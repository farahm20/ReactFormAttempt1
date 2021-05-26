import React, { useState } from 'react';

import { FormControlLabel, TextareaAutosize } from '@material-ui/core';
import Checkbox from "@material-ui/core/Checkbox";
import { Validators } from "../Validation/Validator"
import TextQuestions from "./TextQuestions";
import CheckboxQuestions from "./CheckboxQuestions";


//checks question type and render's respective class. 

function checkQuestionType(question) {
    const toRender = question.questionType;
    return toRender;
}

const Question = ({ question }) => {
    const questionOptions = question.options;
    const typeResult = checkQuestionType(question);

    const [value, setValue] = useState('');

    const handleChange = (value) => {
        console.log("In question: handle change", value)
        setValue(value.onChange);
    }

    return (
        <div className="form-control">
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
                            return <TextQuestions
                                value={value}
                                placeholder="Testing input"
                                type="text"
                                label="id"
                                key={question.id}
                                question={question}
                                validators={[
                                    {
                                        check: Validators.required,
                                        message: "This field is required."
                                    }
                                ]}
                                onChange={handleChange} />;
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
            </div>

        </div>
    )
}



export default Question