
CONFIGURATION:
Before using or testing this application, it needs to be configured correctly, here are the steps for a successful configuration:
Requirements
1. Install Node.js (v18 or newer) 
2. Install MySQL
Installation Procedures
 1. Extract the Project
- Unzip to location of choice
- Open a terminal/command prompt and navigate to the project folder
 2. Database Setup
First, create your MySQL database:
- Open MySQL Workbench or MySQL command line
- Create a new database with the name of your choice
```sql
CREATE DATABASE your_database_name;
```
- Please take note of your MySQL username, your password and the database you have just created
3. Environment Setup
Create a new file named `.env` in the root directory of your project and input these credentials in it:
```
# Kinde Auth Config ( leave these the same)
KINDE_CLIENT_ID=460a4e04113e4de5b027d4387ac3a30a
KINDE_CLIENT_SECRET=l7LWZ7Tnm3mz0bUSwAhu0C787jmHcCqrkvxGqMnyV9Kuv4vKeyO
KINDE_ISSUER_URL=https://attendancetracker215.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard

# Database config ( update these with your mysql credentials)
NEXT_PUBLIC_HOST=localhost
NEXT_PUBLIC_USER=your_mysql_username
NEXT_PUBLIC_DB_NAME=your_database_name
NEXT_PUBLIC_DB_PASSWORD=your_mysql_password
``` 
Replace the following with your mysql credentials:
- `your_mysql_username`: Your MySQL username (it’s usually 'root')
- `your_database_name`: Database name you created in the step 2
- `your_mysql_password`: Your MySQL password

 4. Install Dependencies
In the project directory, you can run “npm install” to install dependencies. 

 5. Initialize Database Schema
To create the database tables, run: “npm run db:push”, it will push the schema to the database.
 6. Start the Development Server
You can now start the application with running the following command: “npm run dev”. The application should be now available at [http://localhost:3000](http://localhost:3000)

Troubleshooting
1. Database Connection Errors:
   - Check whether MySQL is running on port 3306
   - Confirm your database credentials in the .env file
   - Test your MySQL connection: test this by trying to create a table in the database.
   - Once connected, verify your database exists with the following query in MySQL workbench: SHOW DATABASES;
2. Node.js Version Issues:
   - Verify Node.js version by running `node -v`
   - Use Node.js v18 or higher
3. Port 3000 is in use:
   - Switch port using `npm run dev -- -p 3001`
   - Update KINDE_SITE_URL and other URLS to new port number
4. Login Issues:
   - Please don't edit the Kinde authentication variables
   - This will allow to login correctly.
