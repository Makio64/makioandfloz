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

		@_scale = .95

		@_domHome = document.getElementById( "home" )

		@_prepare()

		Stage.onResize.add(@resize)

		return


	_prepare: () ->
		@_domsArticles = document.querySelectorAll( ".article-entry" )
		@_domsImgsArticles = document.querySelectorAll( ".article-entry img" )

		for dom, i in @_domsArticles
			dom.__domImg = @_domsImgsArticles[ i ]
			dom.__domTextBg = dom.querySelector( ".article-entry-texts-bg" )
			dom.__domTextLine = dom.querySelector( ".article-entry-texts-line" )
			dom.__domTextTitle = dom.querySelector( ".article-entry-texts-title" )
			dom.addEventListener( "mouseenter", @_onOver, false )
			dom.addEventListener( "mouseleave", @_onOut, false )

		@_countArticles = @_domsArticles.length

		@_loadImgs()
		return


	_onOver: ( e ) =>
		TweenLite.to( e.target.__domImg, .6, {
			css: {
				scale: @_scale
			},
			ease: Quart.easeInOut
		} )
		TweenLite.set( e.target.__domTextBg, {
			css: {
				x: "-100%"
			}
		} )
		TweenLite.to( e.target.__domTextBg, .8, {
			delay: .3,
			css: {
				x: "0%"
			},
			ease: Quart.easeInOut
		})

		TweenLite.set( e.target.__domTextLine, {
			css: {
				x: "-100%",
				scale: 1
			}
		} )
		TweenLite.to( e.target.__domTextLine, .8, {
			delay: .7,
			css: {
				x: "0%",
				alpha: 1
			},
			ease: Cubic.easeOut
		})

		TweenLite.set( e.target.__domTextTitle, {
			css: {
				x: "-100%"
			}
		} )
		TweenLite.to( e.target.__domTextTitle, .8, {
			delay: .5,
			css: {
				x: "0%",
				alpha: 1
			},
			ease: Cubic.easeOut
		})
		return


	_onOut: ( e ) =>
		TweenLite.killTweensOf( e.target.__domTextBg )
		TweenLite.killTweensOf( e.target.__domTextLine )
		TweenLite.killTweensOf( e.target.__domTextTitle )

		TweenLite.to( e.target.__domImg, .4, {
			css: {
				scale: 1
			},
			ease: Quad.easeInOut
		} )
		TweenLite.to( e.target.__domTextBg, .8, {
			delay: .1,
			css: {
				x: "-100%"
			},
			ease: Quart.easeInOut
		})
		TweenLite.to( e.target.__domTextLine, .4, {
			css: {
				x: "25%",
				scaleX: 0
			},
			ease: Cubic.easeIn
		})
		TweenLite.to( e.target.__domTextTitle, .6, {
			css: {
				x: "-100%"
			},
			ease: Cubic.easeIn
		})
		return


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
		return


	_resizeImgs: () ->
		for domImg in @_domsImgsArticles
			@_resizeImg( domImg ) if domImg.__img.__isLoaded
		return

	_resizeImg: ( domImg ) ->
		wHolder = Stage.width - 300
		hHolder = Stage.height / @_countArticles
		data = uImg.fit( domImg.__img.width, domImg.__img.height, wHolder, hHolder )
		domImg.style.left = -( hHolder - hHolder * @_scale ) * .5 + "px"
		domImg.style.top = data.y + "px"
		domImg.style.width = data.w + "px"
		domImg.style.height = data.h + "px"
		domImg.width = data.w
		domImg.height = data.h
		return


	transitionIn:()->
		document.querySelector('header').className = ''
		super()
		return


	onTransitionOutComplete:()->
		# Animate
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
