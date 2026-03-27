import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  @Max(100)
  level: number;

  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? null : value))
  @IsString()
  logoUrl?: string | null;
}
