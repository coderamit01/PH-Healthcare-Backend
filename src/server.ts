import "dotenv/config";
import app from "./app";
import { envVars } from "./app/config/env";

const main = () => {
  try {
    app.listen(envVars.PORT, () => {
      console.log(`Server is running on http://localhost:${envVars.PORT}`);
    });
  } catch (error) {
    console.log("Something went wrong!",error);
  }
}

main();