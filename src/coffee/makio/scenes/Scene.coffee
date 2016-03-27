#
# Abstract Scene
# @author David Ronai / Makiopolis.com / @Makio64
#

SceneTraveler = require('./SceneTraveler')

class Scene

	constructor:(@name)->
		@states = []
		@startTime = 0
		@lastTimeCheck = -1
		return

	# Scene classic
	update:(dt)->
		return

	transitionIn:()=>
		@onTransitionInComplete()
		return

	transitionOut:()=>
		document.querySelector('#mask').className = 'transitionIn'
		setTimeout(
			()=>
				setTimeout(
					()=>
						document.querySelector('#mask').className = 'transitionOut'
					,64
				)
				@onTransitionOutComplete()
			,510
		)
		return

	onTransitionInComplete:()=>
		return

	onTransitionOutComplete:()=>
		# Dont dispose scene for this XP
		@dispose()
		SceneTraveler.onTransitionOutComplete()
		return

	resize:()->
		return

	dispose:()->
		return

module.exports = Scene
