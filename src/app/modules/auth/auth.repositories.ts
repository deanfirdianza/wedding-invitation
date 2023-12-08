import { Body, Controller, Delete, Get, Injectable, Param, Post, UseFilters } from '@nestjs/common';
import mongoose, { FilterQuery, Model, ModifyResult, Types } from 'mongoose';
import { User } from 'src/domain/user/user.schemas';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class AuthRepositories {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  
    async storeHash(id: Types.ObjectId, hash: String): Promise<FilterQuery<Document>> {
        return await this.userModel.updateOne({_id:id}, { $set: {hash: hash} });
    }
}
