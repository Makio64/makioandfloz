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
		# l = document.createElement('div')
		# l.className = 'loading'
		# document.body.appendChild(l)
		# @loaderBorder = new BorderLoader()
		# @loaderBorder.setPercent(0)
		# Stage.onUpdate.add(@fakeLoad)

		require.ensure(['Main'], (require)=>
			# Stage.onUpdate.remove(@fakeLoad)
			Main = require('Main')
			main = new Main(@onLoad)

			# test = (dt)=>
			# 	if(dt>100) then return
				# diff = (1.1 - @loaderBorder.percent)*0.06*dt/16
				# diff = Math.min(0.03*dt/16,diff)
				# @loaderBorder.setPercent(@loaderBorder.percent+diff)
				# if(@loaderBorder.percent>=1.02)
				# 	Stage.onUpdate.remove(test)
				# 	@loaderBorder.setPercent(1)

			# Stage.onUpdate.add(test)
		)
		return

	@onLoad:(percent)=>
		# if(percent > @percent)
		# 	@percent = percent
		# if(percent == 1)
		# 	setTimeout(()=>
		# 		loader = document.querySelector(".loading")
		# 		loader.className += ' hideOut'
		# 		@loaderBorder.hide(true)
		# 	,700)
		return

	document.addEventListener('DOMContentLoaded', Preloader.init)

module.exports = Preloader
