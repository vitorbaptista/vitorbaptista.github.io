.PHONY: serve install

serve:
	bundle exec jekyll serve

install:
	mise install
	bundle install
