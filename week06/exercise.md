# Exercise - Design a static React page

Consider the HTML page designed on the last Lab.

Goal: **Create a React application that generates a similar page, by exploiting a static data structure containing a question a some answers.**

## Creating a project

Create a new React project called **qa-client**. Insert into `App.jsx` the code for loading a 'fake' set of questions and answers in JavaScript objects. For those objects, re-use the same data structures created for Exercises 3-4.

## Defining the component tree

Starting from the screen of the "HeapOverrun" question page, make a list of the components that you need to recreate the page.

For each component, list the information (`prop`s) that are required by that component (and/or by any other enclosed component).

## Implementing the components

Create a folder `components`, and create one or more files, containing the needed React components as functions, and modify the App to render those components.

The components should **not** be interactive, yet. 