
const requireAll = require('require-all')
const path = require('path')

module.exports = (app) => {
  const routes = requireAll(__dirname)

  Object.keys(routes).forEach(key => {
    if (key !== path.basename(__filename).slice(0, -3)) {
      routes[key] = routes[key](app)
    }
  })

  return routes
}
