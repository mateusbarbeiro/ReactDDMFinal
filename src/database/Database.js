import * as SQLite from 'expo-sqlite';
import {
    sectionsTable,
    sectionsInserts,
    productsTable
} from './Schemas'

export const db = SQLite.openDatabase("database.db");

export const initDB = () => {
    db.exec([{
            sql: 'PRAGMA foreign_keys = ON;',
            args: []
        }],
        false,
        () => console.log('Foreign keys turned on')
    );

    db.transaction((tx) => {
        tx.executeSql(sectionsTable);
        tx.executeSql(productsTable);

        const sql = "SELECT * FROM sections;"

        tx.executeSql(
            sql,
            null,
            (tx, results) => {
                if (results.rows.length === 0) {
                    tx.executeSql(sectionsInserts);
                }
            }
        );
    }, (error) => {
        console.log("error call back : " + JSON.stringify(error));
        console.log(error);
    }, () => {
        console.log("InitDB concluido.");
    })
}

export const getSections = async (onChangeFunction) => {

    await db.transaction(async (tx) => {
        const sql = "SELECT id as 'value', name as 'label' FROM sections;"

        await tx.executeSql(
            sql,
            null,
            (tx, results) => {
                let data = [];
                for (var i = 0; i < results.rows.length; i++) {
                    data.push(results.rows.item(i));
                }
                onChangeFunction(data)
            }
        );
    }, (error) => {
        console.log("error call back : " + JSON.stringify(error));
        console.log(error);
    }, () => {
        console.log("Busca de seções completa. ");
    });
}

export const getProducts = async (onChangeFunction) => {

    await db.transaction(async (tx) => {
        const sql = "SELECT id, name as 'nome', photoUrl as 'foto', price as 'preco' FROM products;"

        await tx.executeSql(
            sql,
            null,
            (tx, results) => {
                let data = [];
                for (var i = 0; i < results.rows.length; i++) {
                    data.push(results.rows.item(i));
                }
                onChangeFunction(data)
            }
        );
    }, (error) => {
        console.log("error call back : " + JSON.stringify(error));
        console.log(error);
    }, () => {
        console.log("Busca de Produtos completa. ");
    });
}

export const getProductById = async (onChangeFunction, id) => {
    await db.transaction(async (tx) => {
        const sql = "SELECT name, description, price, photoUrl, sectionId FROM products where id = ?;"

        await tx.executeSql(
            sql,
            [id],
            (tx, results) => {
                onChangeFunction(results.rows.item(0));
            }
        );
    }, (error) => {
        console.log("error call back : " + JSON.stringify(error));
        console.log(error);
    }, () => {
        console.log("Busca de produto por id completa. ");
    });
}

export const insertProduct = async (product) => {
    await db.transaction(async (tx) => {
        const sql = "INSERT INTO products (name, description, price, photoUrl, sectionId) VALUES (?, ?, ?,?, ?);"
        await tx.executeSql(
            sql,
            [
                product.name,
                product.description,
                product.price,
                product.photoUrl,
                product.sectionId
            ]
        );

    }, (error) => {
        console.log("error call back : " + JSON.stringify(error));
        console.log(error);
    }, () => {
        console.log("Inserção de Produto completa.");
    });
}

export const updateProduct = async (product) => {
    await db.transaction(async (tx) => {
        const sql = "UPDATE products SET name = ?, description = ?, price = ?, photoUrl = ? , sectionId = ? WHERE id = ?;"
        await tx.executeSql(
            sql,
            [
                product.name,
                product.description,
                product.price,
                product.photoUrl,
                product.sectionId,
                product.id
            ]
        );

    }, (error) => {
        console.log("error call back : " + JSON.stringify(error));
        console.log(error);
    }, () => {
        console.log("Atualização de Produto completa.");
    });
}

export const deleteProductById = async (id) => {
    await db.transaction(async (tx) => {
        const sql = "DELETE FROM products WHERE id = ?;"
        await tx.executeSql(
            sql,
            [id]
        );

    }, (error) => {
        console.log("error call back : " + JSON.stringify(error));
        console.log(error);
    }, () => {
        console.log("Exclusão de Produto completa.");
    });
}

export const dropTable = () => {
    db.transaction((tx) => {
        const sql = "DROP TABLE IF EXISTS products;"
        const sql1 = "DROP TABLE IF EXISTS sections;"

        tx.executeSql(sql);
        tx.executeSql(sql1);
    }, (error) => {
        console.log("error call back : " + JSON.stringify(error));
        console.log(error);
    }, () => {
        console.log("Drop table concluido.");
    })
}