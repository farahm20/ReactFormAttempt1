import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { validateInput } from '../Validation/Validator';



const TextQuestions = ({ question, value, label, placeholder, validators, type, onChange }) => {
    const questionTextLabel = question.text;


    const [error, setError] = useState(false);
    value = "";
    const handleChange = (event) => {
        console.log("In TextQuestions handleChange: ", value)
        value = event.target;
        setError(validateInput(validators, value));
        onChange = (event.target.value);
    }

    return (
        <div>
            <p> Single line questions</p>
            {/* consition on label. only if the label is reveieved thean show label */}
            {label && <label className="form-question" htmlFor="firstname">
                {questionTextLabel}
            </label>}
            <input
                type={type}
                value={value}
                className='form-control'
                placeholder={placeholder}
                onChange={onChange}


            // onChange={(event) => {
            //         event.target.value = normalizePhoneNumber(event.target.value);
            />
            {/* {
                type === 'textarea' ? (
                    <textarea
                        className="form-comtrol"
                        placeholder={placeholder}
                        value={value}
                        dafaultValue={value}
                        onChange={handleChange}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        className='form-control'
                        placeholder={placeholder}
                        onChange={handleChange}
                    />
                )
            } */}
            { error && <span className='invalid error-text'>{error.message}</span>}

        </div>
    )
}

TextQuestions.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    validators: PropTypes.array,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

TextQuestions.defaultProps = {
    value: '',
    label: '',
    placeholder: '',
    type: 'text',
    validators: []
};

export default TextQuestions
