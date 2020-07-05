import React, { useState } from "react";

const useInput = (initValue) => {
    const [value, setValue] = useState(initValue);

    const onChange = (text) => {
        setValue(text);
    };

    return {value, onChange};
}

export default useInput;