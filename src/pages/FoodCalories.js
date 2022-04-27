// import react from 'react'
// import {useEffect, useState, useRef} from 'react'
// import axios from 'axios'



// function FoodCalories() {
//     const [display, setDisplay] = useState(false);
//     const [foods, setFoods] = useState(new Array())
//     const [search, setSearch] = useState("");
//     const [addedFoods, setAddedFoods] = useState(new Array())
//     const apikey = 'EndH7qeacDH5JlR1wclthblk5wNsu03jFkP7xiXj'
//     const wrapperRef = useRef(null);

//     async function fetchData() {     
//         const r = await axios.get(`foods/list?page_size=100&api_key=${apikey}`)     
//         console.log(r)
//         var calorieData = r.data.map(
//             d => {
//                 var energyObject = d.foodNutrients.filter(
//                     f => f.name == "Energy"
//                     && f.unitName == "KCAL"
//                 )[0]

//                 var calories = 0

//                 if (energyObject != undefined && energyObject.hasOwnProperty("amount")){
//                     calories = energyObject.amount 
//                 }

//                 // var nutrientsWithoutEnergy = d.foodNutrients.filter(
//                 //     f => f.name == "Protein" 
//                 //     || f.name == "Total lipid (fat)"
//                 //     || f.name == "Carbohydrate, by difference"
//                 // )

//                 // var total = 0.0;
//                 // nutrientsWithoutEnergy.forEach(
//                 //     n => { 
//                 //         if (n.hasOwnProperty("amount")){
//                 //             total += n.amount
//                 //         }
//                 //     }
//                 // )

//                 return {"foodDescription": d.description, "servingSize": 100, "calories": calories}
//             }
               
//         )

//         console.log(calorieData)

        
            
//         setFoods(calorieData)   
//     };  

//     useEffect(() => {              
//         fetchData();            
//     }, [foods.length])


//     useEffect(() => {
//         window.addEventListener("mousedown", handleClickOutside);
//         return () => {
//           window.removeEventListener("mousedown", handleClickOutside);
//         };
//     });
    
//     const handleClickOutside = event => {
//         const { current: wrap } = wrapperRef;
//         if (wrap && !wrap.contains(event.target)) {
//           setDisplay(false);
//         }
//     };
    
//     const updateFood = upfo => {
//         setSearch(upfo);
//         setDisplay(false);
//     };
  
    

//     return (
//         <div ref={wrapperRef} className='flex-container flex-column pos-rel'>
//             <input 
//             id="foods" 
//             onClick={() => setDisplay(!display)} 
//             placeholder='Food to search' 
//             value={search} 
//             onChange={event =>setSearch(event.target.value)}
            
//             />
//             {display && (
//                 <div className='autoContainer'>
//                     {foods
//                     //.filter((food) => food.foodDescription.indexOf(search.toLowerCase()) > -1)
//                     .filter((food) => {
//                         var contains = (food.foodDescription.toLowerCase().indexOf(search.toLowerCase()) > -1)
//                         var startswith = food.foodDescription.toLowerCase().startsWith(search.toLowerCase())

//                         return (contains || startswith) 
//                     })
                        
                        
//                     //{
//                         // if (food.foodDescription != null){
//                         //     return (food["foodDescription"].indexOf(search.toLowerCase()) > -1)
//                         // }
//                         // else {
//                         //     return false
//                         // }
                        
//                     //})
//                     .map((d, i) => {
//                         return (
//                             <div onClick= {() => updateFood(d.foodDescription)} className='food' key={i} tabIndex ="0">
//                                 <div>{d.foodDescription}</div>
//                             </div>
//                         );
//                     })}
//                 </div>

//             )}

//         </div>
//     );
// };


// export default FoodCalories;


import React from 'react'
import {useEffect, useState} from 'react';
import './FoodCalories.css';
import AppBar from './AppBar/AppBar';
import AppControlsCounter from './AppControls/AppControlsCounter';
import AppControlsDelete from './AppControls/AppControlsDelete';
import AppControlsInput from './AppControls/AppControlsInput';
import AppMealsList from './AppMealsList/AppMealsList';
import AppModal from './AppModal/AppModal';
import AppMealsFilter from './AppMealsFilter/AppMealsFilter';
const FoodCalories = () => {
   const [meals, setMeals] = useState(new Array());
   const [mealName, setMealName] = useState("");
   const [calories, setCalories] = useState(0);
   const [openModal, setOpenModal] = useState(false);
   const [selectedFilter, setSelectedFilter] = useState("");
   

   const addMealsHandler = () => {

       const oldMeals = meals ? [...meals] : [];
       const meal = {
           mealName,
           calories,
           id: Math.floor(Math.random()* 1000),
       };

       const newMeals = oldMeals.concat(meal);
       if(calories <= 0 || mealName === "") {
           setOpenModal(true);
       }
       else{
           setMeals(newMeals);
           localStorage.setItem("meals", JSON.stringify(newMeals));
       }
       setMealName("");
       setCalories(0);


   };

   const deleteMealHandler = (id) =>{
       const oldMeals = [...meals];
       const newMeals = oldMeals.filter((meal) => meal.id !== id);

       setMeals(newMeals);
       localStorage.setItem("meals", JSON.stringify(newMeals));
   };

   const deleteAllMeals = () => {
       setMeals([])
       localStorage.clear();


   };

   const total = meals
       .map((meal) => meal.calories)
       .reduce((acc, value) => acc + +value, 0)


   useEffect(()=>{
       const oldState = [...meals];
       if(selectedFilter === "Ascending"){
           const ascendingMeals = oldState.sort((a,b)=>a.calories - b.calories);
           setMeals(ascendingMeals);
       }else if(selectedFilter === "Descending"){
           const descendingMeals = oldState.sort((a,b)=>b.calories - a.calories);
           setMeals(descendingMeals);

       }
       
   },[selectedFilter])

   useEffect(()=>{
       
       const localStorageMeals = JSON.parse(localStorage.getItem('meals'));
       if (localStorageMeals !== null){
            setMeals(localStorageMeals);
       }
       else {
            setMeals([]);
       }
       

   }, [setMeals]);

    
   

   return (
       <div className="FoodCalories">
       <AppBar/>
       { openModal ? <AppModal setOpenModal={setOpenModal}/> : "" }
       <AppControlsCounter total = {total}/>
       <AppControlsDelete deleteAllMeals = {deleteAllMeals}/>
       <AppControlsInput 
           addMealsHandler={addMealsHandler} 
           mealName={mealName} 
           calories={calories}
           setMealName={setMealName} 
           setCalories={setCalories} 
       />

       <div className='app__meals__container'>
           <AppMealsFilter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
           <AppMealsList meals={meals} deleteMealHandler={deleteMealHandler}/>
       </div>
       </div>
   );
};
export default FoodCalories;