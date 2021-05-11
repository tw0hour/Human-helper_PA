import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {DeliveryCreationProps, DeliveryInstance} from "../models/delivery";


export interface DeliveryUpdateOption {
    id:string;
    status?:string;
}

export class DeliveryController {

    Delivery: ModelCtor<DeliveryInstance>;

    private static instance: DeliveryController;

    public static async getInstance(): Promise<DeliveryController> {
        if(DeliveryController.instance == undefined) {
            const {Delivery} = await SequelizeManager.getInstance();
            DeliveryController.instance = new DeliveryController(Delivery);
        }
        return  DeliveryController.instance;
    }

    constructor(Delivery: ModelCtor<DeliveryInstance>) {
        this.Delivery = Delivery;
    }

    public async getAll(limit?: number, offset?: number): Promise<DeliveryInstance[] | null>{
        return await this.Delivery.findAll({
            limit,
            offset
        });
    }

    public async add(props: DeliveryCreationProps): Promise<DeliveryInstance | null> {
        return await this.Delivery.create({
            ...props
        });
    }

    public async getById(id: string): Promise<DeliveryInstance | null> {
        return await this.Delivery.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: DeliveryUpdateOption): Promise<DeliveryInstance | null> {

        const deliveryUpdate = await this.getById(options.id.toString());

        if(deliveryUpdate === null)
        {
            return null;
        }
        else
        {
            return await deliveryUpdate.update({
                ...options
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const deliveryDelete = await this.getById(id);
        if(deliveryDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Delivery.destroy({
                    where:{
                        id: deliveryDelete.id
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
