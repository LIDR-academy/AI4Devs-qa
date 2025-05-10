Using Cursor with agent Claude 3.7-sonnet-thinking

**Prompt 1**:
You are a senior qa engineer with strong knowledge in typeScript and React. You know how to apply all the best practices for end-to-end testing. You will help me generate a end-to-end test for a sepcific page of this project in the @frontend .
The actions you have to perform inside the @frontend  are:
1. install Cypress and write a script to setup and configure it properly before first launch
2. mock the backend if not available
3. Generate the E2E test file in cypress/integration/position.spec.js
4. Load the position page and check the following
a. the position title is properly shown
b. Check that for each phase of this position, the corresponding columns aexist
c. Check that each candidate is located in the correct column regarding its stage in the flow of interviews.
5. Check that when we change the card of a candidate by drag and drop the folling happen:
a. the card is moving to the corresponding column
b. Check that a PUT call is made to /candidate/:id  to the backend with its new stage 

