/**
 * @author Chia-Yuan Hsiung
 */
var db = Titanium.Database.open('mydb');
db.execute('CREATE TABLE IF NOT EXISTS favorites'
		  +'(ID INTEGER PRIMARY KEY AUTOINCREMENT, TITLE TEXT, LINK TEXT, DESCRIPTION TEXT)');
