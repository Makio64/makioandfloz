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

		# Page
		page("/", @onHome)
		page("/blog/:id", @onArticles)
		page("*", @on404)
		page()

		callbackLoad(1)
		return

	onLink:(e)->
		e.preventDefault()
		id = e.target.dataset.id
		page("/blog/"+id)
		return

	onHome:()->
		SceneTraveler.to(new Home())
		return

	onArticles:(e)->
		id = e.params.id
		SceneTraveler.to(new Articles(id))
		return

	on404:()->
		SceneTraveler.to(new Error404())
		return

module.exports = Main
