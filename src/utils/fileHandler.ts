import fs from 'fs/promises';

export const readFile = async (filePath: string) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading file: ${filePath}`, err);
    return err;
  }
};

export const writeFile = async (filePath: string, data: any) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    //console.log(`Data successfully written to ${filePath}`);
  } catch (err) {
    return err;
    //console.error(`Error writing file: ${filePath}`, err);
  }
};
