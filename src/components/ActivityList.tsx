import { Activity } from '../types/index';
import { categories } from '../data/categories';
import { Dispatch, useMemo } from 'react';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ActivityActions } from '../reducers/activity-reducer';

type ActivityListProps = {
    activities : Activity[],
    dispatch : Dispatch<ActivityActions>
}

const ActivityList = ({activities, dispatch} : ActivityListProps) => {

    const categoryName = useMemo(() => (category : Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''), [categories])

    const isEmptyActivities = useMemo(() => activities.length === 0,[activities])

  return (
    <>
      <h1 className="font-bold text-4xl text-slate-600 text-center">Comidas y Actividades</h1>

      {isEmptyActivities ? <p className='text-center my-5'>No hay Actividades aún...</p> :
        activities.map(activity => (
         <div key={activity.id} className='px-5 py-10 bg-white mt-5 flex justify-between shadow'>
            <div className='space-y-2 relative'>
                <p className={`absolute -top-8 -left-8 px-10 py-2 font-bold uppercase text-white ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>{categoryName(activity.category)}</p>
                <p className='text-2xl font-bold pt-5'>{activity.name}</p>
                <p className='text-4xl font-black text-lime-500'>{activity.calories} <span>Calorias</span></p>
            </div>

            <div className='flex gap-5 items-center'>

                <button
                    onClick={() => dispatch({type : 'set-active', payload : {id: activity.id}})}
                >
                    <PencilSquareIcon className='h-8 w-8 text-gray-800'/>
                </button>

                <button
                    onClick={() => dispatch({type : 'erase-activity', payload : {id: activity.id}})}
                >
                    <XCircleIcon className='h-8 w-8 text-red-500'/>
                </button>
                
            </div>
         </div>
      ))}
    </>
  )
}

export default ActivityList
