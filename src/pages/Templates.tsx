import React, { useState, lazy } from "react";
import { Link } from "react-router-dom";


const Templates: React.FC = () => {
    const [todo, setTodo] = useState<string>("");

    return(
        <div className="mainContent">
            <Link to="/" style = {{textDecoration: 'none', color: 'white'}}>
                <div className = "buttonContainer">
                    <button className="homeButton">Home</button>
                </div>
            </Link>
            <h1 className="pageHeader">TEMPLATES</h1>
        </div>
    );
}

export default Templates;