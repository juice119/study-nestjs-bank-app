import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export function getDataBaseConnection() {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
  });
}
