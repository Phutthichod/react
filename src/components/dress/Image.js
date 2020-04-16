import React from 'react'
const Image = (props) => (
    <div style={{justifySelf:'flex-end'}}>
        <img className={props.className} style={{height:500}} src={props.src}/>
    </div>
)
export default Image