import { IsBoolean, IsDate, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';

class Subscription {
  @IsOptional()
  @IsString()
  public id: string;

  @IsDate()
  public createdAt: Date;

  @IsDate()
  public currentPeriodStart: Date;

  @IsDate()
  public currentPeriodEnd: Date;

  @IsString()
  public status: string;

  @IsString()
  public productId: string;

  @IsBoolean()
  public cancelAtPeriodEnd: boolean;
}

export class CreateUserDto {
  @IsString()
  public firstName: string;

  @IsOptional()
  @IsString()
  public lastName: string;

  @IsString()
  public authId: string;

  @IsOptional()
  @IsString()
  public phone: string;

  @IsEmail()
  public email: string;

  @IsString()
  public apiKey: string;

  @IsOptional()
  @IsString()
  public stripeId: string;

  @IsOptional()
  public subscription: Subscription;
}

export class UpdateApiKeyDto {
  @IsString()
  public user: string;

  @IsString()
  public apiKey: string;
}

export class UpdateSubscriptionDto {
  @IsString()
  public user: string;

  @IsOptional()
  @IsString()
  public stripeId?: string;

  @ValidateNested()
  public subscription: Subscription;
}
