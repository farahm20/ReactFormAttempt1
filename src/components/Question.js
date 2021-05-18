
const Question = ({ question }) => {
    return (
        <div className="form-control">
            <div className="form-question">
                <h3 style={{
                    color: 'red',
                }}>{question.id}</h3>
                <h3 style={{
                    color: 'red',
                }}> - </h3>
                <h3> {question.text}</h3>
            </div>

            <div className="form-options">
                <h4>{question.options}</h4>
            </div>
            <input type='text' />
        </div>
    )
}

export default Question