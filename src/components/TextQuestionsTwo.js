import React, { useState } from 'react'
import {
    TextField,
    MenuItem,
    Button,
    Input
} from "@material-ui/core";
import { useData } from '../DataContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormControlLabel from "@material-ui/core/FormControlLabel";


//schema for value parsing and validation
const schema = yup.object().shape({
    userInput: yup.string()
        .required("Field is required")
        .matches(/^([^0-9]*)$/, "Text field should not contain numbers")
})

const TextQuestionsTwo = ({ question, value, label, placeholder, validators, type, onChange }) => {

    const onSubmit = (data) => {
        console.log(data)
        setValues(data)
    }

    const { setValues, data } = useData();

    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            userInput: data.userInput,
        },
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    className='form-control'
                    placeholder={placeholder}
                    label={label}
                    {...register('userInput')}

                />
                {errors.userInput && <span className="invalid error-text">{errors.userInput.message}</span>}
            </form>
        </div >
    )


}



export default TextQuestionsTwo
