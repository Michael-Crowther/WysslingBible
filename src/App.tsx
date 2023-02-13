import './App.css';
import InputFeild from './components/InputFeild';
import React, { useState } from "react";


const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");

  console.log(todo);

  return (
    <div className="App">
      <span className="heading">To-Do-List</span>

      <InputFeild todo={todo} setTodo={setTodo} />
    </div>
  );
}

export default App;
