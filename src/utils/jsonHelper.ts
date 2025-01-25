// src/utils/jsonHelper.ts
import fs from 'fs';
import path from 'path';

const dataDir = path.join(__dirname, '../../data/jsondb');

export const readJsonFile = <T>(filename: string): T => {
  const filePath = path.join(dataDir, filename);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as T;
};

export const writeJsonFile = <T>(filename: string, data: T): void => {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};