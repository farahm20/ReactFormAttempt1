import React, { useState, useEffect } from 'react'
import {
    TextField,
    MenuItem,
    Button,
    Input
} from "@material-ui/core";
import { useData } from '../DataContext';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormControlLabel from "@material-ui/core/FormControlLabel";


//schema for value parsing and validation
const schema = yup.object().shape({
    userInput: yup.string()
        .required("Field is required")
        .matches(/^([^0-9]*)$/, "Text field should not contain numbers")
})

const TextQuestionsTwo = ({ question, label, placeholder, validators, type }) => {

    console.log("LABEL: ", label)

    const onSubmit = (data) => {
        console.log(data)
        setValues(data)
    }

    const { setValues, data } = useData();

    const { control, register, handleSubmit, setValue, formState: { errors }, } = useForm({
        defaultValues: {
            userInput: data.userInput,
        },
        mode: "onBlur",
    });


    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "test", // unique name for your Field Array
        // keyName: "id", default to "id", you can change the key name
    });

    useEffect(() => {
        setValue("inputField", label)
    }, []);

    return (

        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* {fields.map((field, index) => ( */}
                <TextField
                    key={label}
                    name="inputField"
                    type={type}
                    className='form-control'
                    placeholder={placeholder}
                    {...register('userInput')}
                    inputProps={{
                        "aria-label": "Description"
                    }}
                />
                {/* ))} */}
            </form>
        </div >

    )


}

export default TextQuestionsTwo
