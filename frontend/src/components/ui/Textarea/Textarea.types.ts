import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Header label for the form field.
   */
  label?: string;
  /**
   * Subtitle description text shown below the label.
   */
  description?: string;
  /**
   * Informative helper message shown below the textarea.
   */
  helperText?: string;
  /**
   * Error message string. If present, sets textarea border to warning danger states.
   */
  error?: string;
  /**
   * Sets input border state to success.
   * @default false
   */
  success?: boolean;
  "data-testid"?: string;
}
