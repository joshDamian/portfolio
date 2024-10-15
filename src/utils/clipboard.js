export const copyToClipboard = async (text) => {
  // Use navigator API to copy text to clipboard
  if (navigator?.clipboard) {
    await navigator.clipboard.writeText(text);

    return true;
  }

  return false;
};
