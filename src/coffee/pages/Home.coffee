Scene 	= require('makio/scenes/Scene')

class Home extends Scene

	# Allow ressource
	constructor:()->
		super("Home")
		return

	# transitionIn:()->
	# 	# Animate
	# 	return
	#
	# transitionOut:()->
	# 	# Animate
	# 	return

	# Manage edge case
	resize:()->
		return

	# Free ressources
	dispose:()->
		return

module.exports = Home
