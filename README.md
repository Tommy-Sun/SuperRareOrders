# SuperRareOrders 
Project made to poll buy/sell orders from the SuperRare API. 

## Description
This is a project which polls the SuperRare API (for buy/sell orders) every 13 seconds and adds them to a local database. If a row/datapoint already exists in the database, the row is updated instead of inserted as a new row. Languages: Typescript, PostgreSQL.

## How to use 
A local PostgreSQL database was created for this project. For personal use, it is necessary to create your own, and then update the user, host, port, and database (and password if you have one) fields to match your own in the [src/components/toDatabase.ts](src/components/toDatabase.ts) file.

## How to install
This project uses npm to install it. 
1. Download the code.
2. Unzip the folder "SuperRareOrders-master".
3. Open a terminal at the root of the project (cd "/path/to/SuperRareOrders-master").
4. Run "npm install" in the terminal.
5. After the dependencies have finished downloading, type "npm run dev" in the terminal (at the root of the project) to run in development mode.
6. After the development server successfully starts: watch for tables to populate in the terminal.