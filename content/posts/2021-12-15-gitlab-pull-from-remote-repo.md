---
title: "GitLab: Pull from remote repo"
author: Melroy van den Berg
type: post
date: 2021-12-15T20:36:51+01:00
url: /2021/gitlab-pull-from-remote-repo/
featured_image: /images/2021/12/feature-1.jpg
images:
  - /images/2021/12/feature-1.jpg
categories:
  - Beginner
  - Handy Tools
  - Internet/SEO/Websites
  - Programming
  - Server
tags:
  - access token
  - CI/CD
  - Docker
  - FOSS
  - GitLab
  - job
  - pipeline
  - remote
  - repository
  - schedule
---

GitLab is an awesome product. I'm using [GitLab Community Edition (FOSS) at home](https://gitlab.melroy.org) on a daily basis.

![](/images/2021/12/premium_to_free-1.png)

However, I needed a specific feature in GitLab called [Pull from a remote repository](https://docs.gitlab.com/ee/user/project/repository/mirror/pull.html) which is officially a _premium feature_ only. Too bad this feature is not free, but I have a solution.  
This sync feature allows you to keep for example your forked repository _in sync_ with a _remote_ upstream repository.

<!--more-->

I created a **solution** _without_ the need of a premium license. I will share the solution in this article, so you can have this premium feature for free as well!

## Pull remote repository (Free!)

With the following solution you can mirror your repository via the pull direction (rather than only the push direction), something that is not free for GitLab CE instances. My solution also allows you to make changes to your git repository, while remote changes are getting pulled and merged into your repository.

I created a small Docker file where I execute my commands, meaning you should have a GitLab runner available with Docker support. Next, I will share the GitLab Job that can be used in your `.gitlab-ci.yml` file. Finally, I will show you how to create a GitLab Schedule pipeline.

### Docker file

I created a very lightweight Docker file, that I use to pull changes from a remote repository. The Docker file can be used **without** changes, so don't worry. This Docker image will be automatically pulled via the GitLab Job (see below).

**Docker Image** (on Docker Hub): [danger89/repo_mirror_pull](https://hub.docker.com/r/danger89/repo_mirror_pull) ([source code](https://gitlab.melroy.org/melroy/repo_pull_sync_docker_image/-/blob/main/Dockerfile))

### GitLab Job

Add the following GitLab Job to your `.gitlab-ci.yml` file (create this file, if it doesn't exist yet in the root-folder of your git repo). You can use the job below as is, also **no** **changes** are needed:

```yaml
repo_pull_sync:
  image: danger89/repo_mirror_pull:latest
  rules:
    - if: '$CI_PIPELINE_SOURCE == "schedule"'
    - if: $REMOTE_URL
    - if: $REMOTE_BRANCH
    - if: $ACCESS_TOKEN
  before_script:
    - git config --global user.name "${GITLAB_USER_NAME}"
    - git config --global user.email "${GITLAB_USER_EMAIL}"
  script:
    - git checkout $CI_DEFAULT_BRANCH
    - git pull
    - git remote remove upstream || true
    - git remote add upstream $REMOTE_URL
    - git fetch upstream
    - git rebase upstream/$REMOTE_BRANCH
    - git push "https://${GITLAB_USER_LOGIN}:${ACCESS_TOKEN}@${CI_REPOSITORY_URL#*@}" "HEAD:${CI_DEFAULT_BRANCH}"
```

_Note 1:_ It's up to you if you want to change: `git rebase` to: `git merge`.  
_Note 2:_ If the rebase (or merge) fails the pipeline automatically aborts.

### GitLab Scheduled Pipeline

Before you create a GitLab scheduled pipeline. We need to generate an access token for your specific project. Go to your git project in GitLab. And in the left-side menu go to: `Settings -> Access Tokens`. Create a new access token for the project. It's very important to check **api** as scope of this access token.

---

GitLab has a scheduler feature within the GitLab CI/CD section. This allows you to schedule pipelines whenever you want/need. So go to: `CI/CD -> Schedules`. And press the button "New Schedule".

Add a schedule Description. Select an Interval, for example "Every week" (you could even define your interval using the cron schedule expression). The Target Branch is most likely called: `master` (or `main`). That is the default branch you want to sync to.  
If this branch is set wrong, please adopt the default branch in for your repository: `Settings -> Repository -> Default branch`.

Important part is now to set the following three variables:

- `REMOTE_URL`
- `REMOTE_BRANCH`
- `ACCESS_TOKEN`

![](/images/2021/12/schedule_pipeline.png "GitLab Schedule Pipeline")

Add a new variable called "**REMOTE_URL**", with the value of the upstream/remote git repository. This is the repository where you want to pull the changes from.  
Add an second variable called "**REMOTE_BRANCH**", which is most likely to be called either "master" or "main". The remote branch name.  
Last, the third variable is called "**ACCESS_TOKEN**". This is the _secret access token_ you created earlier, allowing you to push the changes back the GitLab within GitLab Pipelines (used during the `git push` command).

## Live in action

You can see live examples in different projects on my GitLab server, like this [Element Web](https://gitlab.melroy.org/melroy/element-web) project is using this repo syncer tool I wrote.

## Conclusion

I hope this article was helpful for you! It shouldn't be hard to setup a pull from a remote repository in GitLab Foss (Community Edition).

This pull from remote solution is very handy if you want to keep your fork in sync with a remote repository.

Since the job is doing a `git merge`, you can actually make slight adaptations to your git repository content. Git tries to merge any changes from the remote git URL into your git repository.  
Of-course you are free to change the GitLab job to execute a `git reset --hard` if you want, if you don't care that your changes are getting lost (on purpose).
