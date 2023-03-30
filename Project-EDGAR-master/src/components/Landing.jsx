// imports here
import React from "react"

// Function should be named the same as the file name, both should begin with a capital letter, and must be in PascalCase.
const Landing = (props) => {
    let text = props.text;

    return (
        <>
            <p>{text}</p>
            <p>{"test"}</p>
        </>
    );
}

// Each component needs an export default at the bottom, with name matching the function name
export default Landing;