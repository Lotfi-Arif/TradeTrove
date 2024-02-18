import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ok, err } from 'neverthrow';
import {
  authCreateSchema,
  AuthCreateInput,
  AuthUpdateInput,
  loginInputSchema,
  loginschema,
  ValidateUserResult,
  CreateAuthResult,
  GetAllAuthResult,
  GetAuthResult,
  UpdateAuthResult,
  DeleteAuthResult,
  LoginResult,
  LoginInput,
} from '@tradetrove/shared-types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<ValidateUserResult> {
    // Validate input
    const loginValidation = loginInputSchema.safeParse({ username, password });
    if (!loginValidation.success) {
      return err(new Error('Invalid input'));
    }

    try {
      // Find the user by username
      const user = await this.prisma.user.findUnique({
        where: { username: loginValidation.data.username },
        include: {
          Auth: true, // Assuming User model includes an Auth relation
        },
      });

      // Check if user exists and verify password
      if (
        !user ||
        !user.Auth ||
        !(await bcrypt.compare(
          loginValidation.data.password,
          user.Auth.password,
        ))
      ) {
        return err(new Error('Invalid username or password'));
      }

      // Exclude password and Auth from the result
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { Auth, ...userWithoutAuth } = user;
      return ok(userWithoutAuth);
    } catch (error) {
      if (error instanceof Error)
        this.logger.error(`Validation error: ${error.message}`);
      return err(new Error('Failed to validate user'));
    }
  }

  async login(loginInput: LoginInput): Promise<LoginResult> {
    try {
      // Validate user credentials
      const validation = await this.validateUser(
        loginInput.username,
        loginInput.password,
      );

      // If validation fails, return an error
      if (validation.isErr()) {
        return err(new Error('Invalid username or password'));
      }

      // User validation successful, proceed with token generation
      const user = validation.value; // This is the user without sensitive info like password

      const payload = { username: user.username, sub: user.id };
      const access_token = this.jwtService.sign(payload);

      const tokenValidation = loginschema.safeParse({
        access_token,
        token_type: 'Bearer',
      });

      if (!tokenValidation.success) {
        return err(new Error('Failed to generate valid token'));
      }

      // Return the generated token
      return ok(tokenValidation.data);
    } catch (error) {
      this.logger.error(
        `Login error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      return err(new Error('Error during login process'));
    }
  }

  async create(createAuthDto: AuthCreateInput): Promise<CreateAuthResult> {
    const validation = authCreateSchema.safeParse(createAuthDto);
    if (!validation.success) {
      return err(new Error('Validation failed'));
    }

    try {
      const auth = await this.prisma.auth.create({
        data: validation.data,
      });
      return ok(auth);
    } catch (error) {
      if (error instanceof Error)
        this.logger.error(`Create auth error: ${error.message}`);
      return err(new Error('Failed to create auth record'));
    }
  }

  async findAll(): Promise<GetAllAuthResult> {
    try {
      const auths = await this.prisma.auth.findMany();
      return ok(auths);
    } catch (error) {
      if (error instanceof Error)
        this.logger.error(`Find all auth error: ${error.message}`);
      return err(new Error('Failed to find all auth records'));
    }
  }

  async findOne(id: string): Promise<GetAuthResult> {
    try {
      const auth = await this.prisma.auth.findUnique({ where: { id } });
      if (!auth) {
        return err(new NotFoundException('Auth record not found'));
      }
      return ok(auth);
    } catch (error) {
      if (error instanceof Error)
        this.logger.error(`Find one auth error: ${error.message}`);
      return err(new Error('Failed to find auth record'));
    }
  }

  async update(
    id: string,
    updateAuthDto: AuthUpdateInput,
  ): Promise<UpdateAuthResult> {
    try {
      const auth = await this.prisma.auth.update({
        where: { id },
        data: updateAuthDto,
      });
      return ok(auth);
    } catch (error) {
      if (error instanceof Error)
        this.logger.error(`Update auth error: ${error.message}`);
      return err(new Error('Failed to update auth record'));
    }
  }

  async remove(id: string): Promise<DeleteAuthResult> {
    try {
      const auth = await this.prisma.auth.delete({ where: { id } });
      return ok(auth);
    } catch (error) {
      if (error instanceof Error)
        this.logger.error(`Remove auth error: ${error.message}`);
      return err(new Error('Failed to remove auth record'));
    }
  }
}
