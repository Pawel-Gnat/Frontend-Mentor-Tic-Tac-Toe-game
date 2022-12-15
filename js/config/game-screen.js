import {
	createSelectPlayerScreen,
	createGame,
	changeTurnInfo,
	createModalBg,
	createModal,
	createModalRestart,
} from './dom-elements.js'
import { firstPlayer, secondPlayer, CPU, ties, winCombinations } from './game-data.js'

let activePlayer = {}
let waitingPlayer = {}
let players = []
let nextTurn = true

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

	setTimeout(() => {
		document.body.querySelector('div').remove()
		document.body.appendChild(createGame(activePlayer, ties, waitingPlayer))
		CPUTurn(activePlayer)
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

function CPUTurn(player) {
	if (player.name !== 'CPU') return

	const tiles = Array.from(document.querySelectorAll('.btn--tile'))
	const CPUBoard = player.board
	let chosenNumber = ''

	if (tiles.every(tile => tile.dataset.filled === 'false')) {
		chosenNumber = Number(tiles[(Math.random() * tiles.length) | 0].dataset.value)
	} else {
		const opponentBoard = waitingPlayer.board
		const possibleWinCombinations = winCombinations.filter(array =>
			array.some(number => opponentBoard.includes(number))
		)
		const possibleTilesToChoose = [...new Set(possibleWinCombinations.flat())].filter(
			number => !opponentBoard.includes(number) && !CPUBoard.includes(number)
		)
		chosenNumber = possibleTilesToChoose[(Math.random() * possibleTilesToChoose.length) | 0]
		// console.log(possibleWinCombinations, possibleTilesToChoose)
	}

	setTimeout(() => {
		CPUBoard.push(chosenNumber)
		const chosenTile = tiles.find(tile => Number(tile.dataset.value) === chosenNumber)
		// console.log(chosenNumber)
		chosenTile.dataset.filled = 'true'
		chosenTile.firstChild.src = `${player.icon}`
		chosenTile.firstChild.alt = `${player.sign} icon`
		checkTurn()
	}, 500)
}

function clearBoards() {
	players.forEach(player => (player.board = []))
}

function clearSelectedPlayers() {
	players = []
}

async function delay(duration) {
	return new Promise(resolve => {
		setTimeout(resolve, duration)
	})
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

	document.body.appendChild(createModalBg())
	addPoints(player)
	highlightWinnerTiles(player)

	setTimeout(() => {
		document.body.appendChild(createModal(resultText, activePlayer, textColor))
		clearBoards()
	}, 1000)
}

function highlightWinnerTiles(player) {
	const allTiles = Array.from(document.querySelectorAll('.btn--tile'))
	const playerNumbers = player.board
	const winNumbers = winCombinations.filter(array => array.every(number => playerNumbers.includes(number))).flat()
	const tilesColor = player.sign === 'x' ? 'blue' : 'yellow'
	const winnerTiles = allTiles.filter(tile => winNumbers.includes(Number(tile.dataset.value)))
	let delay = 0

	winnerTiles.forEach(element => {
		delay += 200
		setTimeout(() => {
			element.classList.add(`tile-bg-${tilesColor}`)
		}, delay)
	})
}

function renderModalRestart() {
	document.body.appendChild(createModalBg())

	setTimeout(() => {
		document.body.appendChild(createModalRestart())
	}, 700)
}

function addPoints(winner) {
	winner.score += 1
}

function hideModalElements() {
	const modalBox = document.querySelector('.result')
	const modalBg = document.querySelector('.modal')

	;(async () => {
		await delay(0)
		modalBox.classList.remove('zoom-in')
		modalBox.classList.add('zoom-out')
		await delay(700)
		modalBox.remove()
		modalBg.remove()
	})()
}

function clearPlayersScore() {
	let allPlayers = [firstPlayer, secondPlayer, CPU]

	allPlayers.forEach(player => {
		;(player.score = 0), (player.icon = null), (player.iconOutline = null), (player.sign = null), (player.board = [])
	})
}

function endGame() {
	const game = document.querySelector('.game-screen')
	game.classList.remove('fade-in')
	game.classList.add('fade-out')

	setTimeout(() => {
		game.remove()
	}, 500)
}

function clearTiesScore() {
	ties.score = 0
}

function checkIfDraw() {
	const tiles = Array.from(document.querySelectorAll('.btn--tile'))

	if (tiles.every(tile => tile.dataset.filled === 'true')) {
		clearBoards()
		addPoints(ties)
		// nextTurn = false
		document.body.appendChild(createModalBg())

		setTimeout(() => {
			document.body.appendChild(createModal(null, 'round tied', null))
		}, 1000)
	}
}

function checkWinConditions(player) {
	if (
		winCombinations.some(combination => {
			return combination.every(element => player.board.includes(element))
		})
	) {
		const board = document.querySelector('.board')
		board.classList.add('prevent-click')

		// nextTurn = false
		checkWhoWon(activePlayer)
	}
}

function checkTurn() {
	checkWinConditions(activePlayer)
	checkIfDraw()

	// if (nextTurn) {
	changeTurn(activePlayer, waitingPlayer)
	changeTurnInfo(activePlayer)
	CPUTurn(activePlayer)
	// }

	// console.time("label")

	// setTimeout(() => {
	// 	nextTurn = true
	// }, 0)
}

document.body.addEventListener('click', e => {
	if (e.target.dataset.icon) {
		setPlayersIcon(e)
	}

	if (firstPlayer.icon && e.target.dataset.vs) {
		startNewGame(e)
	}

	if (e.target.classList.contains('btn--restart')) {
		renderModalRestart()
	}

	if (e.target.classList.contains('btn--cancel')) {
		hideModalElements()
	}

	if (e.target.classList.contains('btn--reset')) {
		nextTurn = true
		;(async () => {
			await delay(0)
			hideModalElements()
			await delay(500)
			endGame()
			clearTiesScore()
			clearPlayersScore()
			clearSelectedPlayers()
			await delay(700)
			document.body.appendChild(createSelectPlayerScreen())
		})()
	}

	if (e.target.classList.contains('btn--quit')) {
		nextTurn = true
		;(async () => {
			await delay(0)
			hideModalElements()
			await delay(500)
			endGame()
			clearSelectedPlayers()
			await delay(700)
			document.body.appendChild(createSelectPlayerScreen())
		})()
	}

	if (e.target.classList.contains('btn--next')) {
		nextTurn = true
		;(async () => {
			await delay(0)
			changeTurn(activePlayer, waitingPlayer)
			changeTurnInfo(activePlayer)
			hideModalElements()
			await delay(500)
			endGame()
			await delay(700)
			document.body.appendChild(createGame(activePlayer, ties, waitingPlayer))
			CPUTurn(activePlayer)
		})()
	}

	if (e.target.dataset.value && nextTurn) {
		// console.log(players, activePlayer)
		// console.log(nextTurn)
		nextTurn = false
		// console.log(nextTurn)
		if (waitForCPUTurn(activePlayer)) return

		let tileValue = +e.target.dataset.value

		if (e.target.dataset.filled === 'true') return

		e.target.dataset.filled = 'true'
		e.target.firstChild.src = `${activePlayer.icon}`
		e.target.firstChild.alt = `${activePlayer.sign} icon`

		activePlayer.board.push(tileValue)

		checkTurn()
		// console.log(nextTurn)
	}
})

document.body.addEventListener('mouseover', e => {
	if (waitForCPUTurn(activePlayer)) return

	if (e.target.dataset.filled === 'false') {
		e.target.firstChild.src = `${activePlayer.iconOutline}`
	}
})

document.body.addEventListener('mouseout', e => {
	if (waitForCPUTurn(activePlayer)) return

	if (e.target.dataset.filled === 'false') {
		e.target.firstChild.src = ''
	}
})
