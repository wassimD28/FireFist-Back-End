// Helper function to ensure value is always an array
const ensureArray = (value) => {
  if (value === undefined || value === '') return [];
  return Array.isArray(value) ? value : [value];
};

module.exports = ensureArray