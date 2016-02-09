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

		# Page
		page("/", @onHome)
		page("/blog/:id", @onArticles)
		page("*", @on404)
		page()

		callbackLoad(1)

		# fullscreen support android
		document.addEventListener('touchstart', @fullScreen, true)
		return

	onLink:(e)=>
		e.preventDefault()

		if(@selected) then @selected.className = ''
		@selected = e.target.parentNode
		@selected.className = 'selected'

		page("/blog/"+e.target.dataset.id)
		return

	onHome:()=>
		@id = null
		SceneTraveler.to(new Home())
		if(@selected) then @selected.className = ''
		@selected = null
		return

	onArticles:(e)->
		if(@id == e.params.id) then return
		@id = e.params.id
		SceneTraveler.to(new Articles(@id))
		return

	on404:()->
		@id = null
		SceneTraveler.to(new Error404())
		return


module.exports = Main
