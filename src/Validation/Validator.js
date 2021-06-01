import * as yup from "yup";

const Validator = {
    name: yup.string().required("Required"),
    surname: yup.string().required("Required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    course: yup.string().required("Select your course category"),
    password: yup
        .string()
        .min(8, "Password must contain at least 8 characters")
        .required("Enter your password"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match")
        .required("Confirm your password"),
    website: yup
        .string()
        .url()
        .required("Website is required")
};

export default Validator;



// const regex = {
//     email: new RegExp(
//         '^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
//     ),
//     number: new RegExp('^[0-9]+$'),
// };

// export class Validators {
//     static email(value, message) {
//         if (value) {
//             const result = regex.email.test(value);
//             if (!result) return { error: true, message };
//         }
//         // return false;
//     }

//     static required(value, message) {
//         if (!value || !value.toString().trim().length) {
//             return { error: true, message };
//         }
//         return false;
//     }

//     static number(value, message) {
//         const length = value ? value.toString().length : 0;

//         if (length > 0) {
//             const result = regex.number.test(value);
//             if (!result) {
//                 return { error: true, message };
//             }
//         }

//         return false;
//     }
// }

// export const validateInput = (validators, value) => {
//     if (validators && validators.length) {
//         for (let i = 0; i < validators.length; i++) {
//             const error = validators[i].check(value, validators[i].message);
//             if (error) {
//                 return error;
//             }
//         }
//     }
//     return false;
// };
