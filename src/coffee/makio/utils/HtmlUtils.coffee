class HtmlUtils

	constructor:()->
		throw new Error('HtmlUtils cant be instanciate')

	@updateMetaFB:(title,description,url,image)->
		@changeMeta("og:title",title)
		@changeMeta("og:description",description)
		@changeMeta("og:url",url)
		@changeMeta("og:image",img)
		return

	@changeMeta:(property, value)->
		metas = document.getElementsByTagName("meta")
		for meta in metas
			if(meta.property == property)
				meta.content = value
				return
		return
