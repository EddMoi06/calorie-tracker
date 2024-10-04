import { useMemo } from "react"
import type { Activity } from "../types"
import CaloriesDisplay from "./CaloriesDisplay"

type CalorieTrackerProp = {
    activities : Activity[]
}


const CalorieTraker = ({activities} : CalorieTrackerProp) => {

    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0) ,[activities])

    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0) ,[activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned  ,[activities])

  return (
    <>
      <h2 className="text-center text-4xl font-black text-white">Resumen de Calorias</h2>

        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            
            <CaloriesDisplay 
                calories={caloriesConsumed}
                text={'Consumidas'}
            />

            <CaloriesDisplay 
                calories={caloriesBurned}
                text={'Quemadas'}
            />

            <CaloriesDisplay 
                calories={netCalories}
                text={'Diferencia'}
            />
        </div>
      
    </>
  )
}

export default CalorieTraker
