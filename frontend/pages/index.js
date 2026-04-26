// Temporary file for Input Module
// This is the homepage where users can upload or scan objects

import React, { useState } from 'react';

export default function Home() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first");
            return;
        }
        
        const formData = new FormData();
        formData.append('file', file);

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
            <p>Upload or scan objects to analyze them.</p>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}