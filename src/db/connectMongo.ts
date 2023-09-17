import { connect } from "mongoose";
import "dotenv/config"

/*
	used to connect to the database, if the connection is already open, it will return the existing connection but if not it will create a new one
*/
let isConnected;
export default () => {
	if (isConnected) {
		console.log("=> using existing database connection");
		return Promise.resolve();
	}
	console.log("=> using new database connection");

	return connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
		isConnected = db.connections[0].readyState;
	});
};
