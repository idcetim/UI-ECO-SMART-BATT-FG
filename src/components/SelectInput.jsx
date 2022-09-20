import '../styles/inputs.css'
const SelectInput = (props) => {
    const options = props.options
    const setValueState = props.func
    const optionValueHandler = (event) => { 
        console.log(event.target.value)
        setValueState(event.target.value) }
    return (
        <div>
            <select onChange={optionValueHandler} className="normal-input-select">
                {options.map((op, index) => { return (
                  <option value={op} disabled={index ===0 ? true : false} selected ={index ===0 ? true : false}  key={index}>{op}</option> 
                )})
            }
            </select>
        </div>
    )
}
export default SelectInput;