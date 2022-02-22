const mongoose = require("mongoose")

const connectDB = async () => {
	try {
			await mongoose.connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
			.catch((error) => console.log(error))
			const connection = mongoose.connection;
			console.log("MongoDB sucessfully conneted")
	} catch (error) {
		console.log(error)
		return error
	}
}

module.exports = connectDB