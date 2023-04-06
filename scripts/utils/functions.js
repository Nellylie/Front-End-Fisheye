export function coupePrenom (nameTotal) {
  let i
  for (i = nameTotal.length - 1; i > -1; i--) {
    if (nameTotal.charAt(i) === ' ') {
      break
    }
  }
  const temporaire = nameTotal.toString().substring(0, i)
  return temporaire
}

export function reconnaitreMp4 (titreVideo, titreImage) {
  if (titreVideo !== undefined) {
    return titreVideo
  } else {
    return titreImage
  }
}

export function urlRecupere (urlLien) {
  const url = new URL(urlLien)
  const searchUrl = new URLSearchParams(url.search)
  if (searchUrl) {
    const urlId = url.searchParams.get('id')
    return urlId
  } else {
    return false
  }
}

export function CompteurLikes (likes) {
  let sommeLikes = 0
  likes.forEach((like) => { sommeLikes += like })
  return sommeLikes
}

export function checkEmail (email) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z.]{2,15}$/g.test(email)
}
export function checkString (text) {
  return /^([a-zA-Z]{2,500})+$/g.test(text)
}
