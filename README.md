# wisdom.titanium.codes

[![Build Status](https://travis-ci.org/AlexanderC/nakla.fun.svg?branch=master)](https://travis-ci.org/AlexanderC/nakla.fun)

This repository contains sources for [wisdom.titanium.codes](wisdom.titanium.codes) website.

# Idea behind it

wisdom.titanium.codes - is a simple and stupid resource containing pure awesomeness (at least we think so o_O).

Feel free to commit ;)

# How to add stories

1. Locate latest story page in `stories/` by finding `N-xxx.md` where `N` is the buggest one.
2. Check if the file does not contain too many stories. If yes- create another one using template `{N+1}-anyname.md`.
3. Add your story using the below formatting.

```text

> "Евреи недолюбливали почтальона Печкина за его фамилию" (Страхов)

---
```

# Installation and usage

Bootstrapping and build:

```bash
npm install
npm run buid
```

CI/CD

```bash
npm run gh-token -- "your github token" "your travis token"
```

Now open `/docs`- it contains your webpages. Easy, isn't it? =)

> Why `/docs`? We're serving through GH Pages.

# Available Themes

- `saf` - Simple as F\**k

# Roadmap

None =)

