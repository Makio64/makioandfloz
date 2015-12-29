Stage = require "makio/core/Stage"
# BorderLoader = require "ui/BorderLoader"

#---------------------------------------------------------- Class Loader

class Preloader

	@percent = 0

	@fakeLoad = (dt)=>
		@percent += 0.0005*dt/16
		# @loaderBorder.setPercent(@loaderBorder.percent + (@percent-@loaderBorder.percent)*0.15)

	@init = ()=>
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
