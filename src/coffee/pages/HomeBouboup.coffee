Article = require './Articles'

class HomeBouboup extends Article

	constructor:()->
		super('Home Bouboup', false)
		@open()
		return

	open:()->
		@createIframe("/home/index.html")
		@resize()
		return

	createIframe:(url)->
		super(url)
		@iframe.className += ' home'
		return

	transitionIn:()->
		super()
		document.querySelector('header').className = ''
		return


module.exports = HomeBouboup
