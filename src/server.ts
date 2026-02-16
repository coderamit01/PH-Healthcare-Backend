import "dotenv/config";
import app from "./app";

const Port = process.env.PORT;

const main = () => {
  try {
    app.listen(Port, () => {
      console.log(`Server is running on http://localhost:${Port}`);
    });
  } catch (error) {
    console.log("Something went wrong!",error);
  }
}

main();