import fs from 'node:fs';
import { parse } from 'csv-parse';
import { Movie } from '@/app/domain/movie.domain';
import { createMovie } from './create.movie.service';
import { getProducerByName } from '../producer.service';

const existsFile = async (pathToImport: string) : Promise<boolean> => {

    return fs.existsSync(pathToImport);
}

const importMovieToDatabase = async (row: any) : Promise<void> => {
    const movie: Movie = {
        year: row.year,
        title: row.title,
        studios: row.studios,
        producers: [],
        winner: row.winner === 'yes'
    }

    const producers = row.producers.replace(/\s+and\s+/g, ',');
    let listProducers = producers.split(',').filter((producer: string) => producer.trim() !== '');
    listProducers = [...new Set(listProducers)];
    listProducers = listProducers.map((producer: string) => {return {name: producer.trim()}});
    for (const producer of listProducers) {
        const producerSaved = await getProducerByName(producer.name);
        if (producerSaved !== null)
            producer.id = producerSaved.id;
    };
    movie.producers = listProducers;
    await createMovie(movie);
    
}

const parseCSV = async (pathToImport: string) : Promise<any[]> => {

    const lines: any[] = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(pathToImport)
            .pipe(parse({
                columns: true,
                delimiter: ';',
                trim: true,
                skip_empty_lines: true,
                relax_column_count: true
            }))
            .on('data', async (row: any) => {
                lines.push(row);
            })
            .on('end', () => {
                resolve(lines); 
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

export const importMovie = async (pathToImport: string) : Promise<void> => {

    if (!await existsFile(pathToImport)) {
        throw new Error(`File not found: ${pathToImport}`);
    }

    const lines = await parseCSV(pathToImport);

    for (const line of lines) {
        try {
            await importMovieToDatabase(line);
        } catch (error) {
            const errorMessage = (error as Error).message;
            throw new Error(`Error importing movie ${line.title}: ${errorMessage}`);
        }
    }
}