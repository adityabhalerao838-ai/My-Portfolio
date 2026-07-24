## Changes to src/routes/index.tsx

1. **Replace C++ with Prompt Engineering everywhere it appears:**
   - Hero copy: rewrite the "grounding fundamentals in C++" line to reference prompt engineering instead (e.g. "grounding fundamentals in programming, and crafting precise prompts to build modern products with AI-assisted tooling").
   - Skills/"What I'm learning to do well" cards: replace the `C++` card (title + description) with a **Prompt Engineering** card — description covering structured prompting, context design, and getting reliable output from LLMs for real product work.
   - Any other mention of C++ in stat chips, about section, or meta tags → swap to Prompt Engineering / Prompting.
   - Root `<head>` description in `src/routes/__root.tsx` currently says "building thoughtful software with C++, AI, and modern web tools" — update to remove C++ and mention prompt engineering + AI tooling instead.

2. **Remove the contact form section entirely:**
   - Delete the whole Name / Email / Message form block, the "Send via Email" button, the mailto helper text, and the confirmation card ("Your email client should have opened…").
   - Keep the contact section heading/socials only if they still make sense; otherwise remove the surrounding section too and keep just the footer with the direct email + LinkedIn links so visitors can still reach out.
   - Remove now-unused form state, handlers, and imports to keep the file clean.

3. Leave all other sections (hero, about, projects/Assignly, currently building, photo, footer) untouched.

No backend or styling-system changes.
