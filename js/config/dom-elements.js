const createLogoImage = () => {
	const logoImage = document.createElement('img')
	logoImage.className = 'logo'
	logoImage.src = './assets/logo.svg'
	logoImage.alt = ''
	logoImage.setAttribute('aria-hidden', true)

	return logoImage
}

const createPlayerIconPick = () => {
	const selectPlayerIconContainer = document.createElement('div')
	selectPlayerIconContainer.className = 'player-icon-container'

	const playerFirstInfo = document.createElement('p')
	playerFirstInfo.innerText = `pick player 1's mark`

	const iconContainer = document.createElement('div')
	iconContainer.className = 'icon-container'

	const xBtn = document.createElement('button')
	xBtn.className = 'x-btn btn'
	xBtn.type = 'button'
	xBtn.dataset.icon = 'x'
	const xIconImg = document.createElement('img')
	xIconImg.src = './assets/icon-x.svg'
	xIconImg.alt = 'Cross icon'

	xBtn.appendChild(xIconImg)

	const oBtn = document.createElement('button')
	oBtn.className = 'o-btn btn'
	oBtn.type = 'button'
	oBtn.dataset.icon = 'o'
	const oIconImg = document.createElement('img')
	oIconImg.src = './assets/icon-o.svg'
	oIconImg.alt = 'Circle icon'

	oBtn.appendChild(oIconImg)

	iconContainer.append(xBtn, oBtn)

	const playerSecondInfo = document.createElement('p')
	playerSecondInfo.innerText = 'remember: x goes first'

	selectPlayerIconContainer.append(playerFirstInfo, iconContainer, playerSecondInfo)

	return selectPlayerIconContainer
}

const createNewGameVsCPUButton = () => {
	const buttonCPU = document.createElement('button')
	buttonCPU.type = 'button'
	buttonCPU.dataset.vs = 'cpu'
	buttonCPU.className = 'btn--cpu btn'
	buttonCPU.innerText = 'new game (vs cpu)'

	return buttonCPU
}

const createNewGameVsPlayerButtons = () => {
	const buttonPlayer = document.createElement('button')
	buttonPlayer.type = 'button'
	buttonPlayer.dataset.vs = 'player'
	buttonPlayer.className = 'btn--player btn'
	buttonPlayer.innerText = 'new game (vs player)'

	return buttonPlayer
}

export const createSelectPlayerScreen = () => {
	const container = document.createElement('div')
	container.className = 'select-player-screen fade-in'
	container.id = 'players-screen'

	container.append(
		createLogoImage(),
		createPlayerIconPick(),
		createNewGameVsCPUButton(),
		createNewGameVsPlayerButtons()
	)

	return container
}

const createPlayerIcon = player => {
	const iconImage = document.createElement('img')
	iconImage.src = player.icon
	iconImage.alt = ''
	iconImage.setAttribute('aria-hidden', true)

	return iconImage
}

const createTurnInfo = player => {
	const turnContainer = document.createElement('div')
	turnContainer.className = 'turn-info'
	turnContainer.setAttribute('aria-label', `${player.name} turn`)

	const turnText = document.createElement('span')
	turnText.innerText = 'turn'

	turnContainer.append(createPlayerIcon(player), turnText)

	return turnContainer
}

const createRestartGameButton = () => {
	const restartButton = document.createElement('button')
	restartButton.className = 'btn--restart btn'
	restartButton.type = 'button'

	const restartIcon = document.createElement('img')
	restartIcon.src = './assets/icon-restart.svg'
	restartIcon.alt = 'Restart game icon'

	restartButton.appendChild(restartIcon)

	return restartButton
}

const createGameHeaderInfoContainer = player => {
	const gameHeader = document.createElement('div')
	gameHeader.className = 'game-header'

	gameHeader.append(createLogoImage(), createTurnInfo(player), createRestartGameButton())

	return gameHeader
}

const createTiles = value => {
	const tile = document.createElement('button')
	tile.className = 'btn btn--tile'
	tile.type = 'button'
	tile.dataset.value = `${value}`
	tile.dataset.filled = false

	const tileImg = document.createElement('img')
	tileImg.src = ''
	tileImg.alt = ''

	tile.appendChild(tileImg)

	return tile
}

const createBoard = () => {
	const boardContainer = document.createElement('div')
	boardContainer.className = 'board'

	for (let i = 0; i < 9; i++) {
		boardContainer.append(createTiles(i))
	}

	return boardContainer
}

