import Dexie, { type EntityTable } from 'dexie';

// Define the interface for our Item
export interface Item {
  id: string; // SKU or Barcode
  name: string;
  quantity: number;
  location: string;
  updatedAt: number;
}

const db = new Dexie('IstiqomahStockDB') as Dexie & {
  items: EntityTable<
    Item,
    'id' // primary key "id" (for the barcode/SKU)
  >;
};

// Schema declaration
db.version(1).stores({
  items: 'id, name, location, updatedAt'
});

export default db;
