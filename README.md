# Employee Tracker

## Description

This program will help you keep track of your employees, and their roles, departments, salaries, and managers

## Install and Run

Follow this video:

[video](https://watch.screencastify.com/v/oVzcECIMitHbQJQxH19U)

### Before you begin:

1. Make sure you have MySQL Server installed.

### One-time Setup:

1. Clone the repository
2. From the command line, navigate to the repository directory
3. Initialize the database with:

    ```mysql -u root -p```

4. Run:

    ```source db/db.sql```
    ```source db/schema.sql```

5. You can seed the database with data by modifying seeds.sql. When you're ready, run:

    ```source db/seeds.sql```

6. To quit MySQL Server, Run:

    ```quit```

7. To use your password for MySQL Server, Run:

    ```echo|set /p="<MySQL Server Password>" > mykey.txt```

8. Run:

    ```npm install```


### Running the program:

1. From the repository directory, Run:

    ```node index```

2. Answer the questions
3. To do multiple actions, run the program again.

## Credits

### Created by:
* [Ian Moses](https://github.com/Moses-Ian)

### Technologies Used:
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [console.table](https://www.npmjs.com/package/console.table)
* [mySQL2](https://www.npmjs.com/package/mysql2)

## License

Please do not copy any of my code.
