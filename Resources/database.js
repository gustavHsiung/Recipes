/**
 * @author Chia-Yuan Hsiung
 */
var db = Titanium.Database.open('mydb');
db.execute('CREATE TABLE IF NOT EXISTS favorites'
		  +'(ID INTEGER PRIMARY KEY AUTOINCREMENT, TITLE TEXT, LINK TEXT, DESCRIPTION TEXT)');

function insertFavorite(title, description, link){
	var sql = "INSERT INTO favorites ( title, description, link) VALUES"
			+	"(";
		sql	=	sql + "'" + title.replace("'","''") + "',";
		sql	=	sql + "'" + description.replace("'","''") + "',";
		sql	=	sql + "'" + link.replace("'","''") + "')";
		db.execute(sql);
		return db.lastInsertRowId;
			
}

function deleteFavorite(id){
	var sql = "DELETE FROM favorites WHERE id = " + id;
	db.execute(sql);
}
