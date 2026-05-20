# EPH - Trae - Claude-3.7-Sonnet

# Prompts

## Prompt 1

````md
# Prompt for AI to Generate E2E Cypress Tests

You are a senior developer with expertise in writing Cypress E2E tests for modern web applications.

Your task is to create a complete E2E test suite based on the following scenarios. The tests must be implemented using Cypress and saved in a new file located at:

/cypress/integration/position.spec.js

## Requirements:

The project already includes all necessary dependencies and Cypress configuration. **Do not change the structure of the project**. However, you are allowed to make any necessary modifications to files inside the `/frontend` folder to ensure the tests run properly (e.g., adding selectors, exposing data attributes, minor test-related adjustments).

The frontend is built using **React** and **TypeScript**. All modifications and code you produce must be compatible with this tech stack.

You must also:
- Modify any frontend elements as needed to ensure Cypress can interact with them correctly (e.g., add `data-cy` attributes or test-specific identifiers).
- Create a Cypress configuration file (e.g., `cypress.config.js`) if it does not already exist.
- Add a new script command in the project's `package.json` to run the Cypress E2E tests, such as:

```json
"scripts": {
  "cy:open": "cypress open",
  "cy:run": "cypress run"
}
```

## Test Scenarios to Implement:

### 1. Page Load: Position Page

* Verify that the title of the position is correctly displayed.
* Verify that each phase of the hiring process is represented by a column on the screen.
* Verify that candidate cards are displayed in the appropriate column according to their current phase.

### 2. Candidate Phase Change (Drag and Drop)

* Simulate dragging a candidate card from one phase column to another.
* Verify that the card is visually moved to the new column.
* Verify that a `PUT` request is sent to the backend endpoint `/candidate/:id` with the updated phase information.
* The drag-and-drop functionality in the project is implemented using the **react-beautiful-dnd** library. Ensure that Cypress is able to interact correctly with this library when simulating the drag-and-drop behavior. Use appropriate techniques or utilities (e.g., `@4tw/cypress-drag-drop`, custom commands, etc.) to handle this interaction properly.

## Notes:

* The tests must be reliable and use best practices (e.g., wait for the page to be stable, use data attributes or appropriate selectors).
* All changes to the frontend code must be minimal, focused only on making it easier to test.
* Do not remove or break existing functionality.

Generate the full Cypress test code and include any necessary frontend code adjustments (if needed) as part of your response.
````


## Prompt 2

The test 'Candidate Phase Change (Drag and Drop)' doesn't perform correctly the react-beautiful-dnd drag and drop action, and the 'John Doe' card stays at first column, when should move to the second column.


## Prompt 3

````md
# Summarize Changes for Pull Request Description

You are a code assistant helping to document changes made to a project.

Please analyze the modifications that were made based on the implementation of a Cypress E2E testing suite, and provide a clear, professional summary of:

1. **What changes were made** in the codebase.
2. **Why each change was necessary**, including context about:
   - Enabling Cypress tests to run correctly.
   - Modifying frontend components built with React and TypeScript to support E2E testing.
   - Supporting drag-and-drop testing with `react-beautiful-dnd`.
   - Ensuring proper Cypress configuration and scripts in `package.json`.
3. Mention any **new files created**, like `position.spec.js` or `cypress.config.js`.
4. Mention any **frontend adjustments**, such as adding `data-cy` attributes.
5. Mention **any new or modified scripts** in `package.json` that allow running the tests.
6. Emphasize that all changes were made without altering the project structure.

The result should be formatted in Markdown and ready to paste into a Pull Request description.

Please output only the final markdown content.
````
