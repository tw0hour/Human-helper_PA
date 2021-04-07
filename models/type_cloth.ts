import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
} from "sequelize";

export interface type_clothProps{
    id:number;
    name:string;
}

export interface type_clothCreationProps extends Optional<type_clothProps, "id">{}

export interface type_clothInstance extends Model<type_clothProps,type_clothCreationProps>,type_clothProps{

}

export default function(sequelize:Sequelize): ModelCtor<type_clothInstance>{
    return sequelize.define<type_clothInstance>("type_cloth",{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING
        }

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}