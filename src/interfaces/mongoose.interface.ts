import { Types } from 'mongoose';

export interface ITimestamps {
    createdAt: Date;
    updatedAt: Date;
}

export interface IObjectId {
    _id: Types.ObjectId;
}