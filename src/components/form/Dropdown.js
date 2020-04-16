import React,{forwardRef} from 'react'

const Dropdown = forwardRef((props,passedRef) => {
    // console.log("sss"+props.name+props.data)
    return (
            <select ref={passedRef}  className="browser-default custom-select">
                {
                    props.data?
                    props.data.map((item,i)=>(<option key={i} value={item[props.id]}>{item[props.name]}</option>))
                    :''
                }
            </select>
    )
});
export default Dropdown
