import { connect } from "mongoose";

let urlBase: string = `mongodb://localhost:27017`;

const connectionWithDB = async (database: string): Promise<void> => {
    try {
        await connect(`${urlBase}/${database}`);
        console.info("Connect with MongoDB successfull");
    } catch (err: any) {
        console.error("Error: "+err);
    }
}

export { connectionWithDB };

