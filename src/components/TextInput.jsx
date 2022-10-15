import '../styles/inputs.css'
import '../styles/global.css'
const TextInput = (props) => {
    const placeholder = props.type
    const setValueState = props.setter
    const value = props.value
    const inputValueHandler = (event) => { setValueState(event.target.value) }
    return (
        <div>
            <input className="normal-input-text" placeholder={placeholder} onChange={inputValueHandler} value={value}  />
        </div>
    )
}

export default TextInput;