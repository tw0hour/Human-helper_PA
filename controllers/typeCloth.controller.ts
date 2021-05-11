import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {Type_clothCreationProps, Type_clothInstance} from "../models/type_cloth";


export interface Type_ClothUpdateOption {
    id:string;
    type?:string;
}

export class Type_ClothController {

    Type_Cloth: ModelCtor<Type_clothInstance>;

    private static instance: Type_ClothController;

    public static async getInstance(): Promise<Type_ClothController> {
        if(Type_ClothController.instance == undefined) {
            const {Type_cloth} = await SequelizeManager.getInstance();
            Type_ClothController.instance = new Type_ClothController(Type_cloth);
        }
        return Type_ClothController.instance;
    }

    constructor(Type_Cloth: ModelCtor<Type_clothInstance>) {
        this.Type_Cloth = Type_Cloth;
    }

    public async getAll(limit?: number, offset?: number): Promise<Type_clothInstance[] | null>{
        return await this.Type_Cloth.findAll({
            limit,
            offset
        });
    }

    public async add(props: Type_clothCreationProps): Promise<Type_clothInstance | null> {
        return await this.Type_Cloth.create({
            ...props
        });
    }

    public async getById(id: string): Promise<Type_clothInstance | null> {
        return await this.Type_Cloth.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: Type_ClothUpdateOption): Promise<Type_clothInstance | null> {

        const foodUpdate = await this.getById(options.id.toString());

        if(foodUpdate === null)
        {
            return null;
        }
        else
        {
            return await foodUpdate.update({
                ...options
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const type_clothDelete = await this.getById(id);
        if(type_clothDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Type_Cloth.destroy({
                    where:{
                        id: type_clothDelete.id
                    }
                });
                return true;
            }
            catch (err)
            {
                console.error(err);
                return false;
            }
        }
    }
}
