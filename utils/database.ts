import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('golf_tracker.db');

export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS courses (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        location TEXT NOT NULL
      );`
    );
    
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS holes (
        id TEXT PRIMARY KEY NOT NULL,
        course_id TEXT NOT NULL,
        number INTEGER NOT NULL,
        par INTEGER NOT NULL,
        yardage INTEGER NOT NULL,
        tee_latitude REAL NOT NULL,
        tee_longitude REAL NOT NULL,
        pin_latitude REAL NOT NULL,
        pin_longitude REAL NOT NULL,
        FOREIGN KEY (course_id) REFERENCES courses (id)
      );`
    );
    
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS rounds (
        id TEXT PRIMARY KEY NOT NULL,
        course_id TEXT NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT,
        FOREIGN KEY (course_id) REFERENCES courses (id)
      );`
    );
    
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS shots (
        id TEXT PRIMARY KEY NOT NULL,
        round_id TEXT NOT NULL,
        hole_number INTEGER NOT NULL,
        shot_number INTEGER NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (round_id) REFERENCES rounds (id)
      );`
    );
  });
};

export const addCourse = (course: GolfCourse): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO courses (id, name, location) VALUES (?, ?, ?);',
        [course.id, course.name, course.location],
        () => {
          // Insert all holes
          course.holes.forEach(hole => {
            tx.executeSql(
              `INSERT INTO holes 
              (id, course_id, number, par, yardage, tee_latitude, tee_longitude, pin_latitude, pin_longitude) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
              [
                `${course.id}-${hole.number}`,
                course.id,
                hole.number,
                hole.par,
                hole.yardage,
                hole.teeLatitude,
                hole.teeLongitude,
                hole.pinLatitude,
                hole.pinLongitude
              ],
              () => {},
              (_, error) => {
                reject(error);
                return true;
              }
            );
          });
          resolve();
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

// Add similar functions for other database operations
