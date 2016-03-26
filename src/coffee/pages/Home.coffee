Stage = require('makio/core/Stage')
Scene = require('makio/scenes/Scene')
HtmlUtils = require('makio/utils/HtmlUtils')
uImg = require( "fz/utils/img" )

class Home extends Scene

	# Allow ressource
	constructor:()->
		super("Home")
		title = "Makio&Floz - Blog about art & dev"
		description = "Blog about art and dev, Webgl tutorial, case studies"
		image = "http://makioandfloz.com/social/facebook.jpg"
		url = "http://makioandfloz.com"
		HtmlUtils.updateMetaFB(title,description,url,image)

		@_domHome = document.getElementById( "home" )

		@_prepare()

		Stage.onResize.add(@resize)

		return

	_prepare: () ->
		@_domsArticles = document.querySelectorAll( ".article-entry" )
		@_domsImgsArticles = document.querySelectorAll( ".article-entry img" )
		console.log TweenMax
		for dom, i in @_domsArticles
			dom.__domImg = @_domsImgsArticles[ i ]
			dom.addEventListener( "mouseenter", @_onOver, false )
			dom.addEventListener( "mouseleave", @_onOut, false )

		@_countArticles = @_domsArticles.length

		@_loadImgs()

	_onOver: ( e ) =>
		TweenMax.to( e.target.__domImg, 1, {
			css: {
				scale: .9
			},
			ease: Quad.easeInOut
		} )

	_onOut: ( e ) =>
		TweenMax.to( e.target.__domImg, 1, {
			css: {
				scale: 1
			},
			ease: Quad.easeInOut
		} )

	_loadImgs: () ->
		for domImg in @_domsImgsArticles
			img = new Image()
			img.__dom = domImg
			domImg.__isLoaded = false
			domImg.__img = img
			img.addEventListener( "load", @_onImgLoaded, false )
			img.src = domImg.getAttribute( "data-src" )
		return

	_onImgLoaded: ( e ) =>
		img = e.target
		img.__isLoaded = true
		img.__dom.src = img.src
		@_resizeImg( img.__dom )

	_resizeImgs: () ->
		for domImg in @_domsImgsArticles
			@_resizeImg( domImg ) if domImg.__img.__isLoaded
		return

	_resizeImg: ( domImg ) ->
		wHolder = Stage.width - 300
		hHolder = Stage.height / @_countArticles
		data = uImg.fit( domImg.__img.width, domImg.__img.height, wHolder, hHolder )
		domImg.style.left = data.x + "px"
		domImg.style.top = data.y + "px"
		domImg.style.width = data.w + "px"
		domImg.style.height = data.h + "px"
		domImg.width = data.w
		domImg.height = data.h

	transitionIn:()->
		document.querySelector('header').className = ''
		super()
		return
	#
	onTransitionOutComplete:()->
		# Animate
		console.log('hmm')
		document.querySelector('header').className = 'article'
		super()
		return

	# Manage edge case
	resize:()=>
		console.log "resize"
		@_resizeImgs()
		return

	# Free ressources
	dispose:()->
		Stage.onResize.remove(@resize)
		return

module.exports = Home
