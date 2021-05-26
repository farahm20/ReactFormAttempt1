import React, { useState } from 'react'
import { useData } from './DataContext';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { parsePhoneNumberFromString, parsePhoneNumber } from 'libphonenumber-js'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import firebase from './firebase'
import { isValidPhoneNumber } from 'react-phone-number-input';

//adding data to firebase
// firebase.firestore().collection('UserAnswers').add({
//     firstname: 'Jane',
//     lastname: 'Doe',
//     email: 'jane.doe@email.com',
//     phoneNumber: '070 123 45 67',
//     userCity: 'Göteborg',
// })

//adding data to firebase
// firebase.firestore().collection('ClientQuestions').add({
//     id: 23,
//     text: "Do you believe it is important for your therapist to have their own professional website (and not only a Linkedin profile or similar)?",
//     options: ["Yes, I think a professional website is important", "No, I don't think a professional website is important", "Other"],
//     questionType: 'CheckboxQuestions',
//     answerFlag: false,
// })

// firebase.firestore().collection('ClientQuestions').add({
//     id: 21,
//     text: "Before contacting us, how long had you been thinking about seeing a therapist?",
//     options: ["Less than two months", "For about 1-2 months", "For about 2-6 months", "For about 6-12 months", "For about 12 months"],
//     questionType: 'CheckboxQuestions',
//     answerFlag: false,
// })

// firebase.firestore().collection('ClientQuestions').add({
//     id: 24,
//     text: "Is there anything you think we missed asking you in the form, in relation to your personal preferences and needs, to be able to match you correctly?",
//     options: [],
//     questionType: 'TextQuestions',
//     answerFlag: false,
// })

// firebase.firestore().collection('ClientQuestions').add({
//     id: 14,
//     text: "How well do you think your therapist matches your preferences and needs - described in the form you completed?",
//     options: ["1", "2", "3", "4", "5"],
//     questionType: 'CheckboxQuestions',
//     answerFlag: false,
// })

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

//schema for value parsing and validation
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
    phoneNumber: yup.string()
        .required("Phone number is a required field")
        .matches(phoneRegExp, 'Phone number is not valid.')
        .min(10, "Phone number is short")
        .max(15, "Phone number is too long"),
    userCity: yup.string()
        .required("This is required."),
    // citiesOptions: yup.boolean()
    //     .required("At least on check box is required.")

})

const PersonalInforForm = () => {
    const { setValues, data } = useData();
    const [disabled, setDisabled] = useState(true);
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phoneNumber: data.phoneNumber,
            userCity: data.userCity
        },
        mode: "onBlur",
        resolver: yupResolver(schema),
    });



    const normalizePhoneNumber = (value) => {
        const phoneNumber = parsePhoneNumberFromString(value)

        // const parsedPhoneNumber = parsePhoneNumber(value, 'SE')
        // const parsedNumber = parsedPhoneNumber
        // console.log('Parsed phone number: ', parsedNumber)
        // console.log('Parsed validity: ', isValidPhoneNumber(value))

        if (!phoneNumber) {
            console.log("incorrect phone number.", value)
            return value
        }
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
        setValues(data)

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
                <label className="form-question" htmlFor="firstname">
                    1: Let's get started! What's your first name?</label>
                <input
                    type="text"
                    placeholder="First name"
                    name="firstname"
                    {...register('firstname')}
                />
                {errors.firstname && <span className="invalid error-text">{errors.firstname.message}</span>}

                <label
                    className="form-question" htmlFor="firstname">
                    2: And your last name?</label>
                <input
                    type="text"
                    label="And your last name?"
                    placeholder="Last name"
                    name="lastname"
                    {...register('lastname')}
                />
                {errors.lastname && <span className="invalid error-text">{errors.lastname.message}</span>}

                <label className="form-question" htmlFor="firstname">
                    3: Thank for trusting us, test! We are going to help you! What is your email adress? </label>
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    {...register('email')}
                />
                {errors.email && <span className="invalid error-text">{errors.email.message}</span>}

                {/* We now need your telephone numbe */}
                <label className="form-question" htmlFor="firstname">
                    4: We now need your telephone number. </label>
                <input
                    type="tel"
                    placeholder="070 123 45 67"
                    name="phoneNumber"
                    {...register("phoneNumber")}
                    onChange={(event) => {
                        event.target.value = normalizePhoneNumber(event.target.value);
                    }}
                />
                {errors.phoneNumber && <span className="invalid error-text">{errors.phoneNumber.message}</span>}

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
                {errors.userCity && <span className="invalid error-text">{errors.userCity.message}</span>}
                {/* {errors.citiesOptions && <span className="invalid error-text">{errors.citiesOptions.message}</span>} */}

                <input className="button"
                    type="submit"
                    placeholder="submit"
                />
            </form>
        </div>
    );
}

export default PersonalInforForm
