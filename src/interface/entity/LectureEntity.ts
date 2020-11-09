import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    OneToOne,
    Tree,
    OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, InputType } from 'type-graphql';
import LectureContentEntity from './LectureContentEntity';

@Entity('TB_LECTURE_MASTER')
@ObjectType()
export default class LectureEntity {
    @PrimaryColumn({ name: 'CONTENT_NO' })
    @Field(() => ID)
    content_no?: number;

    @Field(() => Number)
    @Column({ nullable: true, name: 'UPPER_CONTENT_NO' })
    upper_content_no?: number;

    @Field(() => LectureEntity)
    upper_lecture?: LectureEntity;

    @Field(() => [LectureEntity], { nullable: 'itemsAndList' })
    child_lectures?: LectureEntity[];

    @Column({ name: 'CONTENT_TITLE' })
    @Field(() => String)
    content_title?: string;

    @Column({ name: 'CONTENT_REGIST_DATE' })
    @Field(() => String)
    content_regist_date?: string;

    @Column({ nullable: true, name: 'TITLE_IMAGE_PATH' })
    @Field(() => String)
    title_image_path?: string;

    @Column({ nullable: true, name: 'CONTENT_OUTLINE' })
    @Field(() => String)
    content_outline?: string;

    @OneToOne(
        () => LectureContentEntity,
        (lecture_content) => lecture_content.content_no
    )
    @Field(() => LectureContentEntity)
    lecture_content?: LectureContentEntity;

    constructor(data?: LectureEntity) {
        if (data) {
            this.content_no = data.content_no;
            this.upper_content_no = data.upper_content_no;
            this.content_title = data.content_title;
            this.title_image_path = data.title_image_path;
            this.content_regist_date = data.content_regist_date;
            this.content_outline = data.content_outline;
            this.upper_lecture = data.upper_lecture;
            this.child_lectures = data.child_lectures;
            this.lecture_content = data.lecture_content;
        }
    }

    static of<T extends LectureEntity & { [index: string]: any }>(
        lecture_entity: T
    ) {
        const lecture = new LectureEntity({
            content_no: lecture_entity.content_no,
            title_image_path: lecture_entity.title_image_path,
            content_outline: lecture_entity.content_outline,
            content_regist_date: lecture_entity.content_regist_date,
            content_title: lecture_entity.content_title,
            upper_content_no: lecture_entity.upper_content_no,
            upper_lecture: lecture_entity.upper_lecture,
            child_lectures: lecture_entity.child_lectures,
        });

        return lecture;
    }
}

export { LectureEntity };

@InputType()
export class LectureInput {
    @Field(() => Number)
    upper_content_no?: number;

    @Field(() => String)
    content_title?: string;

    @Field()
    content_regist_date?: string;

    @Field(() => String)
    title_image_path?: string;

    @Field(() => String)
    content_outline?: string;
}
