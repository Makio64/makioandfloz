SceneTraveler 	= require('makio/scenes/SceneTraveler')
Stage 			= require('makio/core/Stage')

Home 			= require('pages/Home')
HomeBouboup 			= require('pages/HomeBouboup')
Articles 		= require('pages/Articles')
Error404 		= require('pages/Error404')

class Main

	constructor:(callbackLoad)->
		# block click
		console.clear()

		@links = document.querySelectorAll('.section a')
		for link in @links
			link.addEventListener('click',@onLink)
			link.addEventListener('touchstart',@onLink)
			link.addEventListener('touchend',@onLink)

		twitterLinks = document.querySelectorAll('.links a')
		for link in twitterLinks
			link.addEventListener('click',@onTwitterLink)
			link.addEventListener('touchstart',@onTwitterLink)
			link.addEventListener('touchend',@onTwitterLink)

		@menu = document.querySelector('header')
		@mask = document.querySelector('#mask')

		@playIntro()
		@playConsole()

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
		tl.from('header',.6,{delay:.3,ease:Expo.easeOut,y:"-100%"})
		tl.fromTo('h1', 0.4, {ease:Quad.easeOut,x:"-100%"}, {x:"0%"},'-=.15')
		tl.to('h1 .mask', 0.4, {ease:Quint.easeIn,scaleX:"0"},'-=.3')
		tl.fromTo('h2', 0.4, {ease:Quad.easeOut,x:"-100%"}, {x:"0%"}, "-=.4")
		tl.to('h2 .mask', 0.3, {ease:Quint.easeIn,scaleX:"0"},'-=.3')
		tl.fromTo('.presentation', 0.4, {ease:Quad.easeOut,x:"-100%"}, {x:"0%"}, "-=.4")
		tl.to('.presentation .mask', 0.3, {ease:Quint.easeIn,scaleX:"0"},'-=.3')
		tl.fromTo('.links', 0.4, {ease:Quad.easeOut,x:"-100%"}, {x:"0%"}, "-=.4")
		tl.to('.links .mask', 0.3, {ease:Quint.easeIn,scaleX:"0"},'-=.3')
		tl.fromTo('.section', 0.4, {ease:Quad.easeOut,x:"-100%"}, {x:"0%"}, "-=.3")
		tl.to('.section .mask', 0.4, {ease:Quint.easeIn,scaleX:"0"},'-=.5')
		return

	playConsole:()=>
		currentStep = 0
		t = 0
		console.log console
		onUpdate = (dt)=>
			t += dt
			if(t > 100)
				currentStep+=2
				t = 0
				console.clear()
				if(currentStep<15)
					s = String("                ").substr(0,currentStep)
				else
					s = String(" Makio & Floz! ").substr(0,currentStep-15)+String("                ").substr(currentStep-15,30-currentStep)
				console.log('%c'+s, 'background: #000; color: #fff; font-size: 40px');
				if(currentStep>=30)
					Stage.onUpdate.remove(onUpdate)
					console.log('%c Ladies and gentlemen, welcome on board ;)', 'background: #fff; color: #222; font-size: 16px');
		Stage.onUpdate.add(onUpdate)
		return

	onLink:(e)=>
		e.preventDefault()
		page("/article/"+e.target.dataset.id)
		return

	onTwitterLink:(e)=>
		ga('send', 'event', 'link', 'click', e.toElement.href);
		return

	onHome:()=>
		@articleID = null
		for link in @links
			link.className = ''

		SceneTraveler.to(new HomeBouboup())
		ga('set', 'page', '/home');
		return

	onArticles:(e)=>

		for link in @links
			if link.dataset.id == e.params.id
				link.className = 'selected'
			else
				link.className = ''

		if(@articleID == e.params.id) then return
		@articleID = e.params.id
		SceneTraveler.to(new Articles(@articleID))
		ga('set', 'page', '/'+@articleID);
		return

	on404:()=>
		@articleID = null
		SceneTraveler.to(new Error404())
		ga('set', 'page', '/404');
		return


module.exports = Main
