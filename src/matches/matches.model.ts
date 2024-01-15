import { Column, DataType, Model, Table } from "sequelize-typescript";

interface MatchCreationAttrs {
    user_id_one: number;
    user_id_two: number;
}

@Table({
    tableName: 'matches'
})
export class Matches extends Model<Matches, MatchCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    user_id_one: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    user_id_two: number;
}