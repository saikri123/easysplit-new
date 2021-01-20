import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
const SideNav = (props) => {
    const [data, dataSet] = useState([])
    
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('http://localhost:3000/user')
      response = await response.json()
      dataSet(response)
    }
    fetchMyAPI()
  }, [data])
  const handleSidenav=(data,p,index)=>{
    props.parent(data,p,index)
  }
    return (
        <ListGroup style={{height:'80vh',border:'2px solid black'}}>
            <ListGroup.Item style={{textAlign:'center'}}>
                <Link to='/home' onClick={()=>handleSidenav("dashbord")}>dashboard</Link></ListGroup.Item>
            <ListGroup.Item><h6 style={{textAlign:'center'}}>Friends</h6>
                        {
                          data.map(st=>{
                            if(st.id==localStorage.getItem('userid')){
                              return st.friends.map((p,index)=><li style={{listStyleType:'none',cursor:'pointer'}} onClick={()=>handleSidenav("friend",p.name,index)}><a>{p.name}</a></li>);
                            }
                            
                          })
                        }
            </ListGroup.Item>
        </ListGroup>
    )
}
export default SideNav