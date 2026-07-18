import React from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button.
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * Shows a loading spinner and disables interaction.
   * @default false
   */
  loading?: boolean;
  /**
   * Optional text to show alongside the spinner when loading.
   */
  loadingText?: string;
  /**
   * Icon element to display to the left of the button text.
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon element to display to the right of the button text.
   */
  rightIcon?: React.ReactNode;
  /**
   * If true, styles the button to house only an icon.
   * @default false
   */
  iconOnly?: boolean;
  /**
   * If true, the button will expand to take the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Test identifier for automation testing.
   */
  "data-testid"?: string;
}
