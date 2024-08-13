import { Stepper } from 'react-form-stepper'
import { StepperTypes, typeStep } from '@/lib/types/marketplaces'

export default function StepperComponent(props: StepperTypes) {
  return (
    <div className="w-full ">
      <Stepper
        steps={props.stepsData.map((step: typeStep) => ({
          label: step.label,
          active: step.active,
        }))}
        activeStep={props.activeStep}
      />
    </div>
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
