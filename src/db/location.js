import MD from "./mongodb";
import { locaData } from "./local_data";


export const addLocation = () => {
    MD.then( db => {
        var dbo = db.db("chicken");

        dbo.collection("location").insertMany( locaData, (err, res) => {
            if (err) throw err;
            console.log("插入的文档数量为: " + res.insertedCount);
            db.close();
        });
    });
}