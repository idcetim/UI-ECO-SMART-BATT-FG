import React, { Component, useRef } from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const FileUploadButton = (props) => {
    const input = useRef()

    const NumberFilesSelected = () => {
        if (input.current && input.current.files.length > 0) {
            return ( 
                <div style={{display: 'flex', flexDirection: 'row', marginLeft: '20px', marginTop: '10px'}}>
                    <div>{input.current.files.length} archivos</div>
                    <div 
                        title="Quitar documentos" 
                        style={{
                            marginLeft: '5px'
                        }}
                        onClick={() => {
                            props.callback()
                            input.current.value = []
                    }}>
                        <CloseIcon />
                    </div>
                </div>
            )
        }
    }

    return (
        <div title={props.title} style={{display: 'flex', flexDirection: 'column'}}>
            <input
                ref={input}
                onChange={props.handleFileUpload}
                type="file"
                style={{ display: "none" }}
                multiple={true}
            />

            <Button variant='outlined'
                onClick={() => input.current.click()}
            >
                Abrir fichero codigos
            </Button>

            {/* <FileUploadIcon 
                style={props.style} 
                onClick={() => input.current.click()} 
            /> */}

            <NumberFilesSelected />
        </ div>
    );
}

export default FileUploadButton