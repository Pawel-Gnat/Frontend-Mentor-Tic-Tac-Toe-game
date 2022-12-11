import { createSelectPlayerScreen, createGame } from './dom-elements.js'
import { firstPlayer, secondPlayer, CPU } from './game-data.js'

export const renderApp = () => {
	document.body.appendChild(createSelectPlayerScreen())
	// document.body.appendChild(createGame())
}

function setPlayersIcon(e) {
	e.target.classList.add('selected')
	;(e.target.previousElementSibling || e.target.nextElementSibling).classList.remove('selected')

	e.target.dataset.icon === 'x'
		? ((firstPlayer.icon = './assets/icon-x.svg'), (firstPlayer.sign = 'x'))
		: ((firstPlayer.icon = './assets/icon-o.svg'), (firstPlayer.sign = 'o'))
}

function startNewGame(e) {
	if (e.target.dataset.vs === 'cpu') {
		firstPlayer.name = 'you'
		CPU.active = true

		firstPlayer.icon === './assets/icon-x.svg'
			? ((CPU.icon = './assets/icon-o.svg'), (CPU.sign = 'o'))
			: ((CPU.icon = './assets/icon-x.svg'), (CPU.sign = 'x'))
	} else {
		firstPlayer.name = 'p1'
		secondPlayer.active = true

		firstPlayer.icon === './assets/icon-x.svg'
			? ((secondPlayer.icon = './assets/icon-o.svg'), (secondPlayer.sign = 'o'))
			: ((secondPlayer.icon = './assets/icon-x.svg'), (secondPlayer.sign = 'x'))
	}

	document.body.querySelector('div').remove()

	document.body.appendChild(createGame())
}

document.body.addEventListener('click', e => {
	if (e.target.dataset.icon) {
		setPlayersIcon(e)
	}

	if (firstPlayer.icon && e.target.dataset.vs) {
		startNewGame(e)
	}
})
