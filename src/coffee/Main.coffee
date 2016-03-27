SceneTraveler 	= require('makio/scenes/SceneTraveler')

Home 			= require('pages/Home')
Articles 		= require('pages/Articles')
Error404 		= require('pages/Error404')

class Main

	constructor:(callbackLoad)->
		# block click
		links = document.querySelectorAll('.section a')
		for link in links
			link.addEventListener('click',@onLink)
			link.addEventListener('touchstart',@onLink)
			link.addEventListener('touchend',@onLink)
		@menu = document.querySelector('header')
		@mask = document.querySelector('#mask')

		@playIntro()
		# Page
		page("/", @onHome)
		page("/article/:id", @onArticles)
		page("*", @on404)
		page()

		callbackLoad(1)

		# fullscreen support android
		document.addEventListener('touchstart', @fullScreen, true)
		return

	playIntro:()=>
		tl = new TimelineLite()
		tl.to('header',0,{opacity:1,autoAlpha:1})
		tl.from('header',.6,{delay:.3,ease:Expo.easeOut,y:"-100%",clearProps:"transform"})
		tl.fromTo('h1', 0.4, {ease:Quad.easeOut,x:"-100%"}, {x:"0%",clearProps:"transform"})
		tl.to('h1 .mask', 0.4, {ease:Quad.easeIn,scaleX:"0"},'-=.3')
		tl.fromTo('h2', 0.4, {ease:Quad.easeOut,x:"-100%"}, {x:"0%",clearProps:"transform"}, "-=.7")
		tl.to('h2 .mask', 0.4, {ease:Quad.easeIn,scaleX:"0"},'-=.3')
		tl.fromTo('.presentation', 0.4, {ease:Quad.easeOut,x:"-100%"}, {x:"0%",clearProps:"transform"}, "-=.7")
		tl.to('.presentation .mask', 0.4, {ease:Quad.easeIn,scaleX:"0"},'-=.3')
		tl.fromTo('.links', 0.4, {ease:Quad.easeOut,x:"-100%"}, {x:"0%",clearProps:"transform"}, "-=.7")
		tl.to('.links .mask', 0.4, {ease:Quad.easeIn,scaleX:"0"},'-=.3')
		tl.fromTo('.section', 0.4, {ease:Quad.easeOut,x:"-100%"}, {x:"0%"}, "-=.3")
		tl.to('.section .mask', 0.4, {ease:Quad.easeIn,scaleX:"0"},'-=.3')
		return

	onLink:(e)=>
		e.preventDefault()

		if(@selected) then @selected.className = ''
		@selected = e.target.parentNode
		@selected.className = 'selected'

		page("/article/"+e.target.dataset.id)
		return

	onHome:()=>
		@articleID = null
		SceneTraveler.to(new Home())
		if(@selected) then @selected.className = ''
		@selected = null
		return

	onArticles:(e)->
		if(@articleID == e.params.id) then return
		@articleID = e.params.id
		SceneTraveler.to(new Articles(@articleID))
		return

	on404:()->
		@articleID = null
		SceneTraveler.to(new Error404())
		return


module.exports = Main
