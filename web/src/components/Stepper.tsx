/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper, { Orientation } from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ModalFormProps as FormProps } from "./Modal";
import FormGroup from "@/components/FormGroup";
import CustomFileUpload, { FileUploadProps } from "./fileUploader";

export interface StepperContent {
  label: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formProps?: FormProps<any>;
  fileUploaderProps?: FileUploadProps;
}
export interface CustomStepperProps {
  stepperContent: StepperContent[];
  orientation?: Orientation;
}

interface StepValidity {
  form?: boolean;
  file?: boolean;
}

export interface FormGroupRef {
  submitForm?: () => void;
}

const CustomStepper = ({
  orientation = "vertical",
  stepperContent,
}: CustomStepperProps) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const initialValidity: StepValidity[] = stepperContent.map((step) => ({
    form: step.formProps ? false : true, // if form exists, default to false
    file: step.fileUploaderProps ? false : true, // if file uploader exists, default to false
  }));

  const [stepsValidity, setStepsValidity] =
    React.useState<StepValidity[]>(initialValidity);

  const getUpdateStepValidityCallback =
    (stepIndex: number, key: keyof StepValidity) => (value: boolean) => {
      setStepsValidity((prev) => {
        const newValidity = [...prev];
        newValidity[stepIndex] = {
          ...newValidity[stepIndex],
          [key]: value,
        };

        return newValidity;
      });
    };

  const handleNext = () => {
    if (activeStep < stepperContent.length) {
      const currentStepValidity = stepsValidity[activeStep];
      const isCurrentValid = Object.values(currentStepValidity).every(Boolean);
      if (!isCurrentValid) return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const isCurrentStepValid =
    activeStep < stepperContent.length
      ? Object.values(stepsValidity[activeStep]).every(Boolean)
      : true;

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // For storing form data from different steps:
  const [collectedFormData, setCollectedFormData] = React.useState<{
    [key: number]: any;
  }>({});

  const handleFormFinish = (stepIndex: number, values: any) => {
    // Store or process the form values as needed
    setCollectedFormData((prev) => ({
      ...prev,
      [stepIndex]: values,
    }));

    // If this is the final step, you might call a final submission function here.
    if (stepIndex === stepperContent.length - 1) {
      // Final submission action: e.g., call an API or trigger a parent callback
      console.log("All steps finished, submitting final data:", {
        ...collectedFormData,
        [stepIndex]: values,
      });
    }

    // Move to the next step if it exists.
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const formRefs = React.useRef<(FormGroupRef | null)[]>([]);

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation={orientation}>
        {stepperContent.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === stepperContent.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent
              sx={{
                // marginBottom: 1, // Pahiyom ang spacing
                marginRight: 4, // Custom padding kung kinahanglan
                overflowY: "auto",
                width: "100%",
              }}
            >
              <Typography>{step.description}</Typography>
              {/* Content is here */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  position: "relative",
                  height: "100%", // Ensures full height
                }}
              >
                {/* Form Content - Should Expand */}
                <Box
                  sx={{
                    flexGrow: 1,
                    overflow: "auto",
                    maxHeight: 250,
                    width: "100%",
                  }}
                >
                  {step.formProps ? (
                    <FormGroup
                      ref={(el) => (formRefs.current[index] = el) as any}
                      {...step.formProps}
                      onValidityChange={getUpdateStepValidityCallback(
                        index,
                        "form"
                      )}
                      onFinish={(values) => handleFormFinish(index, values)}
                    />
                  ) : step.fileUploaderProps ? (
                    <CustomFileUpload
                      {...step.fileUploaderProps}
                      onFileChange={getUpdateStepValidityCallback(
                        index,
                        "file"
                      )}
                    />
                  ) : null}
                </Box>

                {/* Buttons - Fixed at Bottom */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    position: "sticky",
                    marginBottom: 4,
                    backgroundColor: "white", // Ensures buttons don’t overlap content
                    zIndex: 1, // Makes sure it's above form fields
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (
                        formRefs.current[index] &&
                        formRefs.current[index]?.submitForm
                      ) {
                        formRefs.current[index]!.submitForm();
                      } else {
                        handleNext();
                      }
                    }}
                    disabled={!isCurrentStepValid} // ✅ Ensure this updates properly
                  >
                    {index === stepperContent.length - 1
                      ? "Finish"
                      : "Continue"}
                  </Button>
                  <Button disabled={index === 0} onClick={handleBack}>
                    Back
                  </Button>
                </Box>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === stepperContent.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default CustomStepper;
