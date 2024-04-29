import React from 'react'
import { styled } from './../stitches.config';
import {Link } from "react-router-dom";
import Placeholder from 'react-bootstrap/Placeholder';

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
    fontFamily: "sans-serif",
    border: "none",

    color: "white",    

    variants: {
      color: {
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
      },
      size: {
        game: {
          py: "$xxxl",
          minWidth: "16rem",
          borderRadius: "$rounded_lg",
          fontSize: "$lg",
          fontWeight: "$bold",
        },
        normal: {
          py: "$lg",
          minWidth: "8rem",
          borderRadius: "$rounded_md",
          fontSize: "$sm",
          fontWeight: "normal",
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