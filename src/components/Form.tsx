import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { categories } from "../data/categories"
import type { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const Form = ({dispatch, state} : FormProps)  => {

    const initialState : Activity = {
        id: uuidv4(),
        category: 1,
        name: '',
        calories: 0
    }

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect( () => {
        if(state.activeId){
            const selectActiveId = state.activities.filter( stateSelected => stateSelected.id === state.activeId)[0]
            setActivity(selectActiveId)
        }
    },[state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        
        const isNumberField = ['category', 'calories'].includes(e.target.id);
        setActivity({
            ... activity,
            [e.target.id] : isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        dispatch({ type: "save-activity", payload: { newActivity: activity} })

        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

  return (
    <form 
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categorías:</label>
            <select 
                className="border border-slate-400 w-full p-2 rounded-lg bg-white"
                id="category"
                value={activity.category}
                onChange={handleChange}
            >
                {categories.map( category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad:</label>

            <input 
                type="text" 
                id="name"
                className="border border-slate-400 p-2 rounded-lg"
                placeholder="Ej: Comida, Jugo de Naranja, Ensalada, Pesas, Ejercicios "
                value={activity.name}
                onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias:</label>

            <input 
                type="number" 
                id="calories"
                className="border border-slate-400 p-2 rounded-lg"
                placeholder="Ej: 300 o 500"
                value={activity.calories}
                onChange={handleChange}
            />
        </div>

        <input 
            type="submit"
            className="bg-gray-600 hover:bg-gray-900 transition-all w-full p-2 rounded-sm hover:shadow-md font-bold text-white uppercase disabled:opacity-10" 
            value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            disabled={!isValidActivity()}
        />
    </form>
  )
}

export default Form
