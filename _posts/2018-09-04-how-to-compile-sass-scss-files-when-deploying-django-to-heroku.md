---
layout: post
title: "How to compile SASS/SCSS files when deploying a Django app to Heroku"
---

I'm using [django-sass-processor][django-sass-processor] to automatically
compile the SASS files in a Django 2.1 project. Everything runs fine locally,
but on Heroku the pages appear unstyled. The problem is that Heroku only runs
`./manage.py collectstatic` when building a Django app. This simply copies the
static files to the `./staticfiles` folder. As the SCSS files weren't compiled
yet, only the `*.scss` files end up in that folder.

The solution is simple: customizing how Heroku builds our Django app.

Heroku's [Python buildpack][python-buildpack] offers two hooks, `pre_compile`
and `post_compile`. To use them, we just need to add `bin/pre_compile` or
`bin/post_compile` in our app's repository. For compiling SCSS, we want to use
`post_compile`, as it will only run after all pip packages are installed.

Create a file in `bin/post_compile` in the root of your repository with the
contents:

```bash
#!/usr/bin/env bash

cd "$1" || exit 1
echo "-----> Compiling SCSS"
python manage.py compilescss --traceback
echo "-----> Collecting static files"
python manage.py collectstatic --noinput --traceback
```

The first command, `cd "$1"`, changes the current directory to the build
directory passed in by Heroku. Then we just run the `compilescss` and
`compilestatic` as needed.

If you commit this file and deploy to Heroku, you should already see the SCSS
compilation working. The only remaining step is a small optimization. We want
to avoid Heroku running `compilestatic`, as we're running it ourselves. Simply
run:

`heroku config:set DISABLE_COLLECTSTATIC=1 --app <YOUR_APP_NAME>`

That's it! Everything should be running fine, and if you need to add other
build steps (e.g. minifying, compressing images, etc.), just add them to the
`bin/post_compile` file.

You can see how I've done in my Django project on
[https://github.com/vitorbaptista/lainonima][lainonima].

[django-sass-processor]: https://github.com/jrief/django-sass-processor
[python-buildpack]: https://github.com/heroku/heroku-buildpack-python/tree/master/bin/steps/hooks
[lainonima]: https://github.com/vitorbaptista/lainonima/
