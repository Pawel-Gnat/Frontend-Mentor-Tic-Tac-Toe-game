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
	container.className = 'select-player-screen'

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

const createTiles = (value) => {
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
	infoElementTiesScore.innerText = `${ties}`

	infoElement.append(infoElementText, infoElementTiesScore)

	return infoElement
}

const createScoreInfoContainer = (active, waiting) => {
	const gameFooter = document.createElement('div')
	gameFooter.className = 'game-footer'

	gameFooter.append(createScoreInfoElement(active), createTiesInfoElement(0), createScoreInfoElement(waiting))

	return gameFooter
}

export const createGame = (active, waiting) => {
	const gameScreen = document.createElement('div')
	gameScreen.className = 'game-screen fade-in'

	gameScreen.append(
		createGameHeaderInfoContainer(active),
		createBoard(),
		createScoreInfoContainer(active, waiting)
	)

	return gameScreen
}

export const changeTurnInfo = player => {
	const turnContainer = document.querySelector('.turn-info')
	turnContainer.setAttribute('aria-label', `${player.name} turn`)

	const iconImage = turnContainer.querySelector('img')
	iconImage.src = player.icon
}
