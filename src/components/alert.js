import React from 'react'
import {Alert,Button} from 'react-bootstrap'
import axios from 'axios'
const NewUser=(props)=>{
    const handleYes=()=>{
        const duplicate=[...props.data]
        duplicate.map(p=>{
            if(p.id==localStorage.getItem('userid'))
            {
               return p.friends.push({name:props.name,calculation:[{discription:props.desc,owe:props.owe,owed:props.owed}]})
            }
        })
        console.log("duplicate",duplicate[localStorage.getItem('userid')-1])
         axios.patch(`http://localhost:3000/user/${localStorage.getItem('userid')}`, duplicate[localStorage.getItem('userid')-1])
         props.handleChange(true)
         props.parent()
    }
    return(
        <Alert show={props.show} variant="success">
        <Alert.Heading> Do you want to add "{props.name}"" to your friends list</Alert.Heading>
        <p>
          Do you want to add {props.name} to your friends list
        </p>
        <hr />
        <div className="d-flex justify-content-end">
            <Button  onClick={handleYes}  variant="outline-success">yes</Button>
            <Button style={{marginLeft:'10px'}} onClick={() => props.handleChange(true)} variant="outline-success">
                Edit
            </Button>
        </div>
    </Alert> 
    )
   
}
export default NewUser