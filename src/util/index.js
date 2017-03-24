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

export const getClassAlias = (originalString) => {
  const splitStr = originalString.split(':')
  return splitStr[1]
}

export const getClassArticle = (classAlias) => {
  const f = classAlias[0].toUpperCase()
  // console.log(f)
  return ((f == "A" || f == "E" || f == "I" || f == "O" || f == "U") ? 'an' : 'a')
}
