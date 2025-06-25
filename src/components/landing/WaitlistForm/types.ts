export type SubmissionState = "input" | "loading" | "success" | "error";

export interface WaitlistFormProps {
  className?: string;
}

export interface FormStateProps {
  submissionState: SubmissionState;
  errorMessage: string;
  onReset: () => void;
}
