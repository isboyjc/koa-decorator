/*
 * @Author: isboyjc
 * @Date: 2020-01-01 12:03:10
 * @LastEditors  : isboyjc
 * @LastEditTime : 2020-01-01 17:15:37
 * @Description: user模型
 */
import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({modelName: 'users'})
export default class User extends Model<User> {    
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  public id: number;

  @Column(DataType.CHAR)
  public name: string;
}