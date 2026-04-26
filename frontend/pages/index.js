// Enhanced Input Module
// This page allows users to upload multiple objects and categorize them for analysis

import React, { useState } from 'react';

export default function Home() {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        setFiles([...files, ...e.target.files]);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert("Please select at least one file");
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
            <p>Upload one or more objects to analyze them.</p>
            <input type="file" onChange={handleFileChange} multiple />
            <ul>
                {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                ))}
            </ul>
            <button onClick={handleUpload}>Upload All</button>
        </div>
    );
}