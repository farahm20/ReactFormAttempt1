import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import {
    TextField,
} from "@material-ui/core";
import { useData } from '../DataContext';

const initialValues = {
    answers: [
        {
            name: ""
        }
    ]
};


const TextQuestionsTwo = ({ label, placeholder, validators, type }) => {
    const { setValues, data } = useData();

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    console.log(values);
                    setValues(values);
                }}
            >
                {({ values }) => (
                    <Form>
                        <FieldArray name="answers">
                            {({ push }) => (
                                <div>
                                    {values.answers.length > 0 &&
                                        values.answers.map((answer, index) => (
                                            <div className="form-control" key={index}>

                                                <TextField
                                                    id="filled-secondary"
                                                    key={label}
                                                    name={`answers.${index}.name`}
                                                    placeholder="Write here...."
                                                    type={type}
                                                    className='form-control'
                                                />
                                                <ErrorMessage
                                                    name={`answers.${index}.name`}
                                                    component="div"
                                                    className="field-error"
                                                />

                                            </div>
                                        ))}
                                </div>
                            )}
                        </FieldArray>
                    </Form>
                )}
            </Formik>
        </div >
    );
}

export default TextQuestionsTwo
