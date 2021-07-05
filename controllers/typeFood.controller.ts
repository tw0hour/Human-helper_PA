import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {TypeFoodCreationProps, TypeFoodInstance} from "../models/typeFood";


export interface TypeFoodUpdateOption {
    id:number;
    type:string;
}

export class TypeFoodController {

    Type_Food: ModelCtor<TypeFoodInstance>;

    private static instance: TypeFoodController;

    public static async getInstance(): Promise<TypeFoodController> {
        if(TypeFoodController.instance == undefined) {
            const {TypeFood} = await SequelizeManager.getInstance();
            TypeFoodController.instance = new TypeFoodController(TypeFood);
        }
        return TypeFoodController.instance;
    }

    constructor(Food: ModelCtor<TypeFoodInstance>) {
        this.Type_Food = Food;
    }

    public async getAll(limit?: number, offset?: number): Promise<TypeFoodInstance[] | null>{
        return await this.Type_Food.findAll({
            limit,
            offset
        });
    }

    public async add(props: TypeFoodCreationProps): Promise<TypeFoodInstance | null> {
        return await this.Type_Food.create({
            ...props
        });
    }

    public async checkDoublonTypeFood(typeFood: string): Promise<Boolean> {
        const doublonTypeFood = await this.Type_Food.findOne({
            where :{
                type: typeFood
            }
        });

        if(doublonTypeFood === null){
            return false;
        }
        return true;
    }


    public async getById(id: string): Promise<TypeFoodInstance | null> {
        return await this.Type_Food.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: TypeFoodUpdateOption): Promise<TypeFoodInstance | null> {

        const typeFoodUpdate = await this.getById(options.id.toString());

        if(typeFoodUpdate === null)
        {
            return null;
        }
        else
        {
            return await typeFoodUpdate.update({
                ...options
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const typeFoodDelete = await this.getById(id);
        if(typeFoodDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Type_Food.destroy({
                    where:{
                        id: typeFoodDelete.id
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
