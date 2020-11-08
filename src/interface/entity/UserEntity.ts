import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ObjectType, Field, ID, InputType } from 'type-graphql';

@Entity({ name: 'TB_USER' })
@ObjectType()
export default class UserEntity {
    @PrimaryColumn()
    @Field(() => String)
    email?: string;

    constructor(data?: UserEntity) {
        if (data) {
            this.email = data.email;
        }
    }

    static of<T extends UserEntity & { [index: string]: any }>(
        user_entitiy: T
    ) {
        return new UserEntity(user_entitiy);
    }
}

export { UserEntity };

@InputType()
export class UserInput implements Nullable<UserEntity> {
    @Column()
    @Field(() => String)
    email?: string;
}
