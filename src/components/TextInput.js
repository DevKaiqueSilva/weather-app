import * as MaterialDesign from 'react-icons/md';
// import "../css/App.scss"

const TextInput = (props) => {
    const MdIcon = props.icon?MaterialDesign[props.icon]:<div/>;

    const className = "input-text "+(props?.className)

    return(
        <input type="text" value={props.value} onChange={(e)=>props.onChangeText(e.target.value)} 
        className={className} placeholder={props.placeholder} />
    )
}

export default TextInput;