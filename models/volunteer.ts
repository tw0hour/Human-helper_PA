import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
} from "sequelize";

export interface volunteerProps{
    id:number;
    name:string;
    mail:string;
    password:string;
    type:string;
}

export interface volunteerCreationProps extends Optional<volunteerProps, "id">{}

export interface volunteerInstance extends Model<volunteerProps,volunteerCreationProps>,volunteerProps{

}

export default function(sequelize:Sequelize): ModelCtor<volunteerInstance>{
    return sequelize.define<volunteerInstance>("volunteer",{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING
        },
        mail:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        },
        type:{
            type:DataTypes.STRING
        },

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}