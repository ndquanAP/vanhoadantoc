import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadsService {
  private readonly uploadPath = join(process.cwd(), 'uploads');

  constructor() {
    // Ensure uploads directory exists
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  getFilePath(filename: string): string {
    return join(this.uploadPath, filename);
  }

  getFileUrl(filename: string): string {
    return `/uploads/${filename}`;
  }

  deleteFile(filename: string): boolean {
    try {
      const filePath = this.getFilePath(filename);
      if (existsSync(filePath)) {
        unlinkSync(filePath);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}
