// jest-dom's Vitest entry adds the DOM matchers (toHaveTextContent, toBeInTheDocument…)
// to Vitest's expect. Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/vitest";

// jsdom has no layout, so window.scrollTo is a stub that logs a "Not
// implemented" error when called. ScrollToTop calls it on every navigation.
window.scrollTo = () => {};
