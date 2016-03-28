Stage = require "makio/core/Stage"
SceneTraveler = require "makio/scenes/SceneTraveler"
LoadingScene = require "pages/LoadingScene"

#---------------------------------------------------------- Class Loader

class Preloader

	@percent = 0

	@fakeLoad = (dt)=>
		@percent += 0.0005*dt/16
		# @loaderBorder.setPercent(@loaderBorder.percent + (@percent-@loaderBorder.percent)*0.15)

	@init = ()=>
		SceneTraveler.to(new LoadingScene())
		document.removeEventListener('DOMContentLoaded', Preloader.init)
		require.ensure(['Main'], (require)=>
			Main = require('Main')
			main = new Main(@onLoad)
		)
		return

	@onLoad:(percent)=>
		return

	document.addEventListener('DOMContentLoaded', Preloader.init)

module.exports = Preloader
