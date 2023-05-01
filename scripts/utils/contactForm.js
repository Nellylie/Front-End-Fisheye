
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

  const firstName = document.getElementById('input-3')
  const lastName = document.getElementById('input-5')
  const yourEmail = document.getElementById('input-7')
  const yourMessage = document.getElementById('input-9')

  // gère le focus pour que envoyerButton soit focus aprés la selection de l'input yourMessage
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && document.hasFocus()) {
      if (yourMessage.blur()) { envoyerButton.focus() }
    }
  })

  envoyerButton.addEventListener('click', () => {
    // lance la fonction de check et de confirmation pour les valeurs d'input
    verificationConfirmationMessage(firstName, lastName, yourEmail, yourMessage, messageSucces, messageErreur)
  })

  document.addEventListener('keydown', (e) => {
    const keyCode = e.key
    if (keyCode === 'Enter' && document.hasFocus() && document.querySelector('#envoyer__button:focus')) {
      verificationConfirmationMessage(firstName, lastName, yourEmail, yourMessage, messageSucces, messageErreur)
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.hasFocus()) {
      document.querySelector('#header-principal').focus()
      closeModal()
    }
  })

  placeNom.innerHTML = `${name}`
  modalQuitter.addEventListener('click', closeModal)
}

// déclare la fonction pour verifier les valeurs des inputs et les valider
function verificationConfirmationMessage (firstName, lastName, yourEmail, yourMessage, messageSucces, messageErreur) {
  if (
    checkString(firstName.value) && checkString(lastName.value) && checkEmail(yourEmail.value) && checkString(yourMessage.value)) {
    console.log(`Résumé de votre message : ${firstName.value} - ${lastName.value} - ${yourEmail.value} - Votre message : ${yourMessage.value}`)
    messageSucces.style.visibility = 'visible'
    messageErreur.style.visibility = 'hidden'
  } else {
    messageErreur.style.visibility = 'visible'
    messageSucces.style.visibility = 'hidden'
  }
}
