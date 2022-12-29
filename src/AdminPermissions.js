
import { useEffect,useState } from "react"
import axios from "axios"
import { serverUrl } from "./App"


export default function AdminPermissions(){
    const [uniqueUsers,setUniqueUsers] = useState([])
    const [allAdmins,setAllAdmins] = useState([])
    const [delAdmin,setDelAdmin] = useState("")
    const [addAdmin,setAddAdmin] = useState("")

    console.log(delAdmin,addAdmin)


    useEffect(()=>{
        (async ()=>{
          await axios.get(`${serverUrl}/uniqueusers`).then((response)=>{setUniqueUsers(response.data.usersnoadmin);setAllAdmins(response.data.allAdmins);console.log(response.data.usersAdmin)})         
          
        })()
      },[addAdmin,delAdmin])

     async function One(name){
        await axios.put(`${serverUrl}/addadmin/${name}`).then(response=>alert(response))
      }

      async function Two(name){
        await axios.put(`${serverUrl}/deladmin/${name}`).then(response=>alert(response))
      }

    return(
        <div className="w-3/4 flex flex-col">
            <div className="self-center m-2">
                <label for="assign">Assign admin permission to:</label>
                <select onChange={(e)=>{setAddAdmin(e.target.value);One(e.target.value)}} id="assign" className="p-1 rounded-lg">
                    {uniqueUsers.map((user, index)=>
                    <option key={index} value={user}>{user}</option>)}
                </select>
            </div>
            <br />
            <div className="m-2">
                <label for="revoke">Revoke admin permissions of:</label>
                <select onChange={(e)=>{if(allAdmins.length>1){setDelAdmin(e.target.value);Two(e.target.value)}else{alert("At Least One Admin Needed!")}}} className="p-1 rounded-lg">
                    {allAdmins.map((admin, index)=>
                    <option key={index} value={admin}>{admin}</option>)}
                </select>
            </div>
        </div>
    )
}