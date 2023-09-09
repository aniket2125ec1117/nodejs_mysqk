const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();


const pool = mysql.createPool({
    host: process.env.HOST_NAME,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME
}).promise();

async function getAllReuslt() {
    try{
        const [rows,result] = await pool.query("SELECT * FROM student_id");
        return rows;
    } catch(err){
        console.log(err);
    } finally {
        console.log("Done");
    }
};

async function getNote(id) {
  try {
    const [rows] = await pool.query(`
    SELECT *
    FROM student_id
    WHERE RegistrationId = ?`,
    [id]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

// (async function main() {
//     const getNotesDetails = await getNote(1);
//     console.log(getNotesDetails);
// })();

async function createNote(first_name, last_name, email, phone, gender){
    try {
        const [result]= await pool.query(`
        insert into student_id
        (first_name, last_name, email, phone, gender)
        values (?, ?, ?, ?, ?)
        `, [first_name, last_name, email, phone, gender]);
        const id = result.insertId;
        return getNote(id);
    } catch (error) {
        console.log(error);
    }
}

async function deleteTour(id) {
    try {
        return await pool.query(`delete from student_id
        where RegistrationId = ?`, [id]);

    } catch (error) {
        console.log(error);
    } finally {
        console.log("Deleted successfully");
    }
}
async function deleteAllTour() {
    try {
        await pool.query("delete from student_id");
        await pool.query("ALTER TABLE student_id AUTO_INCREMENT = 1");
    } catch (error) {
        console.log(error);
    } finally {
        console.log("done");
    }
}


module.exports = {
    getAllReuslt, getNote, createNote , deleteTour, deleteAllTour
}

// (async function tourCreated1(){
//     const tourCreated5 = await createNote("Rohan", "raj", "Roahn14223@gmail.com", "98712345678", "Male");
//     console.log(tourCreated5);
// })();
