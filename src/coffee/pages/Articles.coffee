Scene 		= require('makio/scenes/Scene')
Stage 		= require('makio/core/Stage')
HtmlUtils 	= require('makio/utils/HtmlUtils')

class Articles extends Scene

	# Allow ressource
	constructor:(id)->
		super('Article - '+id)
		Stage.onResize.add(@resize)
		@isReady = false
		@open(id)
		return

	open:(id)->
		@createIframe("/articles/#{id}/index.html")
		@resize()
		return

	createIframe:(url)->
		@iframe = document.createElement('iframe')
		@iframe.src = url
		@iframe.setAttribute('allowFullScreen', 'true')
		@iframe.className = 'hide unzoom'
		Stage.onUpdate.add(@onUpdate)
		document.body.appendChild(@iframe)
		return

	destroyIframe:()->
		@iframe.innerHTML = ""
		if(@iframe.parentNode)
			document.body.removeChild(@iframe)
		@iframe = null
		return

	onReady:()=>
		# removeMask
		doc = @iframe.contentWindow.document
		HtmlUtils.updateMetaFB(
			HtmlUtils.getMeta("og:title",doc),
			HtmlUtils.getMeta("og:description",doc),
			HtmlUtils.getMeta("og:url",doc),
			HtmlUtils.getMeta("og:image",doc)
		)
		return

	onUpdate:()=>

		if @iframe.contentWindow
			doc = @iframe.contentWindow.document
		else
			doc = @iframe.document

		if(!doc) then return

		# if(document.readyState == 'complete')
		@onReady()
		Stage.onUpdate.remove(@onUpdate)
		@animIn()
		return

	transitionIn:()->
		@animIn()
		super()
		return

	transitionOut:()->
		@iframe.className = 'unzoom'
		super()
		return

	animIn:()=>
		if @isReady
			@iframe.className = 'unzoom'
			Stage.onUpdate.addOnce ()=>
				setTimeout(()=>
					@iframe.className = ''
				,1)
		@isReady = true
		return


	# Manage edge case
	resize:()=>
		# if(this.iframe)
			# isIos = /ipad|iphone|ipod|iPad|iPhone|iPod/.test(navigator.userAgent)
			# w = window.innerWidth-300
			# h = window.innerHeight
			# if( isIos )
			# 	 w -= 1
			# 	 h -= 2
			# @iframe.style.height = h + 'px'
			# @iframe.style.width = w + 'px'
			# if(@iframe.contentWindow)
				# @iframe.contentWindow.innerWidth = w
				# @iframe.contentWindow.innerHeight = h
				# @iframe.contentWindow.resizeTo(w,h)
		return

	dispose:()->
		@destroyIframe()
		return

module.exports = Articles
