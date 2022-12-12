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

// export const currentRound = {
// 	activePlayer: '',
// }

// export let activePlayer = {}

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
