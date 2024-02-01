import React, { useContext } from 'react'
import Base from '../../components/Base'
import userContext from '../../context/userContext'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getUser } from '../../services/user-service'
import { useState } from 'react'
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap'
import ViewUserProfile from '../../components/ViewUserProfile'

function ProfileInfo() {
  const object=useContext(userContext)
  const{userId}=useParams()
  // console.log(userId)
  const [user,setUser]=useState(null)

  useEffect(()=>{
      getUser(userId).then(data=>{
        console.log(data)
        setUser({...data})
      })
  },[])

  const userView=()=>{
    return(
      <Row>
        <Col >
          <ViewUserProfile user={user}/>
        
        </Col>
      </Row>
    )
  }


  return (
    <Base>
      {user ?userView():'Loading user data..'}
    </Base>
  )
}

export default ProfileInfo