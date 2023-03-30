// imports here
import React from "react"

// Function should be named the same as the file name, both should begin with a capital letter, and must be in PascalCase.
const EricsTestComponent = (props) => {
    let text = props.text;

    return (
        <>
            <p>{text}</p>
            <p>{"Note that I have added a <> and </> at the beginning and end of this component return statement. This is called a React fragment. This is necessary because I am returning multiple jsx elements, in this case two <p> elements. The return statement is expecting to return one element, to return multiple I must nest my elements inside a fragment."}</p>
        </>
    );
}

// Each component needs an export default at the bottom, with name matching the function name
export default EricsTestComponent;