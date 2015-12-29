Scene = require('makio/scenes/Scene')
HtmlUtils = require('makio/utils/HtmlUtils')

class Home extends Scene

	# Allow ressource
	constructor:()->
		super("Home")
		title = "Makio&Floz - Blog about art & dev"
		description = "Blog about art and dev, Webgl tutorial, case studies"
		image = "http://makioandfloz.com/social/facebook.jpg"
		url = "http://makioandfloz.com"
		HtmlUtils.updateMetaFB(title,description,url,image)
		return

	# transitionIn:()->
	# 	# Animate
	# 	return
	#
	# transitionOut:()->
	# 	# Animate
	# 	return

	# Manage edge case
	resize:()->
		return

	# Free ressources
	dispose:()->
		return

module.exports = Home
