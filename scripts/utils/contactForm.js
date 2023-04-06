
import { checkString, checkEmail } from '../utils/functions.js'

export function displayModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'flex'
}

export function closeModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'none'
}

export function modalContact (name) {
  const modalQuitter = document.querySelector('.modal__quitter')
  const placeNom = document.querySelector('.modal__nom')
  const messageErreur = document.querySelector('.modal__erreur')
  const messageSucces = document.querySelector('.modal__succes')
  const envoyerButton = document.querySelector('#envoyer__button')

  const firstName = document.getElementById('3')
  const lastName = document.getElementById('5')
  const yourEmail = document.getElementById('7')
  const yourMessage = document.getElementById('9')

  envoyerButton.addEventListener('click', () => {
    if (
      checkString(firstName.value) && checkString(lastName.value) && checkEmail(yourEmail.value) && checkString(yourMessage.value)) {
      console.log(`Résumé de votre message : ${firstName.value} - ${lastName.value} - ${yourEmail.value} - Votre message : ${yourMessage.value}`)
      messageSucces.style.display = 'block'
      messageErreur.style.display = 'none'
    } else {
      messageErreur.style.display = 'block'
      messageSucces.style.display = 'none'
    }
  })

  placeNom.innerHTML = `${name}`
  modalQuitter.addEventListener('click', closeModal)
}
