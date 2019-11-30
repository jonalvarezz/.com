---
title: How To Solve GIT Conflicts
author: jonalvarezz
date: 2016-8-7 13:30
template: article.jade
---

This is a quick guide that show you how to solve a GIT conflict manually using
your console.

First at all a GIT conflict may happen when you merge another branch to your own.
GIT will output something like this:

```
Auto-merging apps/users/views.py
CONFLICT (content): Merge conflict in apps/users/views.py
Auto-merging apps/users/urls.py
CONFLICT (content): Merge conflict in apps/users/urls.py
...
Automatic merge failed; fix conflicts and then commit the result.
```

Dont be scared by the CONFLICT word, if you already know what your team is doing,
project's guidelines and roadmap are clear, solving conflicts will mostly be
about including your folk's code into yours or viceversa.

> A GIT conflict does not mean you or your folk did something wrong, it only
> means that both have worked on the same file/lines, and GIT needs to be sure
> which lines of code should kept.

## 1. Identify the files in conflict

Run `git status` to get the list of conflicted files, GIT will also give you a
short reason:

```
On branch merged-branch-name
You have unmerged paths.
  (fix conflicts and run "git commit")

Changes to be committed:

        ...

Unmerged paths:
  (use "git add <file>..." to mark resolution)

        both modified:   apps/users/urls.py
        both modified:   apps/users/views.py
```

The part of interesting here is **Unmerged paths**

## 2. Start resolving conflicts

Open the first file Unmerged paths shows with your text editor. You will find
your code is separated by some lines GIT introduced:

```
<<<<<<< HEAD
... You code
=======
... Your folks code
>>>>>>> merged-branch-name
```

GIT split the code with your code (From `HEAD` to `====` line) and your folk
code (From `===` to `merged-branch-name`).

Your task here is to compare which are the lines that need to be included.
Delete and move the lines of code that should be kept. Make sure to also delete
the lines GIT added (`====`, `HEAD`, ...)

### Some tips

- Do not merge any branch if you are not 100% sure that you know what are you
  including. First understand your folk's code/features then merge.
- When resolving the conflict, try to not modify code, **do not do refactors**.
  Do the merge then refactor in a new commit. This will make the history
  transparent. Other way your refactor will be lost in the merge commit, only you
  will know a refactor ocurred.

## 3. Mark the conflict file as resolved

Once you resolved the conflict you mark it as resolved with:

```
git add /path/to/the/resolved/file.ext
```

## 4. Loop

Great! now repeat steps 1, 2, 3 until all the files in GIT's Unmerged paths gets
empty.

## 5. Make sure everything is fine

Finish?

You solved all the conflicts but it does not mean the logic and changes are
right.

Run any test your project have to make sure the changes are fine and include all
the new features.

## 6. Commit

Once everithing looks fine, commit the changes:

```
git commit
```

Note that we are no adding a custom message to the commit, this very important
cause GIT will add the message automatically. That message will include the
name of the merged branches and also a valuable list of the new commits the
merge included.

`git commit` will open your console text editor, generally `nano`, with the
commit message. Just save the message (`CTRL`+`o`) and exit nano (`CTRL`+`x`)

You are done now.

## Conclusion

Working in branch is a very powerfull way of managing a project with a team,
specially for incoporating new features in paralallel. If you are looking in how
to work with branches you can refer to [GIT Branching Model](http://nvie.com/posts/a-successful-git-branching-model/).
