import { ModelCtor } from "sequelize";
import {SequelizeManager} from "../models";
import {ClothCreationProps, ClothInstance} from "../models/cloth";


export interface ClothUpdateOption {
    id:number;
    name?:string;
    size?:number;
    volunteer_id?:number;
    type_cloth_id?:number;
    gender_cloth_id?:number;
    delivery_id?:number;
    association_id?:number;
}

export class ClothController {

    Cloth: ModelCtor<ClothInstance>;

    private static instance: ClothController;

    public static async getInstance(): Promise<ClothController> {
        if(ClothController.instance == undefined) {
            const {Cloth} = await SequelizeManager.getInstance();
            ClothController.instance = new ClothController(Cloth);
        }
        return  ClothController.instance;
    }

    constructor(Cloth: ModelCtor<ClothInstance>) {
        this.Cloth = Cloth;
    }

    public async getAll(limit?: number, offset?: number): Promise<ClothInstance[] | null>{
        return await this.Cloth.findAll({
            limit,
            offset
        });
    }

    public async getAllInStock(limit?: number, offset?: number): Promise<ClothInstance[] | null>{
        return await this.Cloth.findAll({
            limit,
            offset,
            where:{
                delivery_id:null
            }
        });
    }

    public async add(props: ClothCreationProps): Promise<ClothInstance | null> {
        return await this.Cloth.create({
            ...props
        });
    }

    public async getById(id: string): Promise<ClothInstance | null> {
        return await this.Cloth.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: ClothUpdateOption): Promise<ClothInstance | null> {

        const clothUpdate = await this.getById(options.id.toString());

        if(clothUpdate === null)
        {
            return null;
        }
        else
        {
            return await clothUpdate.update({
                ...options
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const clothDelete = await this.getById(id);
        if(clothDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Cloth.destroy({
                    where:{
                        id: clothDelete.id
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
