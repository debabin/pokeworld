import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'node:path';

// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatisticModule } from './modules';
import { AuthModule } from './modules/auth';
import { BattleModule } from './modules/battle';
import { PokemonModule, PokemonService } from './modules/pokemon';
import { UserModule } from './modules/user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '1234',
      database: 'pokemon',
      entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
      synchronize: true
    }),
    AuthModule,
    StatisticModule,
    PokemonModule,
    BattleModule,
    UserModule
  ],
  controllers: [],
  providers: [AppService, PokemonService]
})
export class AppModule { }
