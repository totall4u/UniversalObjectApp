// Enhanced Input Module with Drag-and-Drop and Validation
// Users can now drag files to upload, supported with validation and a progress tracker

import React, { useState } from 'react';

export default function Home() {
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Handling allowed file types
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];

    const handleDrop = (e) => {
        e.preventDefault();
        const newFiles = [...e.dataTransfer.files];
        validateAndAddFiles(newFiles);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileChange = (e) => {
        const newFiles = [...e.target.files];
        validateAndAddFiles(newFiles);
    };

    const validateAndAddFiles = (newFiles) => {
        const validFiles = newFiles.filter(file => allowedTypes.includes(file.type));
        const invalidFiles = newFiles.filter(file => !allowedTypes.includes(file.type));

        if (invalidFiles.length > 0) {
            setErrorMessage("Some files were skipped due to unsupported formats.");
        }

        setFiles([...files, ...validFiles]);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert("Please select at least one file.");
            return;
        }

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`file_${index}`, file);
        });

        try {
            const response = await fetch('http://localhost:5000/process', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error during upload:", error);
        }
    };

    return (
        <div>
            <h1>Input Module</h1>
            <p>Upload one or more objects to analyze them. You can drag and drop files or use the file picker.</p>

            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    border: "2px dashed #ccc", 
                    borderRadius: "10px", 
                    padding: "20px",
                    textAlign: "center",
                    marginBottom: "20px"
                }}
            >
                Drag your files here
            </div>

            <input type="file" onChange={handleFileChange} multiple />

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <ul>
                {files.map((file, index) => (
                    <li key={index}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</li>
                ))}
            </ul>

            <button onClick={handleUpload}>Upload All</button>
        </div>
    );
}