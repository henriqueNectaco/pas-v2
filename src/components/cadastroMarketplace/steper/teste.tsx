import { Stepper } from 'react-form-stepper'
const CustomStepper = () => {
  return (
    <Stepper
      steps={[
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 1' },
        { label: 'Step 2' },
      ]}
      activeStep={1}
    />
  )
}

export default CustomStepper
