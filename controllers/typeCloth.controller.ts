import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {TypeClothCreationProps, TypeClothInstance} from "../models/typeCloth";


export interface TypeClothUpdateOption {
    id:string;
    type?:string;
}

export class TypeClothController {

    Type_Cloth: ModelCtor<TypeClothInstance>;

    private static instance: TypeClothController;

    public static async getInstance(): Promise<TypeClothController> {
        if(TypeClothController.instance == undefined) {
            const {TypeCloth} = await SequelizeManager.getInstance();
            TypeClothController.instance = new TypeClothController(TypeCloth);
        }
        return TypeClothController.instance;
    }

    constructor(Type_Cloth: ModelCtor<TypeClothInstance>) {
        this.Type_Cloth = Type_Cloth;
    }

    public async getAll(limit?: number, offset?: number): Promise<TypeClothInstance[] | null>{
        return await this.Type_Cloth.findAll({
            limit,
            offset
        });
    }

    public async add(props: TypeClothCreationProps): Promise<TypeClothInstance | null> {
        return await this.Type_Cloth.create({
            ...props
        });
    }

    public async getById(id: string): Promise<TypeClothInstance | null> {
        return await this.Type_Cloth.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: TypeClothUpdateOption): Promise<TypeClothInstance | null> {

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
