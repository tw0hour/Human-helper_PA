import {ModelCtor, Op} from "sequelize";
import {SequelizeManager} from "../models";
import {DonationCreationProps, DonationInstance} from "../models/donation";
import association from "../models/association";


export interface DonationUpdateOption {
    id:number;
    amountGiven?:number;
    date?:string;
    association_id?:number;
    volunteer_id?:number;

}

export class DonationController {

    Donation: ModelCtor<DonationInstance>;

    private static instance: DonationController;

    public static async getInstance(): Promise<DonationController> {
        if(DonationController.instance == undefined) {
            const {Donation} = await SequelizeManager.getInstance();
            DonationController.instance = new DonationController(Donation);
        }
        return  DonationController.instance;
    }

    constructor(Donation: ModelCtor<DonationInstance>) {
        this.Donation = Donation;
    }

    public async getAll(limit?: number, offset?: number): Promise<DonationInstance[] | null>{
        return await this.Donation.findAll({
            limit,
            offset
        });
    }

    public async add(props: DonationCreationProps): Promise<DonationInstance | null> {
        return await this.Donation.create({
            ...props
        });
    }

    public async getById(id: string): Promise<DonationInstance | null> {
        return await this.Donation.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: DonationUpdateOption): Promise<DonationInstance | null> {

        const donationUpdate = await this.getById(options.id.toString());

        if(donationUpdate === null)
        {
            return null;
        }
        else
        {
            return await donationUpdate.update({
                ...options
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const donationDelete = await this.getById(id);
        if(donationDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Donation.destroy({
                    where:{
                        id: donationDelete.id
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

    public async nbDonation(assocId: string): Promise<number>{
        return this.Donation.count({
            where:{
                association_id: assocId
            }
        });
    }

    public async totalDonation(assocId: string): Promise<number>{
        return this.Donation.sum('amountGiven', {
            where:{
                association_id: assocId
            }
        })
    }

    public async maxDonation(assocId: string): Promise<number>{
        return this.Donation.max('amountGiven',{
            where:{
                association_id: assocId,
            }
        });
    }

}
