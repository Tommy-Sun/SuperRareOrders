const { Client } = require('pg');

function getClient() {
    const client = new Client({
        user: "thomaskebschull",
        host: "localhost",
        port: "5432",
        database: "superrareorders"
    });
    return client
}

async function createDBtable() {

    const client = getClient();
    try {
        await client.connect();
        await client.query("BEGIN");
        await client.query(
            "CREATE TABLE sr_orders ( \
                order_id INT NOT NULL PRIMARY KEY, \
                order_data JSON NOT NULL \
            );"
        );
        await client.query("COMMIT");
        console.log("Successfully Created the table: sr_order.");
    } catch (error) {
        console.log("DataBase sr_orders already exists.");
        await client.query("ROLLBACK")
    } finally {
        await client.end();
    }
}

async function addtoDB(order_id: number, order_data: string) {

    const client = getClient()
    try {
        await client.connect();
        console.log("Connected successfully.")
        await client.query("BEGIN");
        var isInDataBase = await client.query(`SELECT COUNT(*) FROM sr_orders WHERE order_id = ${order_id};`);
        isInDataBase = isInDataBase.rows[0]["count"];
        if (isInDataBase != 0) {
            await client.query(`UPDATE sr_orders SET order_data = '${JSON.stringify(order_data)}' WHERE order_id = ${order_id};`); 
            console.log(`Order ID: ${order_id} Updated`);
        }
        else {
            await client.query(`INSERT INTO sr_orders (order_id, order_data) VALUES (${order_id}, '${JSON.stringify(order_data)}');`); 
            console.log(`Order ID: ${order_id} Inserted`);
        }
        await client.query("COMMIT");

    } catch (error) {
        console.log(`Failed to execute. ${error}`);
        await client.query("ROLLBACK")
    } finally {
        await client.end();
    }
}

async function showDB() {

    const client = getClient()
    try {
        await client.connect();
        console.log("Connected successfully.")
        const results:any = await client.query("SELECT * FROM sr_orders"); 
        console.table(results.rows)
    } catch (error) {
        console.log(`Failed to execute. ${error}`);
        await client.query("ROLLBACK")
    } finally {
        await client.end();
    }
}


export {  addtoDB, createDBtable, showDB };

