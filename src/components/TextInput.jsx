import '../styles/inputs.css'
import '../styles/global.css'
const TextInput = (props) => {
    const placeholder = props.type
    const setValueState = props.setter
    const inputValueHandler = (event) => { setValueState(event.target.value) }
    return (
        <div>
            <input className="normal-input-text" placeholder={placeholder} onChange={inputValueHandler} />
        </div>


    )
}

export default TextInput;