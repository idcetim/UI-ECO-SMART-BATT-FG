const TextInputDate = (props) => {
    const setValueState = props.func
    const inputValueHandler = (event) => { setValueState(event.target.value) }
    return (
        <div>
            <input className="input-text" type="date"  onChange={inputValueHandler} />
        </div>
    )
}

export default TextInputDate;