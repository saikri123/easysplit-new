import React,{useEffect,useState} from 'react'
import { Row,Col, Dropdown } from 'react-bootstrap'
const Payers = (props) => {
    const [data, setData] = useState([])
    const [show,setShow]=useState("you")
    useEffect(() => {
        async function fetchMyApi() {
            let response = await fetch('http://localhost:3000/user')
            response = await response.json()
            setData(response)
        }
        fetchMyApi()
    }, [data])
    const handleClick=(print)=> {return setShow(print)}
    //console.log(handleClick)
    props.parent(show)
    return (
        <Row>
            <Col>
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
               Payed By
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={()=>handleClick('you')}>you</Dropdown.Item>
            <Dropdown.Item href="#" onClick={()=>handleClick(props.name)}>{props.name}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
            </Col>
            <Col><h4>{show}</h4></Col>
        </Row>
       
    )
}
export default Payers