export const removeAndSomething = (concept) => {
  if (typeof concept == 'string') {
    return false
  } else {
    for (let type in concept) {
      switch(type) {
        case 'ObjectSomeValuesFrom':
          return true
        default:
          return false
      }
    }
  }
}
