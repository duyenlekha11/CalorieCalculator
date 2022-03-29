import React, { useEffect, useState, useRef} from "react";

const Food = () => {
    
    const [options, setOptions] = useState([]);
    const [serch, setSearch] = useState("");

    useEffect(() => {
        const fd = [];
        const foods = new Array(10000).fill().map((v, i) => fetch(`https://api.nal.usda.gov/fdc/v1/`))
    });
    
    
};

function FoodCount() {
    return (
        <div className="FoodCount">
            <h1>Food Calories</h1>
            <div className="auto-container">
                <Food/>
            </div>
        </div>
    );
}

export default FoodCount;