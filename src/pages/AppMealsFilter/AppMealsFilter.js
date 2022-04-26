import React from 'react'

const AppMealsFilter = ({selectedFilter, setSelectedFilter}) =>{

   
    return (
        <div className="app__meals__container_select">
        <select defaultValue={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value) }>
            <option value=""></option>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
        </select> 
           
        </div>
    );
};

export default AppMealsFilter;