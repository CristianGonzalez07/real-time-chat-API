## Real-Time Chat
  Welcome to the Real Time Chat API! This API serves a real-time chat application project that allows users to communicate with each other.
  Users and messages are stored in a mongoDB database. Graphql-ws and redislabs are used for the realtime connection.

  You can find the front-end code for this API [here](https://github.com/CristianGonzalez07/real-time-chat)

## Prerequisites
  Make sure you have Node.js installed on your machine.
  You must have or create an account in [Redislabs](https://app.redislabs.com/#/)
  You must have or create an account in [Atlas](https://account.mongodb.com/)


## Setup
1. Clone this repository to your local machine using the following command:

  ```bash
  git clone https://github.com/CristianGonzalez07/real-time-chat-API.git
  ```

2. Navigate to the project directory:

  ```bash
  cd real-time-chat-API
  ```

3. Install the necessary dependencies by running the following command:

  ```bash
  npm install
  ```

4. Create a .env file in the root of the project with the following structure:

  ```bash
  REDIS_LABS_HOST=redislabs-host
  REDIS_LABS_PORT=redislabs-port
  REDIS_LABS_PASSWORD=redislabs-password
  DB_NAME=db-name
  DB_USER=db-user
  DB_PASS=db-password
  DB_HOST=db-host
  URL=front-end-url
  SECRET=your-jwt-secret-key
  ```
  Instructions to get the parameters:

    1. REDIS_LABS_HOST: This parameter represents the Redis Labs host. It typically refers to the hostname or IP address of the Redis server you are connecting to.
    To obtain the Redis Labs host, you need to access your Redis Labs account dashboard. Once you are logged in, navigate to the desired Redis database instance. The Redis Labs host information should be available on the instance details page or the connection settings section. It might be displayed as a URL or an IP address.

    2. REDIS_LABS_PORT: This parameter represents the Redis Labs port. It indicates the port number on which the Redis server is listening for connections.
    The Redis Labs port can also be found on the instance details page or the connection settings section in your Redis Labs account dashboard. It is typically displayed as a numerical value.

    3. REDIS_LABS_PASSWORD: This parameter represents the password required to authenticate and access your Redis Labs database.
    Similarly, the Redis Labs password can be obtained from the instance details or connection settings page in your Redis Labs account dashboard. Look for the authentication or password section, where you should find the password associated with your Redis instance.

    4. DB_NAME: This parameter represents the name of your MongoDB database.
    To obtain the DB_NAME, you need to access your MongoDB Atlas account. Once logged in, navigate to your project and cluster. From there, go to the "Database Access" or "Database Users" section. You should be able to see the list of database users and their associated roles. Find the user that you want to use and note the database name associated with that user.

    5. DB_USER: This parameter represents the username or user identifier for accessing the MongoDB database.
    Similarly, in the "Database Access" or "Database Users" section of your MongoDB Atlas account, locate the desired user and note the username associated with that user. This will be the DB_USER value.

    6. DB_PASS: This parameter represents the password for the specified MongoDB database user.
    In the same "Database Access" or "Database Users" section, find the user you want to use and click on the edit button or the pencil icon next to the user. This will allow you to modify the user details, including the password. Set the desired password and save the changes. The password you set will be the DB_PASS value.

    7. DB_HOST: This parameter represents the hostname or connection string for your MongoDB Atlas cluster.
    To obtain the DB_HOST value, go to your MongoDB Atlas project and cluster. From the cluster details page, look for the "Connect" button and click on it. MongoDB Atlas provides different connection options such as MongoDB Shell, drivers, or application connection strings. Choose the appropriate option based on your requirements. The connection string or hostname will be provided in the connection details.


## Execution

1.  Run the following command:

  ```bash
  npm start
  ```
