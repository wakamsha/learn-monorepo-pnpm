export default {
  './**/*.@(js|cjs|ts|tsx)': ['cspell', 'prettier -c', 'eslint'],
  './**/*.scss': ['prettier -c', 'stylelint --cache'],
  './**/*.md': ['cspell', 'prettier -c'],
};
