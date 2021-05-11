import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {TypeFoodCreationProps, TypeFoodInstance} from "../models/typeFood";


export interface TypeFoodUpdateOption {
    id:string;
    type:string;
}

export class TypeFoodController {

    Food: ModelCtor<TypeFoodInstance>;

    private static instance: TypeFoodController;

    public static async getInstance(): Promise<TypeFoodController> {
        if(TypeFoodController.instance == undefined) {
            const {TypeFood} = await SequelizeManager.getInstance();
            TypeFoodController.instance = new TypeFoodController(TypeFood);
        }
        return TypeFoodController.instance;
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
    public async update(options: TypeFoodUpdateOption): Promise<TypeFoodInstance | null> {

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
