import * as element from './dom-elements.js'

export const renderSelectPlayerScreen = () => {
	const body = document.querySelector('body')

	body.append(
		element.createLogoImage(),
		element.createPlayerIconPick(),
		element.createNewGameVsCPUButton(),
		element.createNewGameVsPlayerButtons()
	)
}
