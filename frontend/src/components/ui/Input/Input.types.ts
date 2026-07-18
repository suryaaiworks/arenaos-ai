import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Header label for the form field.
   */
  label?: string;
  /**
   * Subtitle description text shown below the label.
   */
  description?: string;
  /**
   * Informative helper message shown below the input.
   */
  helperText?: string;
  /**
   * Error message string. If present, sets input border to warning danger states.
   */
  error?: string;
  /**
   * Sets input border state to success.
   * @default false
   */
  success?: boolean;
  /**
   * Icon prefix displayed inside the input.
   */
  startIcon?: React.ReactNode;
  /**
   * Icon suffix displayed inside the input.
   */
  endIcon?: React.ReactNode;
  "data-testid"?: string;
}
