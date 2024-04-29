import React from "react"
import axios from 'axios'
import './EnterName.css'

function EnterName(props){

    const [inputValue, setInputValue] = React.useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    function sendUsername(){
        console.log("api call")
        const date = new Date();
        const dateString = date.toString();
        const chopped_date = dateString.substring(0, 15);
        console.log(props.rounds_played)
        const rounds = props.rounds_played

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            // rememeber to fill in query parameters
            url: `https://oddle-c2f53883d1bd.herokuapp.com/updatedaily?username=${inputValue}&date=${chopped_date}&rounds_played=${rounds}`,
            headers: { }
            };
            
            axios.request(config)
            .then((response) => {
            console.log(JSON.stringify(response.data));
            // after api response load the leaderboard component
            props.closeNameOpenLeader();
            })
            .catch((error) => {
            console.log(error);
            });
        
    }

    return(
        <div className = "popup-overlay-name" onClick={() => {props.closeName()}}>
            <div className="popup-content-name" onClick={e => {e.stopPropagation()}}>
                <h4 className="closeButtonName" onClick={props.closeName}>x</h4>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Name here"
                />
                <p>You typed: {inputValue}</p>
                <button onClick = {sendUsername}>Submit</button>
            </div>
        </div>
    )
}

export default EnterName