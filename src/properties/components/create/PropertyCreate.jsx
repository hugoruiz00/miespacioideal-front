import React from 'react'
import { PropertyCreateStepOne } from './PropertyCreateStepOne';
import { PropertyCreateStepTwo } from './PropertyCreateStepTwo';
import { PropertyCreateStepThree } from './PropertyCreateStepThree';
import { PropertyCreateStepFour } from './PropertyCreateStepFour';
import { useSelector } from 'react-redux';

export const PropertyCreate = () => {

  const {currentStep} = useSelector(state => state.properties);

  const renderStep = () => {
    const steps = {
      'step-one': PropertyCreateStepOne,
      'step-two': PropertyCreateStepTwo,
      'step-three': PropertyCreateStepThree,
      'step-four': PropertyCreateStepFour,
    }

    const Step = steps[currentStep];
    return <Step />
  }

  return (
    <div className="py-9">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-2">
        <div className='flex'>
          <div className='w-2/12'>

          </div>
          <div className='w-9/12'>
            { renderStep() }
          </div>
        </div>
      </div>
    </div>
  )
}
