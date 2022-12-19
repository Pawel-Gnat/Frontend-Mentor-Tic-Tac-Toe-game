// let playerScore
// let CPUScore
// let tiesScore

export const firstPlayer = {
	name,
	score: 0,
	icon: null,
	iconOutline: null,
	sign: null,
	board: [],
}

export const secondPlayer = {
	name: 'P2',
	score: 0,
	icon: null,
	sign: null,
	board: [],
	active: false,
}

export const CPU = {
	name: 'CPU',
	score: 0,
	icon: null,
	iconOutline: null,
	sign: null,
	board: [],
	active: false,
}

export const ties = {
	score: 0,
}

export const winCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2],
]

export const saveScore = (player, score) => {
	if (player.name === 'You') {
		localStorage.setItem('player-save', `${score}`)
	} else if (player.name === 'CPU') {
		localStorage.setItem('cpu-save', `${score}`)
	} else {
		localStorage.setItem('ties-save', `${score}`)
	}
}

export const loadScore = () => {
	firstPlayer.score = +localStorage.getItem('player-save')
	CPU.score = +localStorage.getItem('cpu-save')
	ties.score = +localStorage.getItem('ties-save')
}
