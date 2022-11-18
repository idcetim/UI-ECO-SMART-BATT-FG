import React, { Component, useRef } from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const FileUploadButton = (props) => {
    const input = useRef()

    const NumberFilesSelected = () => {
        if (input.current && input.current.files.length > 0) {
            return ( 
                <div>{input.current.files.length} archivos</div>
            )
        }
    }

    return (
        <div title={props.title}>
            <input
                ref={input}
                onChange={props.handleFileUpload}
                type="file"
                style={{ display: "none" }}
                multiple={true}
            />

            <FileUploadIcon 
                style={props.style} 
                onClick={() => input.current.click()} 
            />

            <NumberFilesSelected />
        </ div>
    );
}

export default FileUploadButton