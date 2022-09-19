const TextInput = (props) => {
    const placeholder = props.type
    const setValueState = props.setter
    const inputValueHandler = (event) => { setValueState(event.target.value) }
    return (
        <div>
            <input className="input-text" placeholder={placeholder} onChange={inputValueHandler} />
        </div>


    )
}

export default TextInput;