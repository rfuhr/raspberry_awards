import { prodDataSource } from "./prod.database";
import { testDataSource } from "./test.database";

export const getDataSource = () => {
    if (process.env.NODE_ENV === 'test') {
        return testDataSource;
    } else {
        return prodDataSource;
    }
}