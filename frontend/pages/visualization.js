// Enhancing Visualization Module
// This page now displays uploaded and analyzed files in a visual hierarchy

import React from 'react';

export default function Visualization() {
    const dummyData = {
        "file_1": "Processed file: Device_Specs.pdf",
        "file_2": "Processed file: Image_001.png",
    };

    return (
        <div>
            <h1>Visualization Module</h1>
            <p>Displaying analyzed file results:</p>
            <ul>
                {Object.entries(dummyData).map(([key, value]) => (
                    <li key={key}>{value}</li>
                ))}
            </ul>
        </div>
    );
}