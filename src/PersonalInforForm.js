import React from 'react'
import { useForm } from "react-hook-form";


const PersonalInforForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <label htmlFor="firstname">Let's get started! What's your first name?</label>
            <input
                type="text"
                placeholder="First name"
                name="firstname"
                {...register('firstname',
                    {
                        required: true,
                        minLength: 2,
                        maxLength: 30
                    })}
            />
            <label htmlFor="firstname">And your last name?</label>
            <input
                type="text"
                label="And your last name?"
                placeholder="Last name"
                name="lastname"
                {...register('lastname',
                    {
                        required: true,
                        minLength: 2,
                        maxLength: 30
                    })}
            />
            {errors.firstname && errors.firstname.type === "required"
                && <span>Firstname in invalid</span>}
            {errors.firstname && errors.firstname.type === "maxLength"
                && <span>Max length exceeded</span>}
            {errors.firstname && errors.firstname.type === "minLength"
                && <span>First name should be longer than 1 charachter </span>}

            {errors.lastname && errors.lastname.type === "required"
                && <span>Lastname in invalid</span>}
            {errors.lastname && errors.lastname.type === "maxLength"
                && <span>Max length exceeded</span>}
            {errors.lastname && errors.lastname.type === "minLength"
                && <span>Last name should be longer than 1 charachter </span>}

            <input
                type="submit"
                placeholder="submit"
            />
        </form>
    );
}

export default PersonalInforForm
