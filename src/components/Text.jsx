import React from 'react'
import { styled } from './../stitches.config';


function Text({
    text,
    size,
}) {
    const StyledText = styled('span', {    
        color: "black",    
    
        variants: {
          size: {
            normal: {
            },
          },
        },
      });


    return (
        <StyledText size={size}>
            {text}
        </StyledText>
    )
}

export default Text