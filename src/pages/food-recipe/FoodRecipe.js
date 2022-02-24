import React, { useState, useEffect } from "react";
import "./FoodRecipe.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Ingredients from "../../components/ingredients/Ingredients";
import Instructions from "../../components/instructions/Instructions";

class FoodsApi {
    constructor () {
        this.api = axios.create({ baseURL: "https://www.themealdb.com/api/json/v1/1" });
    };
    getRecipe = async id => {
        try {
            const { data: { meals } } = await this.api.get(`/lookup.php?i=${id}`);

            return meals[0];
        } catch (error) {
            throw new Error(`Cannot Fetch Recipe => ${error}`);
        };
    };
};

const foodsApi = new FoodsApi();

const FoodRecipe = () => {
    const { idRecipe } = useParams();
    const [recipe, setRecipe] = useState({});

    useEffect(() => (async () => setRecipe(await foodsApi.getRecipe(idRecipe)))(), [idRecipe]);

    return (
        <div id="recipe">
            <section id="section">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <div>
                    <h1>{recipe.strMeal}</h1>
                    <Ingredients idRecipe={idRecipe} />
                </div>
            </section>
            <Instructions idRecipe={idRecipe} strYoutube={recipe.strYoutube} />
        </div>
    );
};

export default FoodRecipe;