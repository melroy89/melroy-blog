# Melroy's Blog

My blog using Hugo. Which is leveraging markdown as it's default format for the [content](content).

## Live

**Live at:** [blog.melroy.org](https://blog.melroy.org)  
**Fallback URL:** [melroy89.github.io/melroy-blog](https://melroy89.github.io/melroy-blog/) (In case of emergency)

## Local build

### Requirements

If you want to build the website yourself.  
You'll need to [install](https://gohugo.io/installation/) the `hugo` command first.

Or download the **latest Hugo extended** deb file from: https://github.com/gohugoio/hugo/releases (eg. `hugo_extended_0.136.3_linux-amd64.deb`)

Minimal Hugo extended version: `0.128.0`.

### Run local server

Then execute: `hugo server`

If you also want to build _draft_ blog articles, run: `hugo server -D`

## Other

_Hint:_ Execute `date +%Y-%m-%dT%H:%M:%S+01:00` which generate the correct date string for the posts.
