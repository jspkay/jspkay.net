To build the website you need to have:

- vite
- eleventy

---

In order to build, you firstly need to build all the internal projects.

> In the future, this will be in a dedicated config.

```bash
npx vite build misc/darines28 --base /misc/darines28
```

This makes the directory `/misc/darines28/dist`.
This is then remapped to `/misc/darines28` via eleventy config.

---

To publish it, just run the `./scripts/update_v2.sh` - password is secret and only known by the author :P
