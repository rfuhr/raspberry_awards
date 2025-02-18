export const fetchAll = async (): Promise<any> => {

    return [{
        year: 2021,
        title: 'The Matrix',
        producer: 'Joel Silver',
        winner: true
    },
    {
        year: 1980,
        title: 'The Matrix Reloaded',
        producer: 'Joel Silver',
        winner: false
    }];
}