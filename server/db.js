import sqlite3 from 'sqlite3';
import { promisify } from 'util';

const database = new sqlite3.Database('./tincweb.db');

export const getDb = async () => {
  return {
    all: promisify(database.all.bind(database)),
    get: promisify(database.get.bind(database)),
    run: (...args) => new Promise((resolve, reject) => {
      database.run(...args, function(err) {
        if (err) reject(err); else resolve(this);
      });
    })
  };
};
