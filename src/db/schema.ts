import * as SQLite from 'expo-sqlite';

export const setupDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('istiqomah-stock.db');

  // Skema sesuai dengan document perencanaan PDF
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS floors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      color TEXT,
      icon TEXT,
      sort_order INTEGER
    );

    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      floor_id INTEGER NOT NULL,
      code TEXT NOT NULL,
      name TEXT NOT NULL,
      qr_code TEXT,
      capacity INTEGER,
      FOREIGN KEY (floor_id) REFERENCES floors(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location_id INTEGER NOT NULL,
      sku TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      category TEXT,
      unit TEXT NOT NULL,
      qty REAL DEFAULT 0,
      min_qty REAL DEFAULT 0,
      max_qty REAL DEFAULT 0,
      price REAL DEFAULT 0,
      qr_code TEXT,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id INTEGER NOT NULL,
      type TEXT NOT NULL, -- in, out, adjust
      qty REAL NOT NULL,
      note TEXT,
      user_id INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id INTEGER NOT NULL,
      alert_type TEXT,
      severity TEXT,
      message TEXT,
      status TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
    );
    
    CREATE INDEX IF NOT EXISTS idx_items_location ON items(location_id);
    CREATE INDEX IF NOT EXISTS idx_items_sku ON items(sku);
  `);
  
  // Insert initial data if floors are empty
  const checkData: any = await db.getFirstAsync('SELECT COUNT(*) as count FROM floors');
  if (checkData.count === 0) {
    await db.execAsync(`
      INSERT INTO floors (name, description, color, icon, sort_order) VALUES
      ('Kebutuhan Harian', 'Lantai 1 - Sembako & Harian', '#6366F1', 'shopping-bag', 1),
      ('Pakaian', 'Lantai 2 - Pakaian Keluarga', '#8B5CF6', 'shirt', 2),
      ('Perabotan', 'Lantai 3 - Perabot & Elektronik', '#EC4899', 'sofa', 3),
      ('Gudang', 'Lantai 4 - Cadangan & Arsip', '#F59E0B', 'archive', 4);
    `);
  }

  return db;
};
