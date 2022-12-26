import { useState } from "react";


export default function DbUpdate(){
const [dbChange,setDbChange] = useState(0)
 setDbChange(dbChange + 1)
 console.log(dbChange)
}

