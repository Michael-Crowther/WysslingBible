import React, { useState, lazy } from "react";
import { Link } from "react-router-dom";


const Calculations: React.FC = () => {
    const [todo, setTodo] = useState<string>("");

    return(
        <div className="mainContent">
            <Link to="/" style = {{textDecoration: 'none', color: 'white'}}>
                <div className = "buttonContainer">
                    <button className="homeButton">Home</button>
                </div>
            </Link>
            <h1 className="pageHeader">Calculations</h1>
        </div>
    );
}

export default Calculations;