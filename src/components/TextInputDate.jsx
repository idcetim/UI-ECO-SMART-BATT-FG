import '../styles/inputs.css'
const TextInputDate = (props) => {
    const setValueState = props.setter
    const inputValueHandler = (event) => { setValueState(event.target.value) }
    return (
        <div>
            <input className="normal-input-date" type="date"  onChange={inputValueHandler} />
        </div>
    )
}

export default TextInputDate;