## Installation

This project was bootstrapped with NestJS CLI

To run the project locally,

1. Git clone this repository
   `git clone https://github.com/ibrahimkholil6210/my-movie-backend.git`
2. Ensure you've installed node & npm to download the dependencies. The project has been tested with the following versions but should also work with later ones.
   - node: v16.8.0
   - npm: 7.21.0
3. It is recommended to use Npm for downloading all the dependencies. Yarn would do the job too. Perform the following commands inside your project folder (directory where the package.json is located)
   `npm install` or `yarn install`
4. Now in the root of the project create `.env` file and add `DB_URL` and `JWT_SECRET` key and respective value which can be found in the email. As this are sensetive data i didn't add them into the project 
5. You can now start the nest project by `npm run start:dev`. The project can be accessed at `http://localhost:4000/api`.