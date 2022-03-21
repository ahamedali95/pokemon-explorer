**Pokemon Explorer Frontend Application**

First of all, I want to thank you guys for providing the opportunity to build this application. Even though the scope of the application is small, 
I thoroughly enjoyed building this application. It allowed me to explore new ideas, solutions, tools and technologies that 
I may not have used at work. It was a bliss to have that full-fledged freedom and get to explore new things.

The client-side application is a single-page application built using React and other accompanying libraries surrounding
React. These tools are:

1. React - library to build UI components.
2. TypeScript - programming language the extends JS and offers a vast typed ecosystem and core OOP features.
3. Babel - transpiler to convert JSX and latest version of JS in to vanilla JS that browser can understand. Also makes it possible to use
ECMAScript TC-39 stage-4 experimental features.
4. Webpack - module bundler that takes pieces of JS and its dependencies and bundles them in to a single deployable artifact, thus
 making it possible to build single page applications.
5. Jest - unit testing framework for modern JS applications that offers wide-range of features such as mocking, coverage, test runner,
assertion library and integration with other core tools.
6. React testing library - companion JSDOM-based testing library of Jest to make it easier to test React components from the perspective of the user.
7. ESLint - static analysis tool for JS applications.

Note: Project follows typical unopinionated folder structure that grouped files based on features, rather than types. Some
of the modules have been aliased via Webpack to give flexibility on accessing resources from anywhere without modifying relative paths
to the resources.

**Highlights of my work:**

1. **Notice!** Project is not bootstrap using create-react-app. Rather I setup everything from scratch, including configurations for webpack
(flexibly handled for dev and prod environments), ESLint, Jest and ESLint and TypeScript. It allowed me to conquer and control the entire ecosystem!

2. Utilized React hooks to design my application completely. It made code easy to read and intuitive.

3. Followed React recommended patterns such as container vs. presentational and controller vs. uncontrolled to design my
React components. That allowed to design each component in such a manner that components have their its own responsibility
and allowed them to be reusable and easily testable.

4. Created all the common components from scratch using css.

5. Implemented pagination for querying pokemons on-demand and implemented toast notifications to show success/failure
when a pokemon is favorited/unfavorited.

6. Added some test coverage. 

Instructions to run the application locally:

1. Please use v14.18.2 of nodeJS or closer to run this application
2. Install dependencies using `npm ci`
3. Run the application using `npm start` This will start the application at http://localhost:3000
6. Run unit tests using `npm run test` A coverage report is generated under `coverage` directory in root.
7. Perform static analysis using `npm run lint` and `npm run check:typings`
8. Checkout other scripts in package.json that allows you to perform other actions

Thank you for testing out my app!
- Ahamed

