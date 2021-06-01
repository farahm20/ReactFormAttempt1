import React from 'react';
import ReactDOM from 'react-dom';
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



const TextQuestionsTwo = () => {


    // const { setValues, data } = useData();

    return (

        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    console.log(values);
                }}
            >
                {({ values }) => (
                    <Form>
                        <FieldArray name="answers">
                            {({ insert, remove, push }) => (
                                <div>
                                    {values.answers.length > 0 &&
                                        values.answers.map((friend, index) => (
                                            <div className="row" key={index}>
                                                <div className="col">
                                                    {/* <label htmlFor={`answers.${index}.name`}>Name</label> */}
                                                    <Field
                                                        name={`answers.${index}.name`}
                                                        placeholder="Write here...."
                                                        type="text"
                                                    />
                                                    <ErrorMessage
                                                        name={`answers.${index}.name`}
                                                        component="div"
                                                        className="field-error"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </FieldArray>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default TextQuestionsTwo
