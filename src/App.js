import { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import axios from "axios";

function App() {
  const [foodDetails, setFoodDetails] = useState([]);

  const onSearchFood = (e) => {
    console.log("value", e?.target?.value);
    getFoodDetails(e?.target?.value);
  };

  const getFoodDetails = async (value) => {
    try {
      const url = `https://themealdb.com/api/json/v1/1/search.php?s=${value}`;
      const result = await axios.get(url);
      setFoodDetails(result?.data?.meals);
    } catch (error) {
      console.error("error in getting food details");
    }
  };

  const getFoodsList = () =>
    foodDetails?.map((food) => {
      
      return(
      <div className="food-item">
        <div className="food-cell">{food?.strMeal}</div>
        <div className="food-cell">{food?.strInstructions}</div>
        <img src={food?.strMealThumb} alt={`${food?.strMeal}-image`}/>
      </div>
    )});
  return (
    <div className="App">
      <h1>Food Details</h1>
      <TextField label="Search Food" onChange={onSearchFood} />
      <div className="food-list">{getFoodsList()}</div>
    </div>
  );
}

export default App;
