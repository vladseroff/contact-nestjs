import { Column, DataType, Model, Table } from "sequelize-typescript";

interface LikeCreationAttrs {
    id: number;
    user_id: number;
    target_user_id: number;
}

@Table({
    tableName: 'likes'
})
export class Likes extends Model<Likes, LikeCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    user_id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    target_user_id: number;
}