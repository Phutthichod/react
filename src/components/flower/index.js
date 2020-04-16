import React,{useEffect} from 'react'
import Item from './Item'
import Action from '../../actions'
import {connect} from 'react-redux'
import axios from 'axios';
import './style.css'
const mapDispatchToProps = (dispatch) => ({
    add: (data) => dispatch({ type: Action.ADD_FLOWER }),
  });

export default connect(null, mapDispatchToProps)(function index() {
    // const data = [1,2,3]
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://localhost:8080/pon/rest/services/categorys";
    const fetchData = ()=>{
        fetch(url,{mode: 'no-cors'})
        .then((response)=>{
            console.log(response.text())
            return response.json()
        })
        .then((response)=>{
            console.log(response)
        })
        .catch(error=>{
            console.log(error.messes)
        })
        
    }
    fetchData()
    return (
        <div className="grid-flower">
           {
                // data.map(()=>{
                //     return (
                //         <Item/>
                //     )
                // })
           }
        </div>
    )
})

