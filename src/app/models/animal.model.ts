export class Animal {
    id?: number;
    gender: string;
    race: string;
    createdAt?: Date;
    updatedAt?: Date;


    constructor(gender: string = '', race: string = '', createdAt: Date = new Date(), updatedAt: Date = new Date()) {
        this.gender = gender;
        this.race = race;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
