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

function getFavorites(){
	var sql = "SELECT * FROM favorites ORDER BY title ASC";
	var results= [];
	var sqlReaultSet = db.execute(sql);
	while(sqlReaultSet.isValidRow()){
		
		results.push({
			id:sqlReaultSet.fieldByName('id'),
			title:sqlReaultSet.fieldByName('title'),
			description:sqlReaultSet.fieldByName('description'),
			link:sqlReaultSet.fieldByName('link')
		});
		sqlReaultSet.next();
	}
	
	sqlReaultSet.close();
	
	return results;
}

function isFavorite(title){
	
	var sql = "SELECT * FROM favorites WHERE title = '" + title.replace("'","''")+"'";
	var result= false;
	var sqlReaultSet = db.execute(sql);
	
	if(sqlReaultSet.isValidRow()){
		result = true;
	}
	
	sqlReaultSet.close();
	
	return result;
}
