//import { View, Text } from 'react-native'
import React , {useState} from 'react'

const DropdownList = () => {
  const [selectedOption, setSelectedOption] = useState("Select an option to search")
  
  
  const handleChange = (event) => {
 setSelectedOption(event.target.value);
 };
return (
 <select value={selectedOption} onChange={handleChange}>
 <option value="street">Street</option>
 <option value="time_limit">Time Limit</option>
 <option value="location">Location</option>
 </select>
 );
}
  
  


export default DropdownList