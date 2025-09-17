import React from 'react'
import PlaceInformation from './PlaceInformation'

const DailyPlan = ({plans}) => {
  return (
    <div>
      <h1 className='font-bold text-lg'>Places to visit</h1>

      <div>
        {
          plans?.itinerary.map((plan) => (
            <div>
              <h2 className='font-bold text-lg'>Day : {plan.day}</h2>
              <div className='grid md:grid-cols-2 gap-5'>
                {
                plan?.plan.map((place) => (
                  <div className=''>
                    <p className='font-medium text-sm text-orange-400'>{place.bestTimeToVisit}</p>
                    <PlaceInformation place={place}/>
                  </div>
                ))
              }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DailyPlan
