export const routes = (r => {
  return r.keys().map(key => r(key).default)
  })(require.context('../', true, /^\.\/views\/((?!\/)[\s\S])+\/router\.js$/)).flat()
