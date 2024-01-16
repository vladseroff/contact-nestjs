import { Exclude } from 'class-transformer';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserCreationAttrs } from './users.types';

@Table({
    tableName: 'users',
})
export class Users extends Model<Users, UserCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Exclude()
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    gender: string;
}
