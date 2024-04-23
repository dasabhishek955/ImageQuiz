import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'


const Result = () => {
    const { state } = useLocation();
    const { score } = state;
    const { fullmarks } = state;
    let navigate = useNavigate();
    const onClick = () => {
        navigate("/Test");
    }

    return (
        <div className="result-box">
            <center><h2>Results</h2></center>
            <div className="marks">
                <p>Your Marks: {score}</p>
                <p>Full Marks: {fullmarks}</p>
            </div>
            <button class="result-button" role="button" onClick={onClick}>Start Again</button>
        </div>

    )
}

export default Result
