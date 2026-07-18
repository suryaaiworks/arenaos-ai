import React from "react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "./Button.types";
import Spinner from "../Spinner";

/**
 * Premium Action Button.
 * Utilizes forwardRef and standard HTML attributes.
 * Automatically manages disable states and icon swaps during loading operations.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      loadingText,
      disabled = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      iconOnly = false,
      className = "",
      type = "button",
      "data-testid": dataTestId = "button",
      ...props
    },
    ref
  ) => {
    const baseStyle =
      "inline-flex items-center justify-center font-semibold tracking-wide rounded-full transition-all duration-180 disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-center select-none active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-arena-primary focus-visible:ring-offset-2";

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-arena-primary to-arena-secondary text-white hover:brightness-110 hover:shadow-[0_0_25px_rgba(79,124,255,0.35)] shadow-md shadow-arena-primary/10",
      secondary:
        "bg-arena-surface border border-arena-border text-arena-text hover:bg-arena-card hover:border-arena-primary/30",
      outline:
        "bg-transparent border border-arena-primary/40 text-arena-primary hover:bg-arena-primary/10",
      ghost: "bg-transparent text-arena-muted hover:text-arena-text hover:bg-arena-hover",
      destructive:
        "bg-arena-danger text-white hover:bg-arena-danger/90 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] shadow-md shadow-arena-danger/10",
    };

    const sizeClasses = {
      xs: "px-3 py-1.5 text-[10px]",
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-2.5 md:py-3 text-sm",
      lg: "px-8 py-3.5 md:py-4 text-base",
      xl: "px-10 py-4 md:py-5 text-lg",
    };

    const spinnerSizes = {
      xs: "xs" as const,
      sm: "xs" as const,
      md: "sm" as const,
      lg: "md" as const,
      xl: "md" as const,
    };

    // Make spinner contrast clean based on the button background
    const spinnerVariant = variant === "primary" || variant === "destructive" ? "white" : "primary";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          baseStyle,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          iconOnly && "p-2 rounded-full",
          className
        )}
        data-testid={dataTestId}
        aria-busy={loading ? "true" : undefined}
        aria-disabled={disabled || loading ? "true" : undefined}
        {...props}
      >
        {/* Loading Spinner replacing normal leftIcon */}
        {loading && (
          <Spinner
            size={spinnerSizes[size]}
            variant={spinnerVariant}
            className={cn(!iconOnly && (loadingText || children) && "mr-2")}
          />
        )}

        {/* Left Icon (only visible when not loading) */}
        {!loading && leftIcon && (
          <span className="inline-flex mr-2" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Button Content Text */}
        {!iconOnly && (
          <span className="truncate">{loading && loadingText ? loadingText : children}</span>
        )}

        {/* Icon Only visual content */}
        {iconOnly && !loading && children}

        {/* Right Icon */}
        {!loading && rightIcon && (
          <span className="inline-flex ml-2" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
