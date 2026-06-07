# Melroy's Blog

My blog using Hugo. Which is leveraging markdown as it's default format for the [content](content).

## Live

**Live at:** [blog.melroy.org](https://blog.melroy.org)  
**Fallback URL:** [melroy89.github.io/melroy-blog](https://melroy89.github.io/melroy-blog/) (In case of emergency)

## Local build

### Requirements

If you want to build the website yourself.  
You'll need to [install](https://gohugo.io/installation/) the `hugo` command first.

Or download the **latest Hugo extended** deb file from: https://github.com/gohugoio/hugo/releases (eg. `hugo_extended_0.162.1_linux-amd64.deb`)

Minimal Hugo extended version: `0.160.0`.

### Run local server

Then execute: `hugo server`

If you also want to build _draft_ blog articles, run: `hugo server -D`

## Theme

This blog uses the [Ananke](https://github.com/gohugo-ananke/ananke) theme. The `themes/ananke` directory is a **pristine copy of the upstream theme** — don't edit it directly.

All customizations live in the root `layouts/` directory, which overrides the theme. Theme tweaks are done via Ananke's [hook mechanism](https://github.com/gohugo-ananke/ananke) (`layouts/_partials/hooks/`) so we stay compatible with future upstream updates.

## Deployment

Deploys run via GitLab CI (see [.gitlab-ci.yml](.gitlab-ci.yml)) using the official Hugo Docker image. Pushing to the default branch builds with `hugo -e production --minify` and publishes to [blog.melroy.org](https://blog.melroy.org).

## Other

_Hint:_ Execute `date +%Y-%m-%dT%H:%M:%S+01:00` which generate the correct date string for the posts.
