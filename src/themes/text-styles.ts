import { defineTextStyles } from "@chakra-ui/react"

export const textStyles = defineTextStyles({
  body: {
    value: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: "400",
      fontSize: ["md", undefined, undefined, "lg"],
      lineHeight: ["initial", "tall", undefined, "2"],
      letterSpacing: "0",
      textDecoration: "None",
      textTransform: "None",
      overflowWrap: "break-word",
    },
  },
  description: {
    description: "The description text style - used in descriptions",
    value: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: "400",
      fontSize: ["sm", undefined, undefined, "md"],
      lineHeight: ["initial", "tall", undefined, "2"],
      letterSpacing: "0",
      textDecoration: "None",
      textTransform: "None",
      overflowWrap: "break-word",
    },
  },
  h1: {
    value: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: "700",
      fontSize: ["2xl", "4xl", undefined, "7xl"],
      lineHeight: ["short", "shorter", undefined, "none"],
      letterSpacing: "-0.02em",
      textDecoration: "None",
      textTransform: "None",
      overflowWrap: "break-word",
    },
  },
  h2: {
    description: "The subheading text style - used in subheadings",
    value: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: "700",
      fontSize: ["3xl", "4xl", undefined, "5xl"],
      lineHeight: ["short", "shorter", undefined, "none"],
      letterSpacing: "-0.01em",
      textDecoration: "None",
      textTransform: "None",
      overflowWrap: "break-word",
    },
  },
  h3: {
    value: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: "600",
      fontSize: ["xl", "2xl", undefined, "3xl"],
      lineHeight: ["short", "shorter", undefined, "none"],
      letterSpacing: "0em",
      textDecoration: "None",
      textTransform: "None",
      overflowWrap: "break-word",
    },
  },
  h4: {
    value: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: "500",
      fontSize: ["md", "lg", undefined, "xl"],
      lineHeight: ["short", "shorter", undefined, "none"],
      letterSpacing: "0em",
      textDecoration: "None",
      textTransform: "None",
      overflowWrap: "break-word",
    },
  },
  h5: {
    value: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: "500",
      fontSize: ["sm", "md", undefined, "lg"],
      lineHeight: ["short", "shorter", undefined, "none"],
      letterSpacing: "0em",
      textDecoration: "None",
      textTransform: "None",
      overflowWrap: "break-word",
    },
  }
})