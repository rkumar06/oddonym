import React from "react"
import { styled } from './../stitches.config';
import Placeholder from 'react-bootstrap/Placeholder';
import { Link } from "react-router-dom";

function ListEntry({
    username,
    rounds_played,
    type,
    size,
    onClick,
    placeHolder,
    rank,
  }) {
    
    const StyledList = styled('li', {
        display: "flex",
        py: "$xl",
        minWidth: "16rem",
        borderRadius: "$rounded",

        fontFamily: "sans-serif",
        fontSize: "$lg",
        fontWeight: "$bold",
        color: "white",
        border: "none",
        marginTop:"0.5rem",
        filter: "drop-shadow(0 4px 4px grey)",

        variants: {
            type: {
                normal: {
                    backgroundColor: 'white',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: 'lightgray',
                    },
                },
            },
            size: {
                normal: {
                
                },
                tablet: {
                
                },
                mobile: {

                }
            },
        }
    });

    return (
        <StyledList       
            type={type}
            size={size}
            onClick={onClick}
        > 
            {!placeHolder && 
            <div style={{display: "grid", gridTemplateColumns:"2fr 6fr 3fr", width: "100%"}}>
                <h3>{rank}</h3>
                <h3 style={{textAlign: "left", overflowX: 'auto'}}>{username}</h3>
                <h3>{rounds_played}</h3>
            </div>}
            {placeHolder && <Placeholder 
                style={{
                    width: "75%",
                    display: "inline-block",
                    minHeight: "1em",
                    opacity: "1",
                    backgroundColor: "#DDD8D8"}} animation="glow" size="lg" />}
        </StyledList>
    )
}

export default ListEntry