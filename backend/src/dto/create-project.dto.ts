import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  shortDescription: string;

  @IsString()
  longDescription: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  techStack?: string[];

  @IsOptional()
  @IsString()
  githubUrl?: string;

  @IsOptional()
  @IsString()
  demoUrl?: string;
}
