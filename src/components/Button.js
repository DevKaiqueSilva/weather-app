import * as MaterialDesign from 'react-icons/md';

const Button = ({children, icon, text, color, width, height, textColor, href="", onClick }) => {

    const styles = {
        backgroundColor: color || "#2196F3",
        width: width || "fit-content",
        height: height || "45px",
        color: textColor || "white",
        fontSize: 20
    }

    const MdIcon = MaterialDesign[icon];

    return(
        <a className="button"  style={styles} onClick={onClick}>
            {children?children:
            <div className="row">
                <MdIcon />
                {text}
            </div>
            }
        </a>
    )
}

export default Button;