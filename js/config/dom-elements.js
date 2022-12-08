export const createLogoImage = () => {
	const logoImage = document.createElement('img')
	logoImage.src = './assets/logo.svg'
	logoImage.alt = ''
	logoImage.setAttribute('aria-hidden', true)

	return logoImage
}

export const createPlayerIconPick = () => {
	const selectPlayerIconContainer = document.createElement('div')
	selectPlayerIconContainer.className = 'player-icon-container'

	const playerFirstInfo = document.createElement('p')
	playerFirstInfo.innerText = `pick player 1's mark`

	const iconContainer = document.createElement('div')
	iconContainer.className = 'icon-container'

	const xBtn = document.createElement('button')
	xBtn.className = 'x-btn'
	const xIconImg = document.createElement('img')
	xIconImg.src = './assets/icon-x.svg'
	xIconImg.alt = 'Cross icon'

	xBtn.appendChild(xIconImg)

	const oBtn = document.createElement('button')
	oBtn.className = 'o-btn'
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