const createScoreInfoElement = player => {
	let sign = player.sign
	let name = player.name
	let score = player.score

	const infoElement = document.createElement('div')
	const infoElementPlayerName = document.createElement('p')
	const infoElementPlayerScore = document.createElement('p')

	if (sign === 'x') {
		infoElement.className = 'tile-bg-blue'
	} else {
		infoElement.className = 'tile-bg-yellow'
	}

	infoElementPlayerName.innerText = `${sign} (${name})`
	infoElementPlayerScore.innerText = `${score}`

	infoElement.append(infoElementPlayerName, infoElementPlayerScore)

	return infoElement
}

const createTiesInfoElement = ties => {
	const infoElement = document.createElement('div')
	const infoElementText = document.createElement('p')
	const infoElementTiesScore = document.createElement('p')

	infoElementText.innerText = 'ties'
	infoElementTiesScore.innerText = `${ties.score}`

	infoElement.append(infoElementText, infoElementTiesScore)

	return infoElement
}

const createScoreInfoContainer = (active, ties, waiting) => {
	const gameFooter = document.createElement('div')
	gameFooter.className = 'game-footer'

	gameFooter.append(createScoreInfoElement(active), createTiesInfoElement(ties), createScoreInfoElement(waiting))

	return gameFooter
}

export const createGame = (active, ties, waiting) => {
	const gameScreen = document.createElement('div')
	gameScreen.className = 'game-screen fade-in'
	gameScreen.id = 'game-screen'

	gameScreen.append(
		createGameHeaderInfoContainer(active),
		createBoard(),
		createScoreInfoContainer(active, ties, waiting)
	)

	return gameScreen
}

export const createFooter = () => {
	const footer = document.createElement('div')
	footer.innerHTML = `
		<p class="footer__author">Challenge by <a href="https://www.frontendmentor.io" target="_blank"
				rel="noopener">Frontend Mentor</a>.
			Coded by <a href="https://github.com/Pawel-Gnat" target="_blank" rel="noopener">Paweł Gnat</a>.</p>
	`

	return footer
}

export const changeTurnInfo = player => {
	const turnContainer = document.querySelector('.turn-info')
	turnContainer.setAttribute('aria-label', `${player.name} turn`)

	const iconImage = turnContainer.querySelector('img')
	iconImage.src = player.icon
}

export const createModalBg = () => {
	const modalBg = document.createElement('div')
	modalBg.className = 'modal show'

	return modalBg
}

export const createModal = (info, player, color) => {
	const modalContainer = document.createElement('div')
	modalContainer.className = 'result zoom-in'

	const resultInfo = document.createElement('p')

	if (typeof player === 'object') {
		resultInfo.className = 'result__info'
		resultInfo.innerText = `${info}`
	}

	const resultWinnerInfo = document.createElement('p')

	if (typeof player === 'object') {
		resultWinnerInfo.className = `result__win text-${color}`
		resultWinnerInfo.innerText = 'takes the round'

		const resultWinnerImg = document.createElement('img')
		resultWinnerImg.className = 'result__img'
		resultWinnerImg.src = `${player.icon}`
		resultWinnerImg.alt = `${player.name}`

		resultWinnerInfo.insertAdjacentElement('afterbegin', resultWinnerImg)
	} else {
		resultWinnerInfo.className = `result__win`
		resultWinnerInfo.innerText = `${player}`
	}

	const quitBtn = document.createElement('button')
	quitBtn.className = 'btn btn--quit'
	quitBtn.innerText = 'quit'

	const nextBtn = document.createElement('button')
	nextBtn.className = 'btn btn--next'
	nextBtn.innerText = 'next round'

	modalContainer.append(resultInfo, resultWinnerInfo, quitBtn, nextBtn)
	return modalContainer
}

export const createModalRestart = () => {
	const modalContainer = document.createElement('div')
	modalContainer.className = 'result zoom-in'

	const restartInfo = document.createElement('p')
	restartInfo.className = `result__win`
	restartInfo.innerText = 'restart game?'

	const cancelBtn = document.createElement('button')
	cancelBtn.className = 'btn btn--cancel'
	cancelBtn.innerText = 'no, cancel'

	const resetBtn = document.createElement('button')
	resetBtn.className = 'btn btn--reset'
	resetBtn.innerText = 'yes, restart'

	modalContainer.append(restartInfo, cancelBtn, resetBtn)

	return modalContainer
}
