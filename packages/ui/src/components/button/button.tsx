"use client";

import { useButton } from "@react-aria/button";
import { AriaButtonProps } from "@react-types/button";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../../lib/utils.js";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md text-sm font-medium",
    "transition-all duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        glow: [
          "bg-gradient-to-r from-slate-600 to-slate-800",
          "text-slate-50",
          "shadow-lg shadow-slate-500/20",
          "hover:shadow-slate-500/40 hover:from-slate-700 hover:to-slate-900",
          "active:opacity-90",
          "dark:from-slate-700 dark:to-slate-900",
          "dark:shadow-slate-800/20",
          "dark:hover:shadow-slate-800/40",
        ].join(" "),
        framed: [
          "border-2 border-slate-300 dark:border-slate-600",
          "bg-transparent",
          "text-slate-700 dark:text-slate-300",
          "hover:bg-slate-100 dark:hover:bg-slate-800",
          "hover:border-slate-400 dark:hover:border-slate-500",
          "active:bg-slate-200 dark:active:bg-slate-700",
        ].join(" "),
        dim: [
          "bg-slate-100 dark:bg-slate-800",
          "text-slate-700 dark:text-slate-300",
          "hover:bg-slate-200 dark:hover:bg-slate-700",
          "active:bg-slate-300 dark:active:bg-slate-600",
        ].join(" "),
        default: [
          "bg-slate-700 dark:bg-slate-600",
          "text-white",
          "hover:bg-slate-800 dark:hover:bg-slate-700",
          "active:bg-slate-900 dark:active:bg-slate-800",
        ].join(" "),
        ghost: [
          "text-slate-700 dark:text-slate-300",
          "hover:bg-slate-100 dark:hover:bg-slate-800",
          "active:bg-slate-200 dark:active:bg-slate-700",
        ].join(" "),
        link: [
          "text-slate-700 dark:text-slate-300",
          "underline-offset-4 hover:underline",
          "p-0 h-auto",
        ].join(" "),
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-lg",
      },
      isFullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      isFullWidth: false,
    },
  }
);

export interface ButtonProps
  extends Omit<
    AriaButtonProps<"button">,
    keyof VariantProps<typeof buttonVariants>
  > {
  children: React.ReactNode;
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  isFullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isFullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const ref = React.useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(
      {
        ...props,
        isDisabled: props.isDisabled || isLoading,
      },
      (forwardedRef as React.RefObject<HTMLButtonElement>) || ref
    );

    return (
      <button
        {...buttonProps}
        ref={(forwardedRef as React.RefObject<HTMLButtonElement>) || ref}
        className={cn(
          buttonVariants({ variant, size, isFullWidth, className })
        )}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden="true"
            />
            <span>Loading...</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex">{rightIcon}</span>}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
