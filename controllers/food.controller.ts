import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {FoodCreationProps, FoodInstance} from "../models/food";


export interface FoodUpdateOption {
    id:number;
    name?:string;
    expirationDate?:string;
    volunteer_id?:number;
    type_food_id?:number;
    delivery_id?:number | null;
    association_id?:number;
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

    public async getAllInStock(limit?: number, offset?: number): Promise<FoodInstance[] | null>{
        return await this.Food.findAll({
            limit,
            offset,
            where:{
                delivery_id:null
            }
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
        if(options.id===undefined){
            return null;
        }
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

    /**
     * @param assocId
     * @return associative array with the name of the table and the quantity of clothing donated to association
     */
    public async nbFoodDonation(assocId: string): Promise<{food : number}>{
        const quantity = await this.Food.count({
            where:{
                association_id: assocId
            }
        });
        return {'food' : quantity};
    }
}
