import {
	createSelectPlayerScreen,
	createGame,
	changeTurnInfo,
	createModal,
	createModalRestart,
} from './dom-elements.js'
import { firstPlayer, secondPlayer, CPU, winCombinations } from './game-data.js'

let activePlayer = {}
let waitingPlayer = {}
let players = []

export const renderApp = () => {
	document.body.appendChild(createSelectPlayerScreen())
}

function setPlayersIcon(e) {
	e.target.classList.add('selected')
	;(e.target.previousElementSibling || e.target.nextElementSibling).classList.remove('selected')

	e.target.dataset.icon === 'x'
		? ((firstPlayer.icon = './assets/icon-x.svg'),
		  (firstPlayer.iconOutline = './assets/icon-x-outline.svg'),
		  (firstPlayer.sign = 'x'))
		: ((firstPlayer.icon = './assets/icon-o.svg'),
		  (firstPlayer.iconOutline = './assets/icon-o-outline.svg'),
		  (firstPlayer.sign = 'o'))
}

function startNewGame(e) {
	if (e.target.dataset.vs === 'cpu') {
		firstPlayer.name = 'You'
		CPU.active = true

		firstPlayer.icon === './assets/icon-x.svg'
			? ((CPU.icon = './assets/icon-o.svg'), (CPU.sign = 'o'))
			: ((CPU.icon = './assets/icon-x.svg'), (CPU.sign = 'x'))

		players = [firstPlayer, CPU]
	} else {
		firstPlayer.name = 'P1'
		secondPlayer.active = true

		firstPlayer.icon === './assets/icon-x.svg'
			? ((secondPlayer.icon = './assets/icon-o.svg'),
			  (secondPlayer.iconOutline = './assets/icon-o-outline.svg'),
			  (secondPlayer.sign = 'o'))
			: ((secondPlayer.icon = './assets/icon-x.svg'),
			  (secondPlayer.iconOutline = './assets/icon-x-outline.svg'),
			  (secondPlayer.sign = 'x'))

		players = [firstPlayer, secondPlayer]
	}

	document.body.querySelector('div').classList.add('fade-out')

	activePlayer = startingPlayer()
	waitingPlayer = idlePlayer()

	startingPlayer()
	idlePlayer()

	setTimeout(() => {
		document.body.querySelector('div').remove()
		document.body.appendChild(createGame(activePlayer, waitingPlayer))
	}, 500)
}

function startingPlayer() {
	return players.filter(player => player.sign === 'x').shift()
}

function idlePlayer() {
	return players.filter(player => player.name !== activePlayer.name).shift()
}

function changeTurn(active, waiting) {
	let temporaryPlayer = active
	activePlayer = waiting
	waitingPlayer = temporaryPlayer

	return [activePlayer, waitingPlayer]
}

function waitForCPUTurn(player) {
	if (player.name === 'CPU') {
		return true
	}
}

function checkWinConditions(player) {
	if (
		winCombinations.some(combination => {
			return combination.every(element => player.board.includes(element))
		})
	)
		checkWhoWon(activePlayer)
}

function checkWhoWon(player) {
	let resultText = ''
	let textColor = player.sign === 'x' ? 'blue' : 'yellow'

	switch (player.name) {
		case 'You':
			resultText = 'you won!'
			break
		case 'CPU':
			resultText = 'oh no, you lost...'
			break
		case 'P1':
			resultText = 'player 1 wins!'
			break
		case 'P2':
			resultText = 'player 2 wins!'
			break
	}

	document.body.appendChild(createModal(resultText, activePlayer, textColor))
}

function checkIfDraw() {
	const tiles = Array.from(document.querySelectorAll('.btn--tile'))

	if (tiles.every(tile => tile.dataset.filled === 'true'))
		document.body.appendChild(createModal(null, 'round tied', null))
}

function renderModalRestart() {
	document.body.appendChild(createModalRestart())
}

document.body.addEventListener('click', e => {
	if (waitForCPUTurn(activePlayer)) return

	if (e.target.dataset.icon) {
		setPlayersIcon(e)
	}

	if (firstPlayer.icon && e.target.dataset.vs) {
		startNewGame(e)
	}

	if (e.target.classList.contains('btn--restart')) {
		renderModalRestart()
	}

	if (e.target.dataset.value) {
		let tileValue = +e.target.dataset.value

		if (e.target.dataset.filled === 'true') return

		e.target.dataset.filled = 'true'
		e.target.firstChild.src = `${activePlayer.icon}`
		e.target.firstChild.alt = `${activePlayer.sign} icon`

		activePlayer.board.push(tileValue)

		checkWinConditions(activePlayer)
		checkIfDraw()
		changeTurn(activePlayer, waitingPlayer)
		changeTurnInfo(activePlayer)
	}
})

document.body.addEventListener('mouseover', e => {
	if (e.target.dataset.filled === 'false') {
		e.target.firstChild.src = `${activePlayer.iconOutline}`
	}
})

document.body.addEventListener('mouseout', e => {
	if (e.target.dataset.filled === 'false') {
		e.target.firstChild.src = ''
	}
})
