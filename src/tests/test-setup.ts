import { getDataSource } from "@/infra/database/factory.datasource";

beforeAll(async () => {
    const dataSource = getDataSource(); 
    if (!dataSource.isInitialized)
        await dataSource.initialize();
});

afterAll(async () => {
    // await getDataSource().destroy();
  }
);