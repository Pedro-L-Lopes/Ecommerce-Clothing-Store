import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import Revise from "../../../components/PurchaseFlow/Revise";
import { useSelector } from "react-redux";
import { DataForm } from "../../../components/PurchaseFlow/DataForm";

export default function Example() {
  const cart = useSelector((state) => state.cart);

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        className="flex items-center bg-black p-2 rounded"
      >
        <Step
          onClick={() => setActiveStep(0)}
          className={`flex items-center justify-center`}
        >
          1
        </Step>
        <Step
          onClick={() => setActiveStep(1)}
          className={`flex items-center justify-center`}
        >
          2
        </Step>
        <Step
          onClick={() => setActiveStep(2)}
          className={`flex items-center justify-center`}
        >
          3
        </Step>
      </Stepper>
      <div className="mt-16">
        {activeStep === 0 && (
          <div>
            <h1 className="text-center text-xl">Revise os produtos</h1>
            {cart &&
              cart.map((product) => (
                <Revise key={product._id} product={product} />
              ))}
          </div>
        )}
        {activeStep === 1 && <DataForm />}
        {/* {activeStep === 2 && <StepContent3 />} */}
      </div>
      <div className="mt-8 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
