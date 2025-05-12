```
LLM: Cursor + Claude 3.7 Sonnet
```

# Prompt 1:

I want you to be a fullstack engineer expert in End to End test in cypress.
First I want you to analyze this project and tell me the technology stack.

# Prompt 2:

Ok, now I need you to follow these guidelines:

# Goal

Using Cypress, test the "position" interface. Ensure the interface functions correctly through End-to-End (E2E) testing, applying current QA principles and best practices for the following scenarios:

# Scenarios

1. **Position Page Load**

   - Verify the position title displays correctly.
   - Verify columns corresponding to each hiring phase are displayed.
   - Verify candidate cards appear in the correct column based on their current phase.

2. **Candidate Phase Change**
   - Simulate dragging a candidate card from one column to another.
   - Verify the candidate card moves to the new column.
   - Verify the candidate's phase updates correctly in the backend via the `PUT /candidate/:id` endpoint.

## Requirements

- Apply BDD best practices and development best practices.
- Write the Cypress script in `/cypress/integration` named `position.spec.js`.
- The frontend is located in `/frontend/`.
- At the end I have to deliver a Pull Request including the page changes, logic in the `/frontend` folder
- **DO NOT DO ANYTHING YET** — provide a detailed plan first.
- Proceed step-by-step.
- Ask questions before starting.

# Prompt 3:

Why are I see "Apply to prompts-JJGC.md"?
Remember:

```
- Write the Cypress script in `/cypress/integration` named `position.spec.js`.
- The frontend is located in `/frontend/`. Scan everything before writing code.
- At the end I have to deliver a Pull Request including the page changes, logic in the `/frontend` folder
```

# Prompt 4:

is this not enough? I have cypress installed already!
Please double check!!!

# Prompt 5:

can I get again the plan step-by-step? seems like you don't have a clear idea of what you need to do!

revisit the requirements, scenarios and goal!!!!
DO NOT DO ANYTHING YET, once I have the plan approved I'll let you know to execute it

# Prompt 6:

Execute the plan without the phase 5.

# Prompt 7:

now I see an error:

```
Could not load a Cypress configuration file because there are multiple matches.

We've found 2 Cypress configuration files named cypress.config.ts, cypress.config.js at the location below:

/Users/j2g/repos/ai4devs/AI4Devs-qa/frontend

Please delete the conflicting configuration files.
```

# Prompt 8:

I see this error:

```
assertexpected <div.mb-2.card> not to exist in the DOM
AssertionError
Timed out retrying after 4000ms: Expected <div.mb-2.card> not to exist in the DOM, but it was continuously found. Queried from:

> cy.get([data-testid="stage-column-Initial Interview"])
cypress/e2e/position.cy.ts:126:10
  124 |       cy.get('[data-testid="stage-column-Initial Interview"]')
  125 |         .find('[data-testid^="candidate-card-"]')
> 126 |         .should("not.exist");
      |          ^
  127 |
  128 |       // Test dragging to empty stage
  129 |       cy.get('[data-testid=
```
