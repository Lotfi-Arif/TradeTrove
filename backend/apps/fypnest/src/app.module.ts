import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { ProvidersModule } from '@app/providers';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from 'nestjs-prisma';
import { join } from 'path';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from '@app/common/configs/config';
import { ApolloDriver } from '@nestjs/apollo';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TeacherModule } from './teacher/teacher.module';
import { MessageModule } from './message/message.module';
import { CourseModule } from './course/course.module';
import { CourseEnrollmentModule } from './course-enrollment/course-enrollment.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    UserModule,
    ProvidersModule,
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      cors: false,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), './graphql/fypnest.gql'),
      include: [UserModule, AuthModule, ChatModule],
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ChatModule,
    AuthModule,
    TeacherModule,
    MessageModule,
    CourseModule,
    CourseEnrollmentModule,
    MediaModule,
  ],
  providers: [PrismaService, UserService],
  exports: [PrismaService],
})
export class AppModule {}
