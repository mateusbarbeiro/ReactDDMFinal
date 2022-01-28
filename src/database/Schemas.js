export const sectionsTable = "CREATE TABLE IF NOT EXISTS sections (" +
                                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                                "name TEXT NOT NULL" +
                                ");"

export const sectionsInserts = "INSERT INTO sections (name) VALUES " +
                                "('Aquarela')," +
                                "('Afresco')," +
                                "('Pintura a óleo')," +
                                "('Pintura à têmpera')," +
                                "('Pintura de tinta acrílica')," +
                                "('Pintura mural');";

export const productsTable = "CREATE TABLE IF NOT EXISTS products (" +
                                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                                "name TEXT," +
                                "description TEXT," +
                                "photoUrl TEXT," +
                                "price DOUBLE," +
                                "sectionId INTEGER NOT NULL," +
                                "active BOOLEAN DEFAULT true," +
                                "deleted BOOLEAN DEFAULT false," +
                                "FOREIGN KEY (sectionId) REFERENCES sections (id)" +
                                ");"