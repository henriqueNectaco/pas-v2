import { Stepper } from 'react-form-stepper'
import { StepperTypes } from '@/types/marketplaces/stepper'

export default function Stepperr(props: StepperTypes) {
  const stepsData = [
    { label: 'Step 1', active: true },
    { label: 'Step 2', active: true },
    { label: 'Step 3', active: true },
    { label: 'Step 4', active: true },
    { label: 'Step 5', active: true },
  ]

  return (
    <Stepper
      steps={props.stepsData.map((step) => ({
        label: step.label,
        active: step.active,
      }))}
      activeStep={props.activeStep}
    />
  )
}

/*
 steps={[
        { label: 'Step 1', active: props.isActive.isActiveStepOne },
        { label: 'Step 2', active: props.isActive.isActiveStepTwo },
        { label: 'Step 3', active: props.isActive.isActiveStepThree },
        { label: 'Step 4', active: props.isActive.isActiveStepFour },
        { label: 'Step 5', active: props.isActive.isActiveStepFive },
      ]}


*/
