import React, { useEffect, useState } from "react"; 
import axios from 'axios'
import './Leaderboard.css'
import ListEntry from "../../components/ListEntry";

function Leaderboard({ close }) {
    const [loaded, setLoaded] = useState(false)
    const [allLists, setAllLists] = useState()

    let leaderboardList = [];
    
    if (loaded) {
        // Once we retrieved data from backend load leaderboard
        leaderboardList = allLists.map((data, index) => {
            return (
                <ListEntry 
                    username={data.username} 
                    rounds_played={data.rounds_played}
                    type={"normal"}
                    size={"normal"}
                    onClick={()=>console.log("implement on click function")}
                    rank={index + 1} // The index also serves as the rank... Bad idea! (FIX LATER!)
                    key={index}/>
            )
        })
    } else {
        // Else use a placeholder!
        leaderboardList = null; // TODO work on this line!
    }

    useEffect(() => {
        getDailyTopTen()
    }, [])

    function getDailyTopTen() {
        console.log("api call")
        const date = new Date();
        const dateString = date.toString();
        const chopped_date = dateString.substring(0, 15);
        console.log(chopped_date)   

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            // remember to fill in query parameters
            url: `https://oddle-c2f53883d1bd.herokuapp.com/topten?date=${chopped_date}`,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            setLoaded(true)
            setAllLists(response.data)
            // console.log(response.data) debug
          })
          .catch((error) => {
            console.log(error);
          });
    }
  return (

    <div className='popupOverlay' onClick={() => {close()}}>
        <div className='popupContent' onClick={e => {e.stopPropagation()}}> {/* e.stopPropagation() allows the ability to click outside!!!*/}
            <h4 className="closeButton" onClick={close}>x</h4>
            <h2>Oddle Leaderboard</h2>
            
            <ul className='Leaderboard'>
                <div className='Filters'></div>
                <div className="Headers">
                    <h6>Rank</h6>
                    <h6 style={{textAlign: "left"}}>User</h6>
                    <h6>Rounds Won</h6>
                </div>
                {leaderboardList}
            </ul>
        </div>
    </div>
    
  )
}

export default Leaderboard