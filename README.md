This is a system that allows you to build your own workflows by combining different modules.

## Getting Started

- First, install node modules:
  ```bash
  npm install
  ```
- Then, build the project:
  ```bash
  npm run build
  ```
- Finally, run the server:
  ```bash
  # run with node
  node server.js

  # run with pm2
  pm2 start server.js --name workflow
  ```