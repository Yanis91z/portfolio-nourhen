import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  @Max(100)
  level: number;
}
