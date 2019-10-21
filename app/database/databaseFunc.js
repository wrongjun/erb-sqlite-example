import message from 'antd';

export function createOrOpenDB(){
  const sqlite3 = require('sqlite3').verbose();

  let db = new sqlite3.Database('./resources/database/membership.db',sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
  });

  db.serialize(() => {
    //db.run('DROP TABLE members;');
    //db.run('DROP TABLE visits');
    //db.run('DROP TABLE visits');
    db.run(
      `CREATE TABLE IF NOT EXISTS vips (
        vip_id INTEGER PRIMARY KEY,
        percentage INTEGER NOT NULL
        )`
    );

    db.run(`
    CREATE TABLE IF NOT EXISTS members (
      member_id TEXT PRIMARY KEY UNIQUE,
      wechat_id TEXT DEFAULT 0,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      birthday TEXT NOT NULL,
      phone INTEGER NOT NULL UNIQUE,
      validation_time TEXT DEFAULT CURRENT_TIMESTAMP,
      vip_id INTEGER,
      FOREIGN KEY (vip_id)
        REFERENCES vips (vip_id)
      )`
    );

    db.run(`
      CREATE TABLE IF NOT EXISTS visits (
        visit_id INTEGER PRIMARY KEY AUTOINCREMENT,
        visit_time TEXT DEFAULT CURRENT_TIMESTAMP,
        member_id TEXT,
        FOREIGN KEY (member_id)
          REFERENCES members (member_id)
        )`
    );
    db.run(`INSERT INTO vips(vip_id,percentage) VALUES(0,25)`);
    db.run(`INSERT INTO vips(vip_id,percentage) VALUES(1,40)`);

    db.close();
  })
}

export function memberRegister(data){
  const sqlite3 = require('sqlite3').verbose();

  let db = new sqlite3.Database('./resources/database/membership.db',sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
  });

  //console.log(data)
  db.serialize(() => {
    db.run(
      `INSERT INTO members( member_id, wechat_id, first_name, last_name, email, birthday,phone, vip_id) VALUES(?,?,?,?,?,?,?,?)`,
     [data.code,data.wechatID,data.fName,data.lName,data.email,data.birthday,data.phone,data.vipType], function(err) {
      if (err) {
        return window.alert(err.message);
      }
    });
    let sql = `SELECT * FROM members;`
    db.get(sql, [], (err, row) => {
      if (err) {
        throw err;
      }
      console.log(row);
    });


    db.close();
  })





}


export function getAllMembers(callback){
  const sqlite3 = require('sqlite3').verbose();

  let db = new sqlite3.Database('./resources/database/membership.db',sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('getting all users')
  });

  let sql = `SELECT * FROM members;`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    callback(err,rows)
  });
  db.close()
}

export function getOne(id,callback){
  const sqlite3 = require('sqlite3').verbose();

  let db = new sqlite3.Database('./resources/database/membership.db',sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
  });


  let sql = `SELECT member_id,
              wechat_id ,
              first_name,
              last_name,
              email ,
              birthday,
              phone,
              b.vip_id,
              b.percentage,
              DATE(validation_time) as validation_time,
              (SELECT count(*) FROM visits WHERE member_id = ?) as visits FROM members a LEFT JOIN vips b ON a.vip_id = b.vip_id WHERE member_id =?`;
  /*
  db.get(`SELECT EXISTS(SELECT 1 FROM members WHERE member_id=?);`, [id], (err, row) => {
    if (err) {
      console.log(err)
      throw err;
      return ;
    }
    console.log(row)
    if(row){
      callback(row)
    }

  });
*/

  db.get(sql, [id,id], (err, row) => {
    if (err) {
      throw err;
    }
    if(row){callback(row)}
  });


  db.close();
}




export function submitVisited(id){
  const sqlite3 = require('sqlite3').verbose();

  let db = new sqlite3.Database('./resources/database/membership.db',sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
  });

  let sql=`INSERT INTO visits(member_id) VALUES(?)`
  db.run(sql,[id])

  sql = `SELECT * FROM visits`;
  db.all(sql,[] , (err, rows) => {
    if (err) {
      throw err;
    }

    console.log(rows)
  });


}
