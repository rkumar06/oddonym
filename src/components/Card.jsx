import React from "react"
import { styled } from './../stitches.config';
import Placeholder from 'react-bootstrap/Placeholder';
import { Link } from "react-router-dom";

// function Card(props){
//     const oddle = "oddle"
//     return(
//         <div className="card" onClick={props.onClick}>
//             <h1>{props.card_word}</h1>  
//             <h2>{props.isOddle && oddle}</h2> 
//         </div>
        
//     )
// }

function Card({
    card_word,
    isOddle,
    onClick,
    type,
    size,
    placeHolder,
    linkTo
  }) {
    const oddle = "oddle"
    
    const StyledButton = styled('button', {
        display: "flex",
        justifyContent: "center",
        // px: "$xxxl",
        // py: "$xxl",
        // minWidth: "16rem",
        borderRadius: "$rounded_lg",

        fontFamily: "sans-serif",
        fontSize: "$lg",
        fontWeight: "$bold",
        color: "white",
        border: "none",

        variants: {
            type: {
                selected: {
                    backgroundColor: '#9593FF',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'darkviolet',
                    },
                },
                normal: {
                    backgroundColor: '#ECECEC',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: 'lightgray',
                    },
                },
                wrong: {
                    backgroundColor: '#ECECEC',
                    outlineStyle: 'solid',  
                    outlineWidth: '2px',
                    outlineColor: 'black',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: 'lightgray',
                    },
                },
                correct: {
                    backgroundColor: '#ECECEC',
                    outlineStyle: 'solid',  
                    outlineWidth: '2px',
                    outlineColor: '#9593FF',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: 'lightgray',
                    },
                }
            },
            size: {
                normal: {
                    py: "$xxl",
                    minWidth: "16rem",
                },
                tablet: {
                    py: "$xxl",
                    minWidth: "14rem",
                },
                mobile: {
                    py: "$xl",
                    minWidth: "10rem",
                }
            },
        },

        // '&:hover': {
        //     padding: '$xxl',
        // },

        '&:focus': {
            outline: 'none',
            // outlineStyle: 'solid',
            // outlineWidth: '2px',
            // outlineOffset: '2px',
        },
    });

    if (linkTo) {
        return (
            <a href={linkTo} style={{ textDecoration: "none"}}>
                <StyledButton       
                    type={type}
                    size={size}
                    onClick={onClick}
                > 
                    {!placeHolder && card_word}
                    {placeHolder && <Placeholder 
                        style={{
                            width: "75%",
                            display: "inline-block",
                            minHeight: "1em",
                            opacity: "1",
                            backgroundColor: "#DDD8D8"}} animation="glow" size="lg" />}
                </StyledButton>
            </a>
        )
    }
    return (
        <StyledButton       
            type={type}
            size={size}
            onClick={onClick}
        > 
            {!placeHolder && card_word}
            {placeHolder && <Placeholder 
                style={{
                    width: "75%",
                    display: "inline-block",
                    minHeight: "1em",
                    opacity: "1",
                    backgroundColor: "#DDD8D8"}} animation="glow" size="lg" />}
        </StyledButton>
    )
}

export default Card