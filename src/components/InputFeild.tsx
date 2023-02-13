import React from 'react'
import "./styles.css";

interface Props{
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
}

const InputFeild = ({todo,setTodo}: Props) => {
  return (
    <form className="input">
      <input className="inputBox" type="input" placeholder="Please enter a task..." value={todo} onChange={(e)=>setTodo(e.target.value)}></input>
      <button className="submit" type="submit">Go</button>
    </form>
  )
}

export default InputFeild
