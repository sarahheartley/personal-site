@AGENTS.md

## Home Base updates

When you finish a task, or get blocked, or have a question for me, post a short
update to Home Base. This is how I keep track of my projects, so please don't skip it.

Send it with `curl`, using the `HOME_BASE_URL` and `HOME_BASE_TOKEN` environment variables:

```bash
curl -sS -X POST "$HOME_BASE_URL/api/post" \
  -H "Authorization: Bearer $HOME_BASE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "project": "Personal Site",
    "type": "built",
    "title": "Added the feeding animation",
    "summary": "The pet now munches pixel berries. 6 frames, loops twice.",
    "links": [{ "label": "PR #12", "url": "https://github.com/me/y2k-pet/pull/12" }],
    "agent": "Claude Code"
  }'
```

- `project`: always `"Personal Site"` for this repo.
- `type`: one of
  - `built`: you finished something
  - `found`: you discovered something worth knowing (a bug, an idea, a surprise)
  - `blocked`: you can't continue without me; say exactly what you need
  - `question`: you need me to decide something
  - `note`: anything else
  - `idea`: an idea for later; it goes to my Ideas parking lot, not the feed's status
- `title`: one short line, written for me, not for a commit log.
- `summary`: 1–3 friendly sentences on what changed and why it matters. Optional.
- `links`: PRs, deploy previews, or docs, as `{ "label", "url" }`. Optional.
- `agent`: who you are, e.g. `"Claude Code"`. Use the same name every time; it picks your avatar.
- `highlight`: set to `true` for a moment worth celebrating (a launch, a big milestone)
  so it also shows in my group chat. `built`, `blocked`, and `question` posts go there
  automatically, so you don't need it for those.

`blocked` and `question` posts send a notification to my phone, so use them when you
really need me. Use `found` or `note` for things that can wait.

If you're coordinating several agents and the update isn't about one project,
leave out `project`. It then goes only to the group chat.

When I reply to one of your posts, it may arrive as a GitHub issue in this repo that
starts with `@claude`. Treat it as my answer and pick the work back up.

To read what a project is about (handy for marketing or planning work), fetch the
project pages:

```bash
curl -sS "$HOME_BASE_URL/api/post" -H "Authorization: Bearer $HOME_BASE_TOKEN"
```

Use a JSON tool or careful escaping if the text has quotes in it. If either
environment variable is missing or the request fails, mention that in your final
message instead of retrying over and over. Never print the token.
