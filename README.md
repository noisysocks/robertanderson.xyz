# robertanderson.xyz

This is the [Next.js](https://nextjs.org) app that powers my [homepage](https://robertanderson.xyz).

## Features

- Home page with a beautiful picture of yours truly.
- Resume page with a typeset resume.
  - Data stored in a YAML file that conforms to the [JSON Resume](https://jsonresume.org/) schema.
  - Print styles for clean PDF output.
  - [Claude](https://www.anthropic.com/api) powered chatbot for answering questions about myself and my resume.
- Password protected admin interface for updating data used by the chatbot.

## Getting started

Clone the repository and create an `.env.local` file in the root of the project. You can use the `.env.local.example` file as a template.

You'll need a Postgres database (I use [Vercel](https://vercel.com)), an [Anthropic](https://www.anthropic.com/api) API key, and a [Voyage](https://www.voyageai.com) API key.

Then, run the following commands:

```bash
npm install
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) with your browser.
