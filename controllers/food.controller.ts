import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {FoodCreationProps, FoodInstance} from "../models/food";


export interface FoodUpdateOption {
    id:string;
    name?:string;
    typeFoods?:string;
    expirationDate?:string;
}

export class FoodController {

    Food: ModelCtor<FoodInstance>;

    private static instance: FoodController;

    public static async getInstance(): Promise<FoodController> {
        if(FoodController.instance == undefined) {
            const {Food} = await SequelizeManager.getInstance();
            FoodController.instance = new FoodController(Food);
        }
        return FoodController.instance;
    }

    constructor(Food: ModelCtor<FoodInstance>) {
        this.Food = Food;
    }

    public async getAll(limit?: number, offset?: number): Promise<FoodInstance[] | null>{
        return await this.Food.findAll({
            limit,
            offset
        });
    }

    public async add(props: FoodCreationProps): Promise<FoodInstance | null> {
        return await this.Food.create({
            ...props
        });
    }

    public async getById(id: string): Promise<FoodInstance | null> {
        return await this.Food.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: FoodUpdateOption): Promise<FoodInstance | null> {

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