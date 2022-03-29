import react from 'react'
import {useEffect, useState, useRef} from 'react'
import axios from 'axios'



function FoodCalories() {
    const [display, setDisplay] = useState(false);
    const [foods, setFoods] = useState(new Array())
    const [search, setSearch] = useState("");
    const [addedFoods, setAddedFoods] = useState(new Array())
    const apikey = 'EndH7qeacDH5JlR1wclthblk5wNsu03jFkP7xiXj'
    const wrapperRef = useRef(null);

    async function fetchData() {     
        const r = await axios.get(`foods/list?page_size=5&api_key=${apikey}`)     
        console.log(r)
        var calorieData = r.data.map(
            d => {
                var energyObject = d.foodNutrients.filter(
                    f => f.name == "Energy"
                    && f.unitName == "KCAL"
                )[0]

                var calories = 0

                if (energyObject != undefined && energyObject.hasOwnProperty("amount")){
                    calories = energyObject.amount 
                }

                // var nutrientsWithoutEnergy = d.foodNutrients.filter(
                //     f => f.name == "Protein" 
                //     || f.name == "Total lipid (fat)"
                //     || f.name == "Carbohydrate, by difference"
                // )

                // var total = 0.0;
                // nutrientsWithoutEnergy.forEach(
                //     n => { 
                //         if (n.hasOwnProperty("amount")){
                //             total += n.amount
                //         }
                //     }
                // )

                return {"foodDescription": d.description, "servingSize": 100, "calories": calories}
            }
               
        )

        console.log(calorieData)

        
            
        setFoods(calorieData)   
    };  

    useEffect(() => {              
        fetchData();            
    }, [foods.length])


    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
          window.removeEventListener("mousedown", handleClickOutside);
        };
    });
    
    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
          setDisplay(false);
        }
    };
    
    const updateFood = upfo => {
        setSearch(upfo);
        setDisplay(false);
    };
  
    

    return (
        <div ref={wrapperRef} className='flex-container flex-column pos-rel'>
            <input 
            id="foods" 
            onClick={() => setDisplay(!display)} 
            placeholder='Food to search' 
            value={search} 
            onChange={event =>setSearch(event.target.value)}
            
            />
            {display && (
                <div className='autoContainer'>
                    {foods
                    //.filter((food) => food.foodDescription.indexOf(search.toLowerCase()) > -1)
                    .filter((food) => {
                        var contains = (food.foodDescription.toLowerCase().indexOf(search.toLowerCase()) > -1)
                        var startswith = food.foodDescription.toLowerCase().startsWith(search.toLowerCase())

                        return (contains || startswith) 
                    })
                        
                        
                    //{
                        // if (food.foodDescription != null){
                        //     return (food["foodDescription"].indexOf(search.toLowerCase()) > -1)
                        // }
                        // else {
                        //     return false
                        // }
                        
                    //})
                    .map((d, i) => {
                        return (
                            <div onClick= {() => updateFood(d.foodDescription)} className='food' key={i} tabIndex ="0">
                                <div>{d.foodDescription}</div>
                            </div>
                        );
                    })}
                </div>

            )}

        </div>
    );
};


export default FoodCalories;


//

// function FoodCalories() {
//     const [foods, setFoods] = useState('');
//     const [addedFoods, setAddedFoods] = useState(null);

//     const handleInputChange = value => {
//         setFoods(value)
//     };
//     const handleChange = value => {
//         setAddedFoods(value);
//     }
//     const fetchData = () => {
//         return App.get('foods/list?page_size=3&api_key=${apikey}').then(result => {
//             const res = result.data.data;
//             return res;
//         });
//     }
// return (
//     <div className="container">
//         <div className="row alert alert-info">Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</div>
//         <div className="row">
//             <div className="col-md-4"></div>
//             <div className="col-md-4">
//               <AsyncSelect
//               cacheOptions
//               defaultOptions
//               value={setAddedFoods}
//             </div>
//         </div>
//     </div>
// )
// }