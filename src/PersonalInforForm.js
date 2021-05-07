import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { parsePhoneNumberFromString } from 'git log'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import firebase from './firebase'


//adding data to firebase
// firebase.firestore().collection('UserAnswers').add({
//     firstname: 'Jane',
//     lastname: 'Doe',
//     email: 'jane.doe@email.com',
//     phoneNumber: '070 123 45 67',
//     userCity: 'Göteborg',
// })


const schema = yup.object().shape({
    firstname: yup.string()
        .required("First name is required")
        .matches(/^([^0-9]*)$/, "First name should not contain numbers"),
    lastname: yup.string()
        .required("First name is required")
        .matches(/^([^0-9]*)$/, "Last name should not contain numbers"),
    email: yup.string()
        .email("Email should have correct format")
        .required("Email is a required field"),
    phoneNumber: yup.string(),
    userCity: yup.string()
})

const PersonalInforForm = () => {
    // const { setValues, data } = useData();
    const { register, handleSubmit, formState: { errors }, } = useForm({
        // defaultValues: {
        //     firstname: data.firstname,
        //     lastname: data.lastname,
        //     email: data.email,
        //     phoneNumber: data.phoneNumber,
        // },
        resolver: yupResolver(schema),
    });

    const normalizePhoneNumber = (value) => {
        const phoneNumber = parsePhoneNumberFromString(value)
        const phoneNumberCountry = phoneNumber.country;

        if (!phoneNumber || phoneNumberCountry !== 'SE') {
            console.log(phoneNumber)
            console.log("incorrect phone number.")
            return value
        }
        console.log(phoneNumber)
        console.log(phoneNumber.number)

        return (
            // phoneNumber.formatInternational()
            phoneNumber.formatNational()
        )

    }

    const onSubmit = (data) => {
        console.log("in submit")
        console.log(data)
        console.log(data.phoneNumber)
        sendDataToFireBase(data);
        // setValues(data)
    }

    function sendDataToFireBase(data) {
        console.log("In send data func")

        firebase
            .firestore()
            .collection('UserAnswers')
            .add({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phoneNumber: data.phoneNumber,
                userCity: data.userCity,
            })
        // .then(() => {
        //     //set value to enpty string to remove all form values
        // })
    }
    //cities option array
    const citiesOptions = "Stockhom Göteborg Mälmo/Lund Uppsala Västerås Other".split(' ');

    return (
        <div className="form-control">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-question" htmlFor="firstname">1: Let's get started! What's your first name?</label>
                <input
                    type="text"
                    placeholder="First name"
                    name="firstname"
                    {...register('firstname')}
                />
                {errors.firstname && <span className="invalid error-text">{errors.firstname.message}</span>}
                <label className="form-question" htmlFor="firstname">2: And your last name?</label>
                <input
                    type="text"
                    label="And your last name?"
                    placeholder="Last name"
                    name="lastname"
                    {...register('lastname')}
                />
                {errors.lastname && <span className="invalid error-text">{errors.lastname.message}</span>}

                <label className="form-question" htmlFor="firstname">3: Thank for trusting us, test! We are going to help you! What is your email adress? </label>
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    {...register('email')}
                />
                {errors.email && <span className="invalid error-text">{errors.email.message}</span>}

                {/* We now need your telephone numbe */}
                <label className="form-question" htmlFor="firstname">4: We now need your telephone number. </label>
                <input
                    type="tel"
                    placeholder="070 123 45 67"
                    name="phoneNumber"
                    {...register("phoneNumber")}
                    onChange={(event) => {
                        event.target.value = normalizePhoneNumber(event.target.value);
                    }}
                />

                <label className="form-question" htmlFor="firstname">5: Where do you live? </label>

                {
                    citiesOptions.map(
                        (city, index) => <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    name={city}
                                    value={city}
                                    label={city}
                                    {...register("userCity")}
                                />
                            }
                            label={city}
                        />
                    )
                }

                <input className="button"
                    type="submit"
                    placeholder="submit"
                />
            </form>
        </div>
    );
}

export default PersonalInforForm
