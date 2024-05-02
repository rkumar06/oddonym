import React from 'react'
import { styled } from './../stitches.config';
import {Link } from "react-router-dom";
import Placeholder from 'react-bootstrap/Placeholder';
import './Button.css'

function Button({
    onClick,
    textInButton,
    color,
    size,
    linkTo,
    placeHolder,
  }) {

  const StyledButton = styled('button', {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Harmattan",
    fontSize: "23px",
    fontWeight: "100",
    border: "3px solid #1e57be",
    borderRadius: "20px",

    color:'#f7f8fd',   

    variants: {
      color: {
        selected: {
          fontSize: '23px',
          backgroundColor: '#1e57be',
          color: 'white',
          fontWeight: "100",
          '&:hover': {
            backgroundColor: 'darkviolet',
          },
        },
        normal: {
          fontSize: '23px',
          borderRadius: "20px",
          backgroundColor: '#1e57be',
          color: '#f7f8fd',
          '&:hover': {
            backgroundColor: '#f7f8fd',
            color: '#1e57be',
            fontWeight: "100"
          },
        },
      },
      size: {
        game: {
          py: "$xxxl",
          minWidth: "16rem",
          borderRadius: "$rounded_lg",
          fontSize: "23px",
          fontWeight: "100",
        },
        normal: {
          py: "$lg",
          minWidth: "8rem",
          borderRadius: "20px",
          fontSize: "23px",
          fontWeight: "100",
        },
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
      <Link to={linkTo} style={{ textDecoration: "none"}}>
        <StyledButton       
            color={color}
            size={size}
            onClick={onClick}
            // style={{margin: 'auto'}}
            > 
          {textInButton}
        </StyledButton>
      </Link>
      
    )
  } else {
    return (
      <StyledButton       
          color={color}
          size={size}
          onClick={onClick}
          // style={{margin: 'auto'}}
          > 
        {!placeHolder && textInButton}
        {placeHolder && 
          <Placeholder 
          style={{
            width: "75%",
            display: "inline-block",
            minHeight: "1em",
            opacity: "1",
            backgroundColor: "#DDD8D8"}} animation="wave" />}
        
      </StyledButton>
      
    )
  }
}

export default Button