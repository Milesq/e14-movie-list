function lowerCaseKeys(obj) {
  const entries = Object.entries(obj).map(([key, val]) => [
    key.toLowerCase(),
    val,
  ])

  return Object.fromEntries(entries)
}

module.exports = lowerCaseKeys
