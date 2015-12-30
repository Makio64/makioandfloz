#
# Wrapper for requestAnimationFrame, Resize, etc..
# @author : David Ronai / @Makio64 / makiopolis.com
#

Signal 	= require("signals")

#---------------------------------------------------------- Class StageRenderer

class StageRenderer

	@lastTime 		= 0
	@pause 			= false
	@canSkip		= false
	@skipLimit		= 32

	@onResize 	= new Signal()
	@onUpdate 	= new Signal()

	@width 		= window.innerWidth
	@height 	= window.innerHeight

	@init:()->
		@pause = false

		window.onresize = ()=>
			@width 	= window.innerWidth
			@height = window.innerHeight
			@onResize.dispatch()
			return

		@lastTime = performance.now()

		requestAnimationFrame( @update )
		document.addEventListener('touchstart', this.goFullScreen, true)
		return

	@fullScreen:()->
		doc = window.document
		docEl = doc.documentElement
		requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
		if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement)
			requestFullScreen.call(docEl)

	@update:()=>
		t = performance.now()
		dt = t - @lastTime
		@lastTime = t

		if @pause then return

		# update logic here
		if(@canSkip && dt>@skipLimit)
			return
		
		@onUpdate.dispatch(dt)

		# render frame
		requestAnimationFrame( @update )
		return

	@init()

module.exports = StageRenderer
