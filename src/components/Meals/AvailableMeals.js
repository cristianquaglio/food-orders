import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
      const fetchMeals = async() => {
        const response = await fetch('https://react-http-f3b12-default-rtdb.firebaseio.com/meals.json');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const respondeData = await response.json();
        const loadedMeals = [];
        for (const key in respondeData) {
          loadedMeals.push({
            id: key, 
            name: respondeData[key].name,
            description: respondeData[key].description,
            price: respondeData[key].price
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      }; 
      fetchMeals().catch(error => {
        setIsLoading(false);
        setHttpError(error.message);
      });    
    }, []);

    if (isLoading) {
      return (<section className={classes.MealsLoading}>
        <p>Loading ...</p>
      </section>);
    }

    if (httpError) {
      return (<section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>);
    }

    const mealsList = meals.map(meal => 
        // <Card><li>{meal.name}</li></Card>
        <MealItem
          id={meal.id} // this is new!
          key={meal.id} 
          name={meal.name} 
          description={meal.description} 
          price={meal.price} 
        />
        );

    return <section className={classes.meal}>
        <Card><ul>{mealsList}</ul></Card>
    </section>
};

export default AvailableMeals;