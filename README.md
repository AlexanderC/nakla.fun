# nakla.fun - The Website

This repository contains sources for [nakla.fun](nakla.fun) website.

# Idea behind it

nakla.fun - is a simple and stupid resource containing pure awesomeness (at least we think so o_O).

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
npm run gh-token -- "your github token"
```

Now open `/docs`- it contains your webpages. Easy, isn't it? =)

> Why `/docs`? We're serving through GH Pages.

# Available Themes

- `saf` - Simple as F**k

# Roadmap

None =)

# Support

I'll leave it here...

<a href="https://etherdonation.com/d?to=0x4a1eade6b3780b50582344c162a547d04e4e8e4a" target="_blank" title="Donate ETH"><img src="https://etherdonation.com/i/btn/donate-btn.png" alt="Donate ETH"/></a>
