import React, { useEffect, useState } from "react";
import Card from "../../components/Card.jsx"
// import oddleLogo from './../public/oddle.svg'
import QuestionMark from '../../svg/QuestionMark'
import SettingsIcon from '../../svg/SettingsIcon'
import Button from "../../components/Button.jsx"
import EnterName from "./EnterName.jsx"
import Text from "../../components/Text.jsx"

import './Game.css'
import Leaderboard from "./Leaderboard.jsx";

function Game(begin) {
    const [numSeedWords, setNumSeedWords] = useState(1);
    const [seedWords, setSeedWords] = useState([]);
    const [allWords, setAllWords] = useState([]);
    const [oddle, setOddle] = useState("");
    const [rightWrong, setRightWrong] = useState(0) // 0 do nothing, 1 correct, 2 wrong
    const [loaded, setLoaded] = useState(false)
    const [selected, setSelected] = useState(-1)    // value is index of the button that was selected (default is -1, i.e. no button selected)
    const [temp, setTemp] = useState([])
    const [revealed, setRevealed] = useState(false)
    const [joinLeaderBoard, setJoinLeaderBoard] = useState(false)
    const [openLeaderboard, setOpenLeaderboard] = useState(false) // false = no Leaderboard popup, true = Leaderboard popup
    const [leaderBoardOnce, setLeaderBoardOnce] = useState(true) // only can join leader board once

    let cards = []

    if (loaded) {
        cards = allWords.map((word, index) => {
            let type;
            let functionInButton;

            // If this card was selected
            if (index === selected) {
                if (word != oddle) {
                    // console.log("wrong") debugging
                    type = 'wrong'
                } else {
                    // console.log('Selected correct')
                    type = 'selected'
                }
            } else { // If this card was NOT selected
                if (selected > 0 && word == oddle) {
                    type = 'correct'
                    // console.log('correct')
                } else {
                    type = 'normal'
                }
            }

            // Sets the functionInButton to end the game
            if (rightWrong > 0) { 
                // The player chose an answer (correct or incorrect)
                functionInButton = null;
            } else {
                // The player has NOT chosen an answer yet
                functionInButton = () => checkAnswer(word, index)
            }

            return (
                <Card
                    key={index} // It's important to include a unique key when mapping
                    card_word={word}
                    isOddle={word == oddle}
                    onClick={functionInButton}
                    type= {type}
                    size= {{
                        '@initial': 'normal',
                        '@tablet': 'tablet',
                        '@mobile': 'mobile',
                    }}
                    linkTo="#ResultDiv"
                />
                )
            })
    } else {
        // set cards to be the placeholders!
        cards = []
        for (let i = 0; i < (numSeedWords-1)*4; i++) {
            cards.push(         
                <Card
                key={i} // It's important to include a unique key when mapping
                type= {'normal'}
                size= {{
                    '@initial': 'normal',
                    '@tablet': 'tablet',
                    '@mobile': 'mobile',
                }}
                placeHolder
            />)
        }
    }
 

    useEffect(() => {
        nextLevel()
    }, [])
    

    function joinLeaderBoardFunc(){
        setJoinLeaderBoard(true);
        setLeaderBoardOnce(false);
    }

    function closeNameOpenLeaderboard() {
        setJoinLeaderBoard(false);
        setOpenLeaderboard(true);
    }

    function closeName() {
        setJoinLeaderBoard(false);
        
    }

    function closeLeaderboard() {
        setOpenLeaderboard(false);
    }

    function getRandomInt(n) {
        return Math.floor(Math.random() * (n + 1));
    }

    // function shuffleCards(){
    //     let array = [...allWords]; // Make a copy of allWords to shuffle
    //     for (let i = array.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    //     }
    //     setAllWords(array); // Set the shuffled array back to state
    // }

    function shuffleCards(words) {
        setSelected(-1)
        let array = [...words]; // Copy the words array to shuffle
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        setAllWords(array); // Set the shuffled array back to state
        setLoaded(true)
    }

    function reveal() {
        let toEdit = temp
        if (toEdit.length > 0) {
            const firstElement = toEdit.shift(); // Remove the first element and store it
            toEdit.push(firstElement); // Add the removed element to the end of the array
        }
        setAllWords(toEdit)
        setRevealed(true)
    }

    function nextLevel(){
        setLoaded(false)
        setNumSeedWords(oldNum => oldNum + 1)
        setRightWrong(0)
        getAllWords()
        setRevealed(false)
        // shuffleCards()
        // setStarted(true)
    }

    function checkAnswer(word, index){
        setSelected(index)
        
        if (word === oddle) {
            setRightWrong(1)
        }
        else{
            setRightWrong(2)
        }
    }

    async function fetchSeedWord() {
        const response = await fetch(`https://random-word-api.vercel.app/api?words=1`);
        const data = await response.json();
        return data[0]; // Return a single new seed word
    }

    async function fetchAlikeWords(word) {
        const response = await fetch(`https://api.api-ninjas.com/v1/thesaurus?word=${word}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'b7AeVzHBCi33RYmI/R6qtw==KQf1ebpSU3QXkynP'
            }
        });
        const data = await response.json();
        if (data.synonyms && data.synonyms.length > 0) {
            return [data.synonyms.slice(0, 2), word];  // Return only the first two synonyms
        } else {
            // If no synonyms, fetch a new seed word and try again
            const newSeed = await fetchSeedWord();
            return fetchAlikeWords(newSeed); // Recursively fetch synonyms for the new seed
        }
    }

    async function getAllWords() {
        try {
            const seeds = await fetchSeedWords();  // Fetch initial seed words
    
            let newAllWords = [];  // Temporary array to store all words
    
            const oddleWord = await fetchSeedWord();  // Fetch the oddle word
            newAllWords.push(oddleWord);  // Add the oddle word to the temporary array
            setOddle(oddleWord);  // Set the oddle word state
    
            for (let i = 0; i < seeds.length; i++) {
                const seed = seeds[i];
                const result = await fetchAlikeWords(seed);  // Fetch alike words for each seed
                const alikeWords = result[0];
                const newSeed = result[1];
                setSeedWords(newSeed, ...seedWords);
                newAllWords.push(newSeed, ...alikeWords);  // Add both seed and its alike words to the array
            }
            setTemp(newAllWords)
            shuffleCards(newAllWords);  // Shuffle the complete list of words before setting them
        } catch (error) {
            console.error('Failed to fetch words:', error);
            setAllWords([]);  // Only setAllWords in case of an error
        }
    }

    // async function getAllWords() {
    //     try {
    //         const seeds = await fetchSeedWords();  // Fetch initial seed words
    //         setAllWords([]);  // Clear allWords before populating

    //         const oddleWord = await fetchSeedWord();
    //         setOddle(oddleWord);
    //         setAllWords([oddleWord])

    //         for (let i = 0; i < seeds.length; i++) {
    //             const seed = seeds[i];
    //             const result = await fetchAlikeWords(seed);  // Fetch alike words for each seed
    //             const alikeWords = result[0]
    //             const newSeed = result[1]
    //             setAllWords(prevWords => [...prevWords, newSeed, ...alikeWords]);  // Add both seed and its alike words
    //         }
    //     } catch (error) {
    //         console.error('Failed to fetch words:', error);
    //         setAllWords([]);
    //     }
    // }

    async function fetchSeedWords() {
        const seeds = [];
        for (let i = 0; i < numSeedWords; i++) {
            const newSeed = await fetchSeedWord();
            seeds.push(newSeed);
        }
        // setSeedWords(seeds); not needed anymore!
        return seeds;  // Return the fetched seed words
    }

    return (
        <div className="GameFrontEndDiv">
            <div className='HeaderDiv'>
                <div className='HeaderTitleMenu'>
                    <h2 className='HeaderTitle'>
                        <div className='HeaderMenuLeft'>
                            <a onClick={() => setOpenLeaderboard(true)}>
                                <h4 className="LeaderboardLink">Leaderboard</h4>
                            </a>
                            <h4>Level {numSeedWords - 1}</h4>
                        </div>  
                        <div className = "oddle-title">
                            <h1>Oddle</h1>
                        </div>
                        <div className='HeaderMenus'>
                            {/* <QuestionMark color="#6B6B6B" width="36" height="36" />
                            <SettingsIcon color="#6B6B6B" width="36" height="36" /> */}
                        </div>
                    </h2>
                </div>
            </div>

            <div className='Game'>
                <h4 className='TaskDescription'>There {numSeedWords - 1 === 1 ? `is` : `are`} {numSeedWords - 1} {numSeedWords - 1 === 1 ? `group` : `groups`} of 3 words that relate to each other. Select the odd one out.</h4>
                
                {!revealed && <div className="card-container">
                    {cards}    
                </div>}

                {revealed && <div className="card-container-reveal">
                    {cards}    
                </div>}

                
                {loaded && (rightWrong === 0) && <Button onClick = {() => shuffleCards(allWords)} textInButton="Shuffle" color="normal" size="normal" />}

                <div className="ResultDiv" id="ResultDiv">
                    <div className = "right-wrong">
                        <h2>{rightWrong === 1 && "You got it right!"}</h2>
                        <h3>{rightWrong === 2 && "You got it wrong"}</h3>
                    </div>
                    <div className = "right-wrong">
                        {rightWrong === 2 && <h3>
                            The oddle was: <span style={{textDecoration: 'underline #9593FF', color: "black"}}>{oddle}</span>
                        </h3>
                        }
                    </div>
                    <div className = "final-level">
                        <h3>{rightWrong === 2 && `Final Level: ${numSeedWords - 1}`}</h3> 
                        </div>
                    <div className = "next-level-button">
                        {rightWrong === 1 && <Button onClick = {nextLevel} textInButton="Next Level" color="normal" size="normal" />}
                    </div>
                    <div className = "next-level-button">
                        {(rightWrong === 2 && !revealed) && <Button onClick = {reveal} textInButton="Reveal Groups" color="normal" size="normal" />}
                    </div>
                    <div className = "next-level-button">
                        {(rightWrong === 2 && leaderBoardOnce) && <Button onClick = {joinLeaderBoardFunc} textInButton="Join Leaderboard" color="normal" size="normal" />}
                    </div>

                    {/* Popups */}

                    {joinLeaderBoard && <div>
                        <EnterName 
                            rounds_played = {numSeedWords - 1}
                            closeNameOpenLeader = {closeNameOpenLeaderboard}
                            closeName = {closeName} />
                    </div>}
                    
                    {/* FIX THIS SUCH THAT ONLY WHEN YOU CLICK OUT OF THE LEADERBOARD DOES IT REMOVE IT! */}
                    {openLeaderboard && <div> 
                        <Leaderboard 
                            close = {closeLeaderboard}/>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default Game;