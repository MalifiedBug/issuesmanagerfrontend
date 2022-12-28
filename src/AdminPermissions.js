
import { useEffect,useState } from "react"
import axios from "axios"
import { serverUrl } from "./App"


export default function AdminPermissions(){
    const [uniqueUsers,setUniqueUsers] = useState([])
    const [allAdmins,setAllAdmins] = useState([])
    // const [delAdmin,setDelAdmin] = useState("")
    // const [addAdmin,setAddAdmin] = useState("")

    useEffect(()=>{
        (async ()=>{
          await axios.get(`${serverUrl}/uniqueusers`).then((response)=>{setUniqueUsers(response.data.usersnoadmin);setAllAdmins(response.data.allAdmins);console.log(response.data.usersnoadmin)})           
          
        })()
      },[])

    return(
        <div>
            <div>
                <label for="assign">Assign admin permission to:</label>
                <select id="assign">
                    {uniqueUsers.map((user, index)=>
                    <option key={index} value={user}>{user}</option>)}
                </select>
            </div>
            <br />
            <div>
                <label for="revoke">Revoke admin permissions of:</label>
                <select>
                    {allAdmins.map((admin, index)=>
                    <option key={index} value={admin}>{admin}</option>)}
                </select>
            </div>
        </div>
    )
}