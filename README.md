# ideabox
Ideabox is a simple application that allows users to create a pool of ideas and promote collaboration

[API Documentation](https://ideabox1.docs.apiary.io/)

[![Build Status](https://travis-ci.org/bumsyalao/ideabox.svg?branch=develop)](https://travis-ci.org/bumsyalao/ideabox)
[![Coverage Status](https://coveralls.io/repos/github/bumsyalao/ideabox/badge.svg)](https://coveralls.io/github/bumsyalao/ideabox)

### Key Application Features

A user can perform the following: 
- Create an account 
- Login to account 
- User can create ideas
- Users can modify ideas, edit and delete. 
- User can make ideas private or public.
- Users can comment on public ideas
- Users can share ideas, and post to social media.
- Users can view all public Ideas
- Users can search for ideas and filter search by category.
- Users can edit their profile.
- Users can Logout of App.

In addition to the general user functions:
- User can send reset their password.

##### Authentication: Users are authenticated and validated using JsonWebToken.

### Development

This application was developed using NodeJs with express for routing. MongoDB was used for persisting data.

The frontend was built with the react and redux framework.

### Installation

- Clone the project repository.
- Run ```git clone (https://github.com/bumsyalao/ideabox)```

more info: (https://help.github.com/articles/cloning-a-repository/)
- Run ``` npm install ``` to install the dependencies in the package.json file.

#### Usage

Login, Sign Up and start creating ideas

### Technologies Used

- JavaScript (ES6) (http://es6-features.org/)
- Node.js (https://nodejs.org/en/)
- Express (https://www.npmjs.com/package/express-api)
- React/Redux (http://redux.js.org/docs/basics/UsageWithReact.html)
- Mongoose (http://mongoosejs.com/docs/)
- Material Design CSS Framework (http://materializecss.com/)
- SASS/SCSS.

### Limitations
+ Users cannot upload pictures.
+ Users cannot delete their accounts.

### FAQ
#### Is Ideabox app free or do you plan to monetize it in future?
Yes its totally free and it will continue to be free

#### How many end points are there currently?
Currently its 15

#### Is Ideabox app open source?
Yes, and I encourage you to contribute to the project

#### What if I want to customize my environment variables?
That's easy. In the root of the project. create a file named .env and add exactly what you see in the .env.example file.


### Contribution
I am glad you want to contribute to this project, Please checkout the wiki page [Contributing](https://github.com/bumsyalao/ideabox/wiki/Contributing)

### Author
Olubunmi Alao
## License & Copyright
MIT © [Olubunmi Alao](https://github.com/bumsyalao)

Licensed under the [MIT License](LICENSE)
