import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/actions/user';
import {withRouter} from "react-router-dom"

const Logout = ({history}) => {
    const dispatch=useDispatch()
    useEffect(() =>{
       localStorage.removeItem("token");
       dispatch(removeUser());
       history.push("/");
    },[])
    return null;
}
 
export default withRouter(Logout);