const TextInput = (props) => {
    const placeholder = props.codigo
    const setValueState = props.func
    const inputValueHandler = (event) => { setValueState(event.target.value) }
    return (
        <div>
            <input className="input-text" placeholder={placeholder} onChange={inputValueHandler} />
        </div>


    )
}

export default TextInput;