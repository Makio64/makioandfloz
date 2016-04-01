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


module.exports = HomeBouboup
