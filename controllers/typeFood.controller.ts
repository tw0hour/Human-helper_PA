import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {TypeFoodCreationProps, TypeFoodInstance} from "../models/TypeFood";


export interface Type_FoodUpdateOption {
    id:string;
    type:string;
}

export class Type_FoodController {

    Food: ModelCtor<TypeFoodInstance>;

    private static instance: Type_FoodController;

    public static async getInstance(): Promise<Type_FoodController> {
        if(Type_FoodController.instance == undefined) {
            const {Type_food} = await SequelizeManager.getInstance();
            Type_FoodController.instance = new Type_FoodController(Type_food);
        }
        return Type_FoodController.instance;
    }

    constructor(Food: ModelCtor<TypeFoodInstance>) {
        this.Food = Food;
    }

    public async getAll(limit?: number, offset?: number): Promise<TypeFoodInstance[] | null>{
        return await this.Food.findAll({
            limit,
            offset
        });
    }

    public async add(props: TypeFoodCreationProps): Promise<TypeFoodInstance | null> {
        return await this.Food.create({
            ...props
        });
    }

    public async getById(id: string): Promise<TypeFoodInstance | null> {
        return await this.Food.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: Type_FoodUpdateOption): Promise<TypeFoodInstance | null> {

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
        const foodDelete = await this.getById(id);
        if(foodDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Food.destroy({
                    where:{
                        id: foodDelete.id
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
