const cities = require('./cities.json')

let current = 1 //arad
// const goal = 7 // Rimnicu
// const goal = 9 // Bucharest
// const goal = 13 // Hirsov
const goal = 21 // Not found

const visited = []
const path = []

const isVisited = cityId => {
  return visited.indexOf(cityId) >= 0
}

const isInPath = cityId => {
  return path.indexOf(cityId) >= 0
}

const addToVisited = cityId => {
  if(!isVisited(cityId)) visited.push(cityId)
}

const addToPath = cityId => {
  if(!isInPath(cityId)) path.push(cityId)
}

const isGoal = cityId => {
  return cityId === goal
}

const getCity = cityId => {
  return cities.list.find(city => city.id === cityId)
}

const getActions = cityId => {
  const city = getCity(cityId)
  return city && city.actions && city.actions.length ? city.actions : []
}

const selectNotVisitedAction = actions => {
  const cities = actions.map(action => action.city)
  const selectable = cities.filter(cityId => !isVisited(cityId))
  return selectable && selectable.length ? selectable[0] : null
}

const expand = () => {
  addToVisited(current)
  addToPath(current)
  if(isGoal(current)) {
    return path
  }
  const actions = getActions(current)
  const next = selectNotVisitedAction(actions)
  if(next) {
    current = next
    return expand()
  }
  if(path && path.length) {
    const last = path.pop() //discard current
    const previous = path.pop() // asign previous item in path
    if(last && previous) {
      current = previous
      return expand()
    }
  }
}

const getPathNames = () => {
  return path.map(cityId => getCity(cityId).name)
}

expand()
const pathNames = getPathNames()
console.log('visited', visited)
console.log('path', path)
console.log('path names', pathNames)
