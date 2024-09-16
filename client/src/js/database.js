import { openDB } from 'idb';

// Initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Open the database
  const jateDb = await openDB('jate', 1);

  // Start a transaction and specify the store
  const tx = jateDb.transaction('jate', 'readwrite');

  // Get the store
  const store = tx.objectStore('jate');

  // Add the content to the store
  const request = store.put({ id: 1, value: content }); 

  // Confirm the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');

  // Open the database
  const jateDb = await openDB('jate', 1);

  // Start a transaction and specify the store
  const tx = jateDb.transaction('jate', 'readonly');

  // Get the store
  const store = tx.objectStore('jate');

  // Get all data from the store
  const request = store.get(1); 

  // Confirm the request
  const result = await request;
  console.log('result.value', result?.value);
  return result?.value;
};

// Initialize the database
initdb();
